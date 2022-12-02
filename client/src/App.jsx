import './App.css';

import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/layout/Navbar'
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Code from './components/auth/Code';
import Password from './components/auth/Password';

import GlobalContext from './shared/context/global-context';
import useGlobalContext from './shared/hook/useGlobalContext';

const App = () => {
  const  {langIndex, changeLang} = useGlobalContext();
  return (
    <GlobalContext.Provider value={{langIndex, changeLang}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path="/code" element = { <Code/> } />
          <Route path="/password" element = { <Password/> } />
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
