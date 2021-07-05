import React from 'react';

import useDates from './hooks/useDates';
import useSearchTickers from './hooks/useSearchTickers';
import useGetDataFromApi from './hooks/useGetDataFromApi';
import useGetDataChart from './hooks/useGetDataChart';
import useSlider from './hooks/useSlider';

import Selector from './components/Selector';
import Chart from './components/Chart';
import Slider from './components/Slider';

import './App.css';

function App(): JSX.Element {

	const { dateInputs, handleChangeDate, isErrorDatesPicker } = useDates();
	const { tickers, suggestions, searchInput, handleChangeSearch, toggleTicker } = useSearchTickers();
	const { handleSubmit, dataAPI, isError, timeframe } = useGetDataFromApi({ tickers, dateInputs, isErrorDatesPicker });
	const { handleClear, sliderValue, handleSliderChange, styleOutput, nbrValues, handleReset, handlePlaying, isPlaying } = useSlider({ dataAPI });
	const { dataChart, arrayDates } = useGetDataChart({ dataAPI, sliderValue });


	return (
		<main>
			<div className='container'>
				<Selector
					dateInputs={dateInputs}
					handleChangeDate={handleChangeDate}
					isErrorDatesPicker={isErrorDatesPicker}
					tickers={tickers}
					toggleTicker={toggleTicker}
					searchInput={searchInput}
					handleChangeSearch={handleChangeSearch}
					suggestions={suggestions}
					handleClick={() => {handleSubmit();handleClear();}}
				/>

				<div className='wrapper--center'>
					<h1>Charts</h1>
					{
						<>
							<div className='chart'>
								<Chart
									data={dataChart}
									type='bar'
									title='Bar Chart Progression'
								/>
							</div>
							<Slider
								nbrValues={nbrValues}
								sliderValue={sliderValue}
								handleSliderChange={handleSliderChange}
								arrayDates={arrayDates}
								timeframe={timeframe}
								styleOutput={styleOutput}
								handleReset={handleReset}
								handlePlaying={handlePlaying}
								isPlaying={isPlaying}
							/>
						</>

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

export default App;
