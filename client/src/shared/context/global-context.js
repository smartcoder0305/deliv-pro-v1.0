import React, { createContext } from 'react';

const GlobalContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    langIndex: null,
    changeLang: () => {},
    login: () => {},
    logout: () => {},
});

export default GlobalContext;