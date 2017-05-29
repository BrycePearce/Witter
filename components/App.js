import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './LandingPageContainer';

function mapStateToProps(state) {
  return { 
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
//connect injects the data from our store, to whatever component that we need it in (Main in this case)
const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;