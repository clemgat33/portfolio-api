import React, { useState, useEffect } from 'react';

import STOCKS from '../utils/stocks.json';

type TUse = {
  tickers: string[];
  suggestions: Stock[];
  nbrMaxTickers: number;
  searchInput: string;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleTicker: (ticker: string) => void;
}
type Stock = {
  ticker: string;
  name: string;
  exchange: string;
}

export function useSearchTickers(): TUse {
	const nbrMaxTickers = 5;
	const [tickers, setTickers] = useState<string[]>([]);
	const [suggestions, setSuggestions] = useState<Stock[]>([]);
	const [searchInput, setSearchInput] = useState<string>('');

	function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>): void {
  	setSearchInput(e.target.value);
	}

	useEffect(() => {
  	if (searchInput.length > 0 && tickers.length < nbrMaxTickers) {
  		getTicker();
  	} else {
  		setSuggestions([]);
  	}
  	async function getTicker(): Promise<void> {
  		const res: Stock[] = STOCKS.filter((stock: Stock) => {
  			return stock.ticker.toLowerCase().startsWith(searchInput.toLowerCase()) || stock.name.toLowerCase().startsWith(searchInput.toLowerCase());
  		});
  		if (res.length > 0) {
  			setSuggestions(res);
  		}
  	}
	}, [searchInput, tickers]);


	function toggleTicker(ticker: string): void {
  	if (tickers.includes(ticker)) {
  		setTickers(tickers.filter(item => item !== ticker));
  	} else if (tickers.length < nbrMaxTickers) {
  		setTickers([
  			...tickers,
  			ticker
  		]);
  	}
  	setSearchInput('');
	}

	return { tickers, suggestions, nbrMaxTickers, searchInput, handleChangeSearch, toggleTicker };
}
