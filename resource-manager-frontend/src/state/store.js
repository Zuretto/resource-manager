import { createStore } from 'redux';
import generalReducer from './reducer';

const store = createStore(generalReducer);

export default store;