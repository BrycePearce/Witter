//redux store
import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

//import our user state hopefully from UserPageContainer (might need get this into data folder somehow)
import user from './components/userPage/UserPageContainer';

import rootReducer from './reducers/index';

import posts from './data/posts';
import comments from './data/comments';
//create an object for the default data
const defaultState = {
  //es6 lets you just say 'user' where previous you had to initialize with:  user: user
  posts,
  comments,
  user
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;