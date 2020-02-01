import history from '../helpers/History';
import routes from '../helpers/Routes';

export const login = ({ username, token }) => {
  window.localStorage.setItem('username', username);
  window.localStorage.setItem('authToken', token);
};

export const logout = () => {
  window.localStorage.setItem('username', '');
  window.localStorage.setItem('authToken', '');
  history.push(routes({}).usersTest);
};

export const getCurrentUser = () => window.localStorage.getItem('username');

export const getAuthToken = () => window.localStorage.getItem('authToken');
