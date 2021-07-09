export interface StockSuggestions {
  ticker: string;
  name: string;
  exchange: string;
}


export interface SizeCard {
  width: number;
  height: number;
}



export interface Stock {
  ticker: string;
  dates: DatesData[]
}
export interface DatesData {
  date: string;
  open: number;
  close: number;
  volume: number;
}


export interface DateInputs {
  startDate: string;
  endDate: string;
}


export interface PropsFetchStockData {
  symbol: string;
  outputsize: 'full' | 'compact';
}


export interface DataChartBar {
  name: string;
  y: number
}

export interface DataChartLine {
  name: string;
  data: number[]
}


export interface Split {
  exDate: string;
  paymentDate: string;
  ratio: number;
  ticker: string;
}
