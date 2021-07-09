import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';



type PropsSlider = {
  widthSlider: number;
  nbrValues: number;
  sliderValue: number;
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  arrayDates: string[];
  timeframe: 'daily' | 'weekly' | 'monthly';
  styleOutput: { left: number };
  handleReset: () => void;
  handlePlaying: () => void;
  isPlaying: boolean;
}

export default function Slider({ widthSlider, nbrValues, sliderValue, handleSliderChange, arrayDates, timeframe, styleOutput, handleReset, handlePlaying, isPlaying }: PropsSlider): JSX.Element {




	return (
		<div className="range-slider--container">
			<span
				className='range-slider--progress'
				style={{ left: `calc(${styleOutput.left}% + (${10 - styleOutput.left * 0.2}px))` }}
			>{arrayDates[sliderValue]}</span>
			<input
				style={{ width: widthSlider }}
				className="range-slider"
				type="range"
				min={0}
				max={nbrValues}
				step={1}
				value={sliderValue}
				onChange={handleSliderChange}
			/>
			<div
				className='range-slider--bottom'
			>
				<div>{arrayDates[0]}</div>
				<div>
					<FontAwesomeIcon
						icon={faUndo}
						className='icon icon-click icon-active'
						onClick={handleReset}
					/>
					<div className='range-slider--timeframe'>{timeframe}</div>
					<FontAwesomeIcon
						icon={isPlaying ? faPause : faPlay}
						className={`icon icon-click ${isPlaying ? 'icon-active' : ''}`}
						onClick={handlePlaying}
					/>
				</div>
				<div>{arrayDates[arrayDates.length - 1]}</div>
			</div>
		</div>
	);

}
