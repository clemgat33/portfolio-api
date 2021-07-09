import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


import { SizeCard, DataChartBar, DataChartLine } from '../utils/interfaces';

type PropsChart = {
  data: DataChartBar[] | DataChartLine[];
  arrayDates?: string[];
  type: string;
  title: string;
  yAxisTitle?: string;
  sizeCard: SizeCard;
}


export default function Chart({ data, arrayDates, type, title, yAxisTitle, sizeCard }: PropsChart): JSX.Element {


	const seriesBar = [{
		name: 'Types',
		data: data,
		dataLabels: {
			enabled: true,
			color: '#000000',
			format: '{point.y}',
			style: {
				fontSize: '10px',
				fontFamily: 'Verdana, sans-serif'
			}
		},
		borderWidth: 0.5,
	}];

	const seriesLine = data;
	const categoriesLine = arrayDates;

	/*=== OPTIONS ===*/
	const options = {
		chart: {
			type: type,
			backgroundColor: '#EEEEEE',
			width: sizeCard.width,
			height: sizeCard.height,
			borderRadius: 5,
			spacing: [20, 15, 15, 10],
		},
		title: {
			text: title,
			style: {
				color: '#000000',
				fontWeight: 'bold',
				fontSize: '13px',
				fontFamily: 'Verdana, sans-serif',
			}
		},
		xAxis: {
			type: 'category',
			categories: type === 'bar' ? null : categoriesLine,
			labels: {
				autoRotation: [-10, -20, -30, -40, -50, -60, -70, -80, -90],
				style: {
					color: '#000000',
					fontSize: '11px',
					fontFamily: 'Verdana, sans-serif'
				}
			}
		},
		plotOptions: {
			series: {
				pointPadding: 0,
				zones: type === 'bar' ? [{
					value: 100,
					color: '#b60c0c'
				}, {
					value: 100.001,
					color: '#3679dd'
				}, {
					color: '#1ab60c'
				}] : [{
					value: 100,
					color: '#b60c0c'
				}]
			}
		},
		yAxis: {
			title: {
				text: yAxisTitle || '',
				style: {
					color: '#000000',
					fontWeight: 'bold',
					fontSize: '13px',
					fontFamily: 'Verdana, sans-serif',
				},
				margin: 20
			},
			labels: {
				style: {
					color: '#000000',
				}
			}
		},
		tooltip: {
			pointFormat: '<b>{point.y}</b>',
			backgroundColor: '#ffffff',
			style: {
				color: '#000000',
			}
		},
		legend: {
			enabled: type === 'bar' ? false : true
		},
		series: type === 'bar' ? seriesBar : seriesLine,

	};
	/*=== OPTIONS ===*/

	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={options}
		/>
	);
}
