import React, { useState, useEffect } from 'react';

type TUse = {
  dataChart: TDataChart[];
  arrayDates: string[];
}
type PropsHook = {
  dataAPI: TStock[];
  sliderValue: number;
};
type TStock = {
  ticker: string;
  dates: DatesData[]
}
type DatesData = {
  'date': string;
  'open': number;
  'close': number;
  'volume': number;
}


type TDataChart = {
  name: string;
  y: number
}

export default function useGetDataChart({ dataAPI, sliderValue }: PropsHook): TUse {

	const [dataChart, setDataChart] = useState<TDataChart[]>([]);
	const [arrayDates, setArrayDates] = useState<string[]>([]);

	useEffect(() => {
		let isNotDates = false;
		let updateDataChart: TDataChart[] = [];
		const updateDates: string[] = [];
		if (dataAPI.length > 0) {
			const res: TDataChart[] = dataAPI.map(stock => {
				let name = '';
				let dates: DatesData[];
				let firstDate: DatesData;
				let y = 0;
				if (stock?.dates !== undefined) {
					name = stock.ticker;
					dates = stock.dates;
					firstDate = dates[0];
					const selectedDate = dates[sliderValue];
					y = Number((selectedDate ?.close / firstDate ?.close * 100).toFixed(2));
					dates.map(e => updateDates.push(e.date));
				} else {
					isNotDates = true;
				}
				return ({ name, y });
			});
			if (isNotDates === false) {
				updateDataChart = res;
				updateDataChart.sort(compareStocks);
			}
		}
		setDataChart(updateDataChart);
		setArrayDates(updateDates);
	}, [dataAPI, sliderValue]);


	function compareStocks(a: TDataChart, b: TDataChart){
		if (a.y > b.y) return -1;
		if (b.y > a.y) return 1;
		return 0;
	}

	return { dataChart, arrayDates };
}
