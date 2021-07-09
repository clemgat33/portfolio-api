import React, { useState, useEffect } from 'react';

import { Stock, DatesData, DataChartBar, DataChartLine } from '../utils/interfaces';

type TUse = {
  dataChartBar: DataChartBar[];
  dataChartLine: DataChartLine[];
  arrayDates: string[];
}
type PropsHook = {
  dataAPI: Stock[];
  sliderValue?: number;
  type: string;
};



export default function useGetDataChart({ dataAPI, sliderValue, type }: PropsHook): TUse {

	const [dataChartBar, setDataChartBar] = useState<DataChartBar[]>([]);
	const [dataChartLine, setDataChartLine] = useState<DataChartLine[]>([]);
	const [arrayDates, setArrayDates] = useState<string[]>([]);

	useEffect(() => {
		if (type === 'bar' && sliderValue !== undefined) {
			let isNotDates = false;
			let updateDataChartBar: DataChartBar[] = [];
			const updateDates: string[] = [];
			if (dataAPI.length > 0) {
				const res: DataChartBar[] = dataAPI.map(stock => {
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
		} else if(type === 'line'){
			let isNotDates = false;
			let updateDataChartLine: DataChartLine[] = [];
			const updateDates: string[] = [];
			if (dataAPI.length > 0) {
				const res: DataChartLine[] = dataAPI.map(stock => {
					let name = '';
					let dates: DatesData[];
					let firstDate: DatesData;
					let data: number[] = [];
					if (stock ?.dates !== undefined) {
						name = stock.ticker;
						dates = stock.dates;
						firstDate = dates[0];
						data = dates.map(selectedDate => {
							return Number((selectedDate ?.close / firstDate ?.close * 100).toFixed(2));
						});
						dates.map(e => updateDates.push(e.date));
					} else {
						isNotDates = true;
					}
					return ({ name, data });
				});
				if (isNotDates === false) {
					updateDataChartLine = res;
				}
			}
			setDataChartLine(updateDataChartLine);
			setArrayDates(updateDates);
		}
	}, [dataAPI, sliderValue, type]);


	function compareStocks(a: DataChartBar, b: DataChartBar) {
		if (a.y > b.y) return -1;
		if (b.y > a.y) return 1;
		return 0;
	}

	return { dataChartBar, dataChartLine, arrayDates };
}
