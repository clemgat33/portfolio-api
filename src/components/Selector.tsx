import React from 'react';

import useDates from '../hooks/useDates';
import useSearchTickers from '../hooks/useSearchTickers';

type PropsSelector = {
  dateInputs: {
    startDate: string;
    endDate: string;
  };
  handleChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isErrorDatesPicker: () => boolean;
  tickers: string[];
  toggleTicker: (ticker: string) => void;
  searchInput: string;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: Stock[];
  handleClick: () => void;
}
type Stock = {
  ticker: string;
  name: string;
  exchange: string;
}


export default function Selector({ dateInputs, handleChangeDate, isErrorDatesPicker, tickers, toggleTicker, searchInput, handleChangeSearch, suggestions, handleClick }: PropsSelector): JSX.Element {

	const { dateMin, dateMax } = useDates();
	const { nbrMaxTickers } = useSearchTickers();

	return (
		<div className='wrapper--search'>
			<p>Select up to {nbrMaxTickers} tickers</p>
			<div className='field'>
				<label>Start date</label>
				<input
					className={isErrorDatesPicker() ? 'error' : ''}
					type='date'
					min={dateMin}
					max={dateMax}
					name='startDate'
					value={dateInputs.startDate}
					onChange={(e) => handleChangeDate(e)}
				/>
				<span className="input--bottom-line"></span>
			</div>
			<div className='field'>
				<label>End date</label>
				<input
					className={isErrorDatesPicker() ? 'error' : ''}
					type='date'
					min={dateMin}
					max={dateMax}
					name='endDate'
					value={dateInputs.endDate}
					onChange={(e) => handleChangeDate(e)}
				/>
				<span className="input--bottom-line"></span>
			</div>

			<div className='field'>
				<label>Search Ticker</label>
				<input
					className={tickers.length === nbrMaxTickers ? 'error' : ''}
					type='text'
					autoComplete="off"
					placeholder={tickers.length === nbrMaxTickers ? 'Max value' : '"Apple", "AAPL" ...'}
					name='searchTicker'
					value={searchInput}
					onChange={(e) => handleChangeSearch(e)}
				/>
				<span className="input--bottom-line"></span>
			</div>
			<div className='stock--lists'>
				{
					tickers.length > 0 && (
						<div className='stock--list stock--list-tickers'>
							{
								tickers.map((value: string, index: number) => (
									<div key={index} className='stock--element active' onClick={() => toggleTicker(value)}>
										<div className='stock--ticker'>{value}</div>
									</div>
								))
							}
						</div>
					)
				}
				{
					suggestions.length > 0 && (
						<div className='stock--list stock--list-suggestions'>
							{
								suggestions.slice(0, 5).map((value: Stock, index: number) => (
									<div key={index} className='stock--element' onClick={() => toggleTicker(value.ticker)}>
										<div className='stock--ticker'>{value.ticker}</div>
										<div className='stock--name'>{value.name}</div>
									</div>
								))
							}
						</div>
					)
				}
			</div>
			<div className='submit'>
				<button onClick={handleClick}>Submit</button>
			</div>
		</div>
	);

}
