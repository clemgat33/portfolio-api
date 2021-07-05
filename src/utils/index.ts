export function formatDate(date: Date): string {
	const year = date.getFullYear();
	let month = '' + (date.getMonth() + 1);
	let day = '' + date.getDate();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return year  + '-' + month + '-'  + day;
}


export function areDatesNear(timeframe: string, dateToCompare: string, date: string, strict: boolean): boolean{
	let bool = false;
	const diffDates = ((new Date(date)).getTime() - (new Date(dateToCompare)).getTime()) / (1000*60*60*24); // 1 day in milliseconds
	if (timeframe === 'daily') {
		bool =  diffDates > 0 && diffDates <= 4;
	} else if (timeframe === 'weekly' && strict) {
		bool =  diffDates > 0 && diffDates <= 7;
	} else if (timeframe === 'weekly' && !strict) {
		bool =  diffDates <= 10;
	}  else if (timeframe === 'monthly'){
		bool = dateToCompare.slice(0,7) === date.slice(0,7);
	}
	return bool;
}
