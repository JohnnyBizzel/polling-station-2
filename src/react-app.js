// Webpack config points here

import React from 'react'; // needed
import ReactDOM from 'react-dom';
import Home from './components/Home';
import Login from './utils/Login';
import Register from './utils/Register';
import PollDetails from './components/polls/PollDetails';
import EditPoll from './components/polls/EditPoll';
import CreatePoll from './components/polls/CreatePoll';
import Container from './components/auth/Container';
import {Route,Router,browserHistory,IndexRoute} from 'react-router';
import Auth from './utils/Auth';

const mountNode = document.getElementById('root');

ReactDOM.render( 
  <Router history={browserHistory}>
    <Route path="/" component={Container} >
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="logout" onEnter={(nextState, replace) => {
        Auth.deauthenticateUser();

        Auth.clearCookie();
        
        // change the current URL to root - home
        replace('/');
        // global location
        location.reload();
        }} 
      />
      <Route path="Polldetailfull/:id" component={PollDetails}  />
      <Route path="Editthepoll/:id" getComponent={(location, callback) => {
        Auth.isUserAuthenticated() ? callback(null, EditPoll) :
            callback(null, Home);
      }} />
      <Route path="createPoll" getComponent={(location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, CreatePoll);
        } else {
          callback(null, Home);
        }
      }} />
    </Route>
  </Router>,mountNode);
  