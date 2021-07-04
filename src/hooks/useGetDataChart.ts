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
  'open': string;
  'close': string;
  'volume': string;
}


type TDataChart = {
  name: string;
  y: number
}

export function useGetDataChart({ dataAPI, sliderValue }: PropsHook): TUse {

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
					y = Number((parseFloat(selectedDate ?.close) / parseFloat(firstDate ?.close) * 100).toFixed(2));
					dates.map(e => updateDates.push(e.date));
				} else {
					isNotDates = true;
				}
				return ({ name, y });
			});
			if (isNotDates === false) updateDataChart = res;
		}
		setDataChart(updateDataChart);
		setArrayDates(updateDates);
	}, [dataAPI, sliderValue]);


	return { dataChart, arrayDates };
}
