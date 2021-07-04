import { useState } from 'react';

import { isStartDateCorrect } from '../utils';

type TUse = {
  handleSubmit: () => void;
  dataAPI: TStock[];
  isError: {
    error: boolean;
    messages: string[];
  }
}
type PropsHook = {
  tickers: string[];
  dateInputs: Date;
  isErrorDatesPicker: () => boolean;
};
type Date = {
  startDate: string;
  endDate: string;
};
type TStock = {
  ticker: string;
  dates: DatesData[]
}
type DatesData = {
  'date': string;
  'open': string;
  'close': string;
  'volume': string;
}
type PropsFetchStockData = {
  symbol: string;
  outputsize: 'full' | 'compact';
};



export function useGetDataFromApi({ tickers, dateInputs, isErrorDatesPicker }: PropsHook): TUse {
	const baseUrl = `https://www.alphavantage.co/query?apikey=${process.env.REACT_APP_API_KEY}`;

	const diffTime = Math.abs(new Date(dateInputs.endDate).getTime() - new Date(dateInputs.startDate).getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	let functionName: 'TIME_SERIES_DAILY' | 'TIME_SERIES_WEEKLY' | 'TIME_SERIES_MONTHLY';
	let keyData: 'Time Series (Daily)' | 'Weekly Time Series' | 'Monthly Time Series';

	if (diffDays <= 100) {
		functionName = 'TIME_SERIES_DAILY';
		keyData = 'Time Series (Daily)';
	} else if (diffDays <= 700) {
		functionName = 'TIME_SERIES_WEEKLY';
		keyData = 'Weekly Time Series';
	} else {
		functionName = 'TIME_SERIES_MONTHLY';
		keyData = 'Monthly Time Series';
	}



	const [dataAPI, setDataAPI] = useState<TStock[]>([]);
	const [isError, setIsError] = useState<{ error: boolean; messages: string[] }>({ error: false, messages: [] });


	async function fetchStockData({ symbol, outputsize }: PropsFetchStockData): Promise<DatesData[]> {
		const url = `${baseUrl}&function=${functionName}&symbol=${symbol}&outputsize=${outputsize}`;
		const result = await fetch(url)
			.then(res => res.json())
			.then(data => data[keyData])
			.then(obj => {
				const filtered = Object.keys(obj)
					.filter((key: string) => (key > dateInputs.startDate && key <= dateInputs.endDate))
					.reduce((res: any, key, index) => (res[index] = { date: key, open: obj[key]['1. open'], close: obj[key]['4. close'], volume: obj[key]['5. volume'] }, res), []);
				return filtered;
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
			const requestData: Promise<TStock>[] = tickers.map(async (ticker: string) => {
				//const messageDates = ticker + ' data does not begin at this date.'
				let stock: any;
				const dates: DatesData[] = await fetchStockData({ symbol: ticker, outputsize: 'full' });
				if (dates === undefined) {
					//if there are no dates, error handling
					updateMessageError.push('Problem fetching ' + ticker + ' data, try again in 1 minute.');
				} else {
					// inverse dates array[]
					const datesReverse = dates.reverse();
					//check if first date = dates[0]
					if (isStartDateCorrect(diffDays, dateInputs.startDate, datesReverse[0].date)) {
						stock = { ticker: ticker, dates: datesReverse };
					} else {
						//if dates arent ok, error handling
						updateMessageError.push('The first data found of ' + ticker + ' began the ' + datesReverse[0].date);
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
		}
	}


	// console.log('isError', isError)

	return { handleSubmit, dataAPI, isError };
}
