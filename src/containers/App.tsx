import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import LoginPage from '../components/LoginPage';
// import PrivateRoute from '../components/PrivateRoute';
// import SiteContent from '../components/SiteContent';
import TestRouter from '../components/TestRouter';
import UsersTest from '../components/UsersTest';
import DecksTest from '../components/DecksTest';
import HomePage from '../containers/HomePage';
import * as Auth from '../helpers/Auth';
import '../styles/App.css';

const PrivateRoute = ({ ...others }) => (
  Auth.getAuthToken() && Auth.getCurrentUser()
    ? <Route {...others} />
    : <Redirect to="/usersTest" />
);

const App = () => {
  const currentUser = Auth.getCurrentUser();
  const authToken = Auth.getAuthToken();

  return (
    <React.Fragment>
      {/* <Route exact path="/" component={TestRouter} /> */}
      <TestRouter />
      <br />
      <div style={{ backgroundColor: 'cyan', padding: '10px 0px 10px 0px' }}>
        <h4 style={{ border: '1px solid black', minHeight: '10px' }}>{currentUser}</h4>
        <h4 style={{ border: '1px solid black', minHeight: '10px' }}>{authToken}</h4>
      </div>
      <br />
      <br />
      <Route path="/usersTest" exact component={UsersTest} />
      <Route path="/decksTest" exact component={DecksTest} />
      <PrivateRoute path="/home" exact component={HomePage} />
      {/* <PrivateRoute component={SiteContent} /> */}
      {/* <Route path="/login" component={LoginPage} /> */}
      <button style={{ backgroundColor: 'red', padding: '5px', margin: '10px' }} onClick={Auth.logout}>
        Logout
      </button>
    </React.Fragment>
  );
};

export default App;
