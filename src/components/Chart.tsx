import React  from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useResponsive } from '../hooks/useResponsive';

type PropsChart = {
  data: { name: string; y: number;}[];
  type: string;
  title: string;
}

export default function Chart({data, type, title}: PropsChart): JSX.Element{


	const subtitle = getSubtitle();
	function getSubtitle() {
		let sub = '';
		data.map(e => {sub = sub + e.name + ' ';} );
		return sub;
	}



	const { sizeCard } = useResponsive();


	/*=== OPTIONS ===*/
  	const options = {
  		chart: {
  			type: type,
  			backgroundColor: '#EEEEEE',
  			width: sizeCard.widthCard,
      	height: sizeCard.heightCard,
  			borderRadius: 5,
  			spacing: [20, 15, 15, 10],
  		},
  	  title: {
  	    text: title,
  			 style: {
  				color: '#000000',
  			}
  	  },
  		subtitle: {
  	    text: subtitle,
  			 style: {
  				color: '#000000',
  			}
  	  },
  		xAxis: {
  			type: 'category',
  			labels: {
  				autoRotation: [-10, -20, -30, -40, -50, -60, -70, -80, -90],
  				style: {
  					color: '#000000',
  					fontSize: '11px',
  					fontFamily: 'Verdana, sans-serif'
  				}
  			}
  		},
  		yAxis: {
  			title: {
  				text: '',
  			},
  			labels: {
  				style: {
  	 				color: '#000000',
  	 			}
  			}
  		},
  		tooltip: {
  			pointFormat: '<b>{point.y}</b>',
  			backgroundColor: '#EEEEEE',
  			style: {
  				color: '#000000',
  			}
  		},
  		legend: {
  			enabled: false
  		},
  	  series: [{
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
  			color: '#3679dd',
  			borderWidth: 0.5,
  	  }],
  	};
  	/*=== OPTIONS ===*/

	return(
		<HighchartsReact
			highcharts={Highcharts}
			options={options}
		/>
	);
}
