import React, { useState, useEffect } from 'react';

import STOCKS from '../utils/stocks.json';

import { StockSuggestions } from '../utils/interfaces';

type TUse = {
  tickers: string[];
  suggestions: StockSuggestions[];
  nbrMaxTickers: number;
  searchInput: string;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleTicker: (ticker: string) => void;
}

export default function useSearchTickers(): TUse {
	const nbrMaxTickers = 5;
	const [tickers, setTickers] = useState<string[]>([]);
	const [suggestions, setSuggestions] = useState<StockSuggestions[]>([]);
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
			const res: StockSuggestions[] = STOCKS.filter((stock: StockSuggestions) => {
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
