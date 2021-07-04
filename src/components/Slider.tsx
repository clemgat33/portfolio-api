import React, {useState} from 'react';

import { useResponsive } from '../hooks/useResponsive';

type PropsSlider = {
  nbrValues: number;
  sliderValue: number;
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  arrayDates: string[];
}

export default function Slider({ nbrValues, sliderValue, handleSliderChange, arrayDates }: PropsSlider): JSX.Element {

	console.log('nbrValues', nbrValues);

	const { widthSlider } = useResponsive();


	const [styleOutput, setStyleOutput] = useState<{left: number}>({left: 0});
	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{

		const value = parseInt(e.target.value);
		console.log(value/nbrValues * 100);
		setStyleOutput({left: value/nbrValues * 100});
		handleSliderChange(e);
	}


	return (
		<div className="range-slider--container">
			<span
				className='range-slider--progress'
				style={{ left: `calc(${styleOutput.left}% + (${10 - styleOutput.left * 0.2}px))`, display: nbrValues > 0 ? 'block' : 'none'  }}
			>{arrayDates[sliderValue]}</span>
			<input
				style={{ width: widthSlider }}
				className="range-slider"
				type="range"
				min={0}
				max={nbrValues}
				step={1}
				value={sliderValue}
				onChange={handleChange}
			/>
			<div
				style={{display: nbrValues > 0 ? 'flex' : 'none'  }}
				className='range-slider--startend'
			>
				<div>{arrayDates[0]}</div>
				<div>{arrayDates[arrayDates.length - 1]}</div>
			</div>
		</div>
	);

}
