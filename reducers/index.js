//since only using 1 reducer atm, probably don't need the combine, but will later.
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import posts from './posts';
import comments from './comments';

const rootReducer = combineReducers({posts, comments, user, routing: routerReducer });

export default rootReducer;