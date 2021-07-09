import { useState } from 'react';

import { areDatesNear } from '../utils';

import { Stock, Split, DatesData, DateInputs, PropsFetchStockData } from '../utils/interfaces';

type TUse = {
  handleSubmit: () => void;
  dataAPI: Stock[];
  isError: {
    error: boolean;
    messages: string[];
  }
  timeframe: 'daily' | 'weekly' | 'monthly';
}
type PropsHook = {
  tickers: string[];
  dateInputs: DateInputs;
  isErrorDatesPicker: () => boolean;
};




export default function useGetDataFromApi({ tickers, dateInputs, isErrorDatesPicker }: PropsHook): TUse {
	const baseUrlAlpha = `https://www.alphavantage.co/query?apikey=${process.env.REACT_APP_API_KEY_ALPHAVANTAGE}`;
	const baseUrlPolygon = (symbol: string) => `https://api.polygon.io/v2/reference/splits/${symbol}?&apiKey=${process.env.REACT_APP_API_KEY_POLYGON}`;

	const diffTime = Math.abs(new Date(dateInputs.endDate).getTime() - new Date(dateInputs.startDate).getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	let functionName: 'TIME_SERIES_DAILY' | 'TIME_SERIES_WEEKLY' | 'TIME_SERIES_MONTHLY';
	let keyData: 'Time Series (Daily)' | 'Weekly Time Series' | 'Monthly Time Series';
	let timeframe: 'daily' | 'weekly' | 'monthly';

	if (diffDays <= 200) {
		functionName = 'TIME_SERIES_DAILY';
		keyData = 'Time Series (Daily)';
		timeframe = 'daily';
	} else if (diffDays <= 1400) {
		functionName = 'TIME_SERIES_WEEKLY';
		keyData = 'Weekly Time Series';
		timeframe = 'weekly';
	} else {
		functionName = 'TIME_SERIES_MONTHLY';
		keyData = 'Monthly Time Series';
		timeframe = 'monthly';
	}


	const [dataAPI, setDataAPI] = useState<Stock[]>([]);
	const [isError, setIsError] = useState<{ error: boolean; messages: string[] }>({ error: false, messages: [] });


	async function fetchStockData({ symbol, outputsize }: PropsFetchStockData): Promise<DatesData[]> {
		const urlAlpha = `${baseUrlAlpha}&function=${functionName}&symbol=${symbol}&outputsize=${outputsize}`;
		const urlPolygon = baseUrlPolygon(symbol);

		const resultSplits = await fetch(urlPolygon)
			.then(res => res.json())
			.then(data => {
				if(data.status === 'OK'){
					const res = data.results.map((split: Split) => {
						const { exDate, ratio } = split;
						return { exDate, ratio };
					});
					return res;
				}
			}
			)
			.catch(e => console.error(e));

		const result = await fetch(urlAlpha)
			.then(res => res.json())
			.then(data => data[keyData])
			.then(obj => {
				// filter comparing to the dates selected and change obj{} to a smallest one
				if(obj !== undefined){
					const filtered = Object.keys(obj)
						.filter((key: string) => (key > dateInputs.startDate && key <= dateInputs.endDate))
						.reduce((res: any, key, index) => (res[index] = { date: key, open: parseInt(obj[key]['1. open']), close: parseInt(obj[key]['4. close']), volume: parseInt(obj[key]['5. volume']) }, res), []);
					return filtered;
				}
			})
			.then(adjusted => {
				//check if splits is exists and divide prices comparing to the splits
				if(adjusted !== undefined && resultSplits !== undefined){
					adjusted.map((val: DatesData) => {
						resultSplits?.map((split: { exDate: string, ratio: number }) => {
						//for monthly and weekly the split is inside it, so the open will be different but not the close
							if (timeframe !== 'daily' && areDatesNear(timeframe, val.date, split.exDate, true)) {
								val.open = val.open * split.ratio;
							} else if (val.date < split.exDate) {
								val.open = val.open * split.ratio;
								val.close = val.close * split.ratio;
							}
						});
						return val;
					});
  				return adjusted;
				}
			})
			.catch(e => console.error(e));

		return result;
	}


	function handleSubmit(): void {
		if (
			!isErrorDatesPicker() &&
      dateInputs.startDate.length > 0 &&
      dateInputs.endDate.length > 0 &&
      tickers.length > 0
		) {
			const updateMessageError: string[] = [];
			const requestData: Promise<Stock>[] = tickers.map(async (ticker: string) => {
				//const messageDates = ticker + ' data does not begin at this date.'
				let stock: any;
				const dates: DatesData[] = await fetchStockData({ symbol: ticker, outputsize: 'full' });
				if (dates === undefined) {
					//if there are no dates, error handling
					updateMessageError.push('Problem fetching ' + ticker + ' data, try again in 1 minute.');
				} else {
					// inverse dates array[]
					dates.reverse();
					//check if first date is around  dates[0](firt data of the list)
					if (areDatesNear(timeframe, dateInputs.startDate, dates[0].date, false)) {
						stock = { ticker: ticker, dates: dates };
					} else {
						//if dates arent ok, error handling
						updateMessageError.push('The first data found of ' + ticker + ' is the ' + dates[0].date);
					}
				}

				const errorBool = updateMessageError.length > 0;
				setIsError({ error: errorBool, messages: updateMessageError });

				return stock;
			});

			Promise.all(requestData).then((stocks) => {
				// remove null from array stocks
				const filteredStocks = stocks.filter(e => {
					return e != null;
				});
				setDataAPI(filteredStocks);
			});
		} else {
			setDataAPI([]);
		}
	}


	// console.log('isError', isError)

	return { handleSubmit, dataAPI, isError, timeframe };
}
