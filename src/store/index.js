import { combineReducers, createStore } from 'redux';
import * as reducers from './reducers';

const reducer = combineReducers({
	app: reducers?.app,
	auth: reducers?.auth,
	server: reducers?.server,
});

const configureStore = () => createStore(reducer);

export default configureStore;
