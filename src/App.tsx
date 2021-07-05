import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/Home';
import BarChartPage from './pages/BarChartPage';

export default function App(): JSX.Element {

	return (
		<>
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/barchart" component={BarChartPage} />
			</Switch>
		</>
	);

}
