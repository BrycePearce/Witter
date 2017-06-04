import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import posts from './posts';
import comments from './comments';

const rootReducer = combineReducers({posts, comments, user, routing: routerReducer });

export default rootReducer;