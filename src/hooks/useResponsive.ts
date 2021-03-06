import { useEffect, useState } from 'react';

import { SizeCard } from '../utils/interfaces';

type TUse = {
  sizeCard: SizeCard;
  widthSlider: number;
}



export default function useResponsive(): TUse {

	const [sizeCard, setSizeCard] = useState<SizeCard>({
		width: 500,
		height: 500
	});
	const [widthSlider, setWidthSlider] = useState<number>(500);
	useEffect(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () =>
			window.removeEventListener('resize', updateDimensions);
	}, []);

	function updateDimensions() {
		const width: number = window.innerWidth;
		const spacing: number = 40 + 40;
		if (width > 768) {
			setSizeCard({
				width: 680 - spacing,
				height: 500 - spacing
			});
			setWidthSlider(680 - spacing);
		}
		else if (width > 576) {
			setSizeCard({
				width: width - spacing,
				height: (width / 1.4) - spacing
			});
			setWidthSlider(width - spacing);
		}
		else {
			setSizeCard({
				width: width - 40,
				height: width - 40 + 60
			});
			setWidthSlider(width - 40);
		}
	}

	return { sizeCard, widthSlider };

}
