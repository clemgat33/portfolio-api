import React from 'react';

import useDates from '../hooks/useDates';
import useSearchTickers from '../hooks/useSearchTickers';
import useGetDataFromApi from '../hooks/useGetDataFromApi';
import useGetDataChart from '../hooks/useGetDataChart';
import useResponsive from '../hooks/useResponsive';

import Selector from '../components/Selector';
import Chart from '../components/Chart';

import '../App.css';

export default function LineChartPage(): JSX.Element {


	const { dateInputs, handleChangeDate, isErrorDatesPicker } = useDates();
	const { tickers, suggestions, searchInput, handleChangeSearch, toggleTicker } = useSearchTickers();
	const { handleSubmit, dataAPI, isError } = useGetDataFromApi({ tickers, dateInputs, isErrorDatesPicker });
	const { dataChartLine, arrayDates } = useGetDataChart({ dataAPI, type: 'line' });
	const { sizeCard } = useResponsive();


	return (
		<main>
			<div className='container-chart'>
				<div className='wrapper--selector'>
					<Selector
						dateInputs={dateInputs}
						handleChangeDate={handleChangeDate}
						isErrorDatesPicker={isErrorDatesPicker}
						tickers={tickers}
						toggleTicker={toggleTicker}
						searchInput={searchInput}
						handleChangeSearch={handleChangeSearch}
						suggestions={suggestions}
						handleClick={() => {handleSubmit();}}
					/>
				</div>

				<div className='wrapper--center'>
					<h1>Line Chart</h1>
					{
						arrayDates.length > 0 ? (
							<div className='chart'>
								<Chart
									data={dataChartLine}
									arrayDates={arrayDates}
									type='line'
									title={`Progression in % of an investment made the ${arrayDates[0]}`}
									sizeCard={sizeCard}
								/>
							</div>
						) : (
							<div style={{margin: 40}}>Choose start date, end date and select up to 5 tickers.</div>
						)
					}
					{
						isError.error && (
							<div className='error-message--list'>
								{isError.messages.map((message, key) => (
									<div key={key}>{message}</div>
								))}
							</div>
						)
					}
				</div>
			</div>

		</main>
	);

}
