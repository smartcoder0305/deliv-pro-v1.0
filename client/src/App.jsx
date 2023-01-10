import './App.css';
import './i18n';

import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Navbar from './components/layout/Navbar'
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Code from './components/auth/Code';
import Password from './components/auth/Password';
import Simple from './components/shipment/Simple';
import Shipment from './components/shipment/Shipment';
import Delivery from './components/delivery/Delivery';
import Results from './components/shipment/Results';
import Overview from './components/delivery/Overview';
import Alert from './components/layout/Alert';

import setAuthToken from './shared/utils/setAuthToken';
import PrivateRoute from './shared/routing/PrivateRoute';
import { loadUser } from './actions/auth';

// import GlobalContext from './shared/context/global-context';

//Redux
import { LOGOUT } from './actions/types';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          {/** Authenticate */}
          <Route path='/login' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path="/code" element = { <PrivateRoute component={Code} /> } />
          <Route path="/password" element = { <PrivateRoute component={Password} /> } />
          {/** Search delivery  */}
          <Route path="/search" element={ <Simple /> } />
          <Route path="/search-detail" element={ <Shipment /> } />
          <Route path="/search-results" element={ <Results /> } />
          {/** Delivery */}
          <Route path="/delivery/new" element = { <PrivateRoute component={Delivery} />} />
          <Route path="/delivery/overview" element = { <PrivateRoute component={Overview} /> } />
          {/**------------------------------ */}
          <Route path='/' element={<Navigate to='/search' />} />
          <Route element={<div className='pt-10'>page not found</div>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
