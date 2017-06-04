import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state) {
  console.log("app.js");
  console.log(state);
  return { 
    posts: state.posts,
    comments: state.comments,
    user: state.user
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
//connect injects the data from our store, to whatever component that we need it in (Main in this case)
const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;