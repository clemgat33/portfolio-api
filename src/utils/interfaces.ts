export interface Stock {
  ticker: string;
  name: string;
  exchange: string;
}


export interface SizeCard {
  widthCard: number;
  heightCard: number;
}


export interface TStock {
  ticker: string;
  dates: DatesData[]
}
export interface DatesData {
  'date': string;
  'open': number;
  'close': number;
  'volume': number;
}


export interface DateInputs {
  startDate: string;
  endDate: string;
}


export interface PropsFetchStockData {
  symbol: string;
  outputsize: 'full' | 'compact';
}


export interface TDataChart {
  name: string;
  y: number
}
