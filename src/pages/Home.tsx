import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

export default function Home(): JSX.Element {

	return (
		<main>
			<div className='container'>
				<h1>API STOCK WEBSITE</h1>
				<p>
					The website was created with &quot;npx create-react-app my-app --template typescript&quot;, a Typescript single-page React application.
				</p>
				<p>
					It shows stock APIs data into charts. The stock APIs used are
					<a href='https://www.alphavantage.co/documentation/' className='link' target='_blank' rel="noreferrer"> AlphaVantage </a>
					 and
					 <a href='https://polygon.io/docs/getting-started' className='link' target='_blank' rel="noreferrer"> Polygon</a>.
				</p>
				<p>
					AlphaVantage&apos;s API is used to fetch the stock data as the date, open price, close price and the volume. For daily, weekly and monthly timeseries.<br/>
				</p>
				<p>
					Polygon&apos;s API is used to fetch the
					<a href='https://www.investopedia.com/terms/s/stocksplit.asp' className='link' target='_blank' rel="noreferrer"> stock splits</a>.
					Because the data fetched with AlphaVantage is not adjusted by historical split.<br/>
				</p>
				<p>
					There are 2 charts, created with
					<a href='https://www.highcharts.com/products/highcharts/' className='link' target='_blank' rel="noreferrer"> Highcharts</a>.<br/>
					One is an <Link className='link' to='/barchart'> incremental bar chart</Link>, which shows the evolution of an investment made at the start date, in percent, with an incrementation.<br/>
					The other one is a <Link className='link' to='/linechart'> historical line chart</Link>, which shows the exact same thing but with all the data available at the same time.
				</p>
			</div>
		</main>
	);

}
