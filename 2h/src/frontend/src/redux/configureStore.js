import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'

const devTools =  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f => f);

const store = createStore(reducer,
    compose(applyMiddleware(thunk),
        devTools));

export default store
