import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers/indexReducer';
import { applyMiddleware } from 'redux';
import {configureStore} from "@reduxjs/toolkit"

import { getAllUsers } from './redux/actions/user.action';
import { getAllTravels } from './redux/actions/travel.action';

import {composeWithDevTools} from "redux-devtools-extension"

//planification redux à terminer


const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = configureStore({reducer:reducers}, composedEnhancer);

store.dispatch(getAllUsers())
store.dispatch(getAllTravels())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
