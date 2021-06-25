import React from 'react';

function App() {

	type PropsApiRequest = {
		symbol: string;
		startYear: number;
	  startMonth: number;
	  startDay: number;
		endYear: number;
	  endMonth: number;
		endDay: number;
		frequency: '1d' | '1wk' | '1mo';
	};

	const urlApiRequest = ({
		symbol,
		startYear,
		startMonth,
		startDay,
		endYear,
		endMonth,
		endDay,
		frequency
	}: PropsApiRequest) => {
		const startDate = Math.floor(Date.UTC(startYear, startMonth, startDay, 0, 0, 0) / 1000);
    const endDate = Math.floor(Date.UTC(endYear, endMonth, endDay, 0, 0, 0) / 1000);
		const baseUrl = 'https://finance.yahoo.com/quote/'
		const url = `${baseUrl + symbol}/history?period1=${startDate}&period2=${endDate}&interval=${frequency}&filter=history&frequency=${frequency}`

		return url
	};
//https://cors-anywhere.herokuapp.com/
	async function getHistoricalPrice(url: string) {
		console.log(url)
		const result = await fetch(`${url}`)
		.then((res) => res.text())
		.then((body) => {
			console.log(body)
			const prices = JSON.parse(body.split('HistoricalPriceStore":{"prices":')[1].split(',"isPending')[0]);
			console.log(prices);
		})
	  .catch((error) => {
	    console.error('Error: ', error);
	  })

		return result
	}


	async function getData(): Promise<void>{
		const url = urlApiRequest({
			symbol: 'AAPL',
			startYear: 2020,
			startMonth: 6,
			startDay: 0,
			endYear: 2020,
			endMonth: 8,
			endDay: 0,
			frequency: '1d',
		})
		// const results = await getHistoricalPrice(url)
		// console.log('results', results)
		getHistoricalPrice(url)
	}

	return (
		<div>
				<div>Hello</div>
				<button onClick={getData}>Test url</button>
		</div>
	);

}

export default App;
