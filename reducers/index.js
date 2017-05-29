//since only using 1 reducer atm, probably don't need the combine, but will later.
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';

const rootReducer = combineReducers({user, routing: routerReducer });

export default rootReducer;