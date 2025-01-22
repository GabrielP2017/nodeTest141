import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import { thunk } from 'redux-thunk'; // 명시적 내보내기로 가져오기
import Reducer from './_reducers';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(Reducer,applyMiddleware(promiseMiddleware, thunk));

root.render(
    <Provider store={store}>
        <App />
    </Provider>,

  console.log('Store:', store.getState())

);

reportWebVitals();
