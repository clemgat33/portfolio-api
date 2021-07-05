import React, { useState, useEffect } from 'react';

import { TStock, DatesData, TDataChart } from '../utils/interfaces';

type TUse = {
  dataChartBar: TDataChart[];
  arrayDates: string[];
}
type PropsHook = {
  dataAPI: TStock[];
  sliderValue: number;
  type: string;
};



export default function useGetDataChart({ dataAPI, sliderValue, type }: PropsHook): TUse {

	const [dataChartBar, setDataChartBar] = useState<TDataChart[]>([]);
	const [arrayDates, setArrayDates] = useState<string[]>([]);

	useEffect(() => {
		if (type === 'bar') {
			let isNotDates = false;
			let updateDataChartBar: TDataChart[] = [];
			const updateDates: string[] = [];
			if (dataAPI.length > 0) {
				const res: TDataChart[] = dataAPI.map(stock => {
					let name = '';
					let dates: DatesData[];
					let firstDate: DatesData;
					let y = 0;
					if (stock ?.dates !== undefined) {
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
					updateDataChartBar = res;
					updateDataChartBar.sort(compareStocks);
				}
			}
			setDataChartBar(updateDataChartBar);
			setArrayDates(updateDates);
		}
	}, [dataAPI, sliderValue, type]);


	function compareStocks(a: TDataChart, b: TDataChart) {
		if (a.y > b.y) return -1;
		if (b.y > a.y) return 1;
		return 0;
	}

	return { dataChartBar, arrayDates };
}
