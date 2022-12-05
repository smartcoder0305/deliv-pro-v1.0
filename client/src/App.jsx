import './App.css';
import './i18n';

import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/layout/Navbar'
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Code from './components/auth/Code';
import Password from './components/auth/Password';
import Simple from './components/shipment/Simple';
import Shipment from './components/shipment/Shipment';
import User from './components/auth/User';

import GlobalContext from './shared/context/global-context';
import Results from './components/shipment/Results';
import Triplist from './components/shipment/Triplist';

const App = () => {
  return (
    <GlobalContext.Provider value={{}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path="/code" element = { <Code/> } />
          <Route path="/simple-settings" element={ <Simple /> } />
          <Route path="/shipment-settings" element={ <Shipment /> } />
          <Route path="/shipment-results" element={ <Results /> } />
          <Route path="/password" element = { <Password/> } />
          <Route path="/user" element = { <User/> } />
          <Route path="/triplist" element = { <Triplist/> } />
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
