import React, { useState } from 'react';

type TUse = {
	sliderValue: number;
	handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleClear: () => void;
}
export function useSlider(): TUse {

	const [sliderValue, setSliderValue] = useState<number>(0);

	function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setSliderValue(parseInt(e.target.value));
	}

	function handleClear() {
		setSliderValue(0);
	}

	return { sliderValue, handleSliderChange, handleClear };
}
