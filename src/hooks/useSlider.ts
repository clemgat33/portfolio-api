import React, { useState } from 'react';

import useInterval from './useInterval';

import { TStock } from '../utils/interfaces';

type TUse = {
	sliderValue: number;
	handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleClear: () => void;
	styleOutput: {left: number};
	nbrValues: number;
	handleReset: () => void;
	handlePlaying: () => void;
	isPlaying: boolean;
}
type PropsHook = {
  dataAPI: TStock[];
};


export default function useSlider({dataAPI}: PropsHook): TUse {

	const nbrValues = dataAPI.length > 0 ? dataAPI[0]?.dates?.length - 1 : 0;

	const [sliderValue, setSliderValue] = useState<number>(0);
	const [styleOutput, setStyleOutput] = useState<{left: number}>({left: 0});

	const [isPlaying, setPlaying] = useState<boolean>(false);
	const delay = 100;

	//refresh
	function handleClear() {
		setSliderValue(0);
		setStyleOutput({left: 0});
		setPlaying(false);
	}

	//onchange input range
	function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>): void{
		const value = parseInt(e.target.value);
		setStyleOutput({left: value/nbrValues * 100});
		setSliderValue(value);
		setPlaying(false);
	}

	function handleReset(): void{
		setSliderValue(0);
		setStyleOutput({left: 0});
		setPlaying(false);
	}


	useInterval(
		() => {
			const value = sliderValue + 1;
			setStyleOutput({left: value/nbrValues * 100});
			setSliderValue(value);
		},
		// Delay in milliseconds or null to stop it/ stop if max nbrValues
		(isPlaying && nbrValues > sliderValue) ? delay : null,
	);

	function handlePlaying(): void{
		if(nbrValues > sliderValue){
			setPlaying(!isPlaying);
		}
	}

	return { sliderValue, handleSliderChange, handleClear, styleOutput, nbrValues, handleReset, handlePlaying, isPlaying };
}
