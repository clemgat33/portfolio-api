import React, { useState } from 'react';

import { formatDate } from '../utils';

type TUse = {
	dateInputs: Date;
	dateMin: string;
	dateMax: string;
	handleChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isErrorDatesPicker: () => boolean;
}
type Date = {
  startDate: string;
  endDate: string;
};


export function useDates(): TUse {

	const dateMax = formatDate(new Date());
	const dateMin = '2000-01-01';

	const [dateInputs, setDateInputs] = useState<{
    startDate: string;
    endDate: string;
  }>({
  	startDate: '2018-01-01',
  	endDate: '2020-01-01'
  });
	function handleChangeDate(e: React.ChangeEvent<HTMLInputElement>): void {
		setDateInputs({
			...dateInputs,
			[e.target.name]: e.target.value
		});
	}

	function isErrorDatesPicker(): boolean {
		if (
			(
				dateInputs.startDate.length > 0 && (
					dateInputs.startDate < dateMin ||
          dateInputs.startDate > dateMax ||
          isNaN(Date.parse(dateInputs.startDate))
				)
			) || (
				dateInputs.endDate.length > 0 && (
					dateInputs.endDate < dateMin ||
          dateInputs.endDate > dateMax ||
          isNaN(Date.parse(dateInputs.endDate))
				)
			) || (
				(dateInputs.startDate.length > 0 && dateInputs.endDate.length > 0) && (
					new Date(dateInputs.startDate) >= new Date(dateInputs.endDate)
				)
			)
		) {
			return true;
		} else return false;
	}


	return { dateInputs, dateMin, dateMax, handleChangeDate, isErrorDatesPicker };
}
