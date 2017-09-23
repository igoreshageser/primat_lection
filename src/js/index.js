import 'react-hot-loader/patch';
// import { AppContainer } from 'react-hot-loader';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import configureStore from './REDUX/store'
// import MapContainer from './Containers/MapContainer/';
// import NotFound from './Containers/notDound';
import Login from './Containers/Login/';
// import Registration from './Containers/Registration/';
import '../scss/index.scss';
import createHistory from 'history/createBrowserHistory';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating

export const store = configureStore( history );   
const rootEl = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Switch>
                    <Route path="/login" exact component={Login}/>
                    {/*<Route path="/reg" component={Registration}/>*/}
                    {/*<Route path="/map" component={MapContainer}/>*/}
					{
						localStorage.getItem("token") ?
							<Redirect from="*/" to="/map" />
							:
							<Redirect from="*/" to="/login" />
					}
				</Switch>
			</div>
		</ConnectedRouter>
	</Provider>, rootEl
);

if (module.hot) {
	module.hot.accept('./Containers/Login', () => {
		render(Login)
	});
}