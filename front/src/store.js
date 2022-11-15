import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productDetailsReducer} from './reducer/ProductReducer';
import { productsReducer} from './reducer/ProductReducer';

const reducer= combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer
})

let intialState ={}

const middleleware= [thunk]
const store = createStore (reducer, intialState, composeWithDevTools(applyMiddleware(...middleleware)))

export default store;

