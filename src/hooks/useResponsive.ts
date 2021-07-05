import {useEffect, useState} from 'react';

type TUse = {
  sizeCard: SizeCard;
  widthSlider: number
}

type SizeCard = {
  widthCard: number;
  heightCard: number;
}



export default function useResponsive(): TUse {

	const [sizeCard, setSizeCard] = useState<SizeCard>({
		widthCard: 500,
		heightCard: 500
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
		const spacing: number = 40+40;
		if(width > 768) {
			setSizeCard({
				widthCard: 680-spacing,
				heightCard: 500-spacing
			});
			setWidthSlider(680-spacing);
		}
		else if(width > 576) {
			setSizeCard({
				widthCard: width-spacing,
				heightCard: (width/1.4)-spacing
			});
			setWidthSlider(width-spacing);
		}
		else {
			setSizeCard({
				widthCard: width-40,
				heightCard: width-40+60
			});
			setWidthSlider(width-40);
		}
	}

	return { sizeCard, widthSlider };

}
