import 'react-hot-loader/patch';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from './REDUX/store'
import LectionTree from './Containers/LectionTree/';


import '../scss/index.scss';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();


export const store = configureStore( history );   
const rootEl = document.getElementById('root');



const App = () => {
	return (
		<MuiThemeProvider>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<div>
						<Switch>
							<Route path="/" exact component={LectionTree}/>
						</Switch>
					</div>
				</ConnectedRouter>
			</Provider>
		</MuiThemeProvider>
	)
};

ReactDOM.render(
	<App />,
	rootEl
);

if (module.hot) {
	module.hot.accept('./Containers/LectionTree', () => {
		render(LectionTree)
	});
}