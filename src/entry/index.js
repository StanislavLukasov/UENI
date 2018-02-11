'use strict';
import '../styles/_main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
import { Provider } from 'react-redux'
import configureStore from '../store'
import { syncHistoryWithStore } from 'react-router-redux'
import App from '../pages/app'
import StepOne from '../pages/StepOne'
import StepTwo from '../pages/StepTwo'
import Breakpoint from '../components/Breakpoint'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Breakpoint />
			
			<Router 
				history={history} 
				onUpdate={() => window.scrollTo(0, 0)}>
				
				<Route component={App}>
					<Route 
						path="/" 
						component={StepOne}
					/>
					
					<Route 
						path="/business/:id" 
						component={StepTwo}
					/>
				</Route>
			</Router>
		</div>
	</Provider>,
	document.getElementById('app')
)