export function formatDate(date: Date): string {
	const year = date.getFullYear();
	let month = '' + (date.getMonth() + 1);
	let day = '' + date.getDate();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return year  + '-' + month + '-'  + day;
}


export function isStartDateCorrect(diffDays: number, startDateInput: string, date: string): boolean{
	let bool = false;
	const diffDates = ((new Date(date)).getTime() - (new Date(startDateInput)).getTime()) / (1000*60*60*24); // 1 day in milliseconds
	if (diffDays <= 100) {
		bool =  diffDates <= 4;
	} else if (diffDays <= 700) {
		bool =  diffDates <= 10;
	} else {
		bool = startDateInput.slice(0,7) === date.slice(0,7);
	}
	return bool;
}
