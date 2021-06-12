import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(state => state, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;
