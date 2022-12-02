import React, { useState, useCallback } from 'react';

const useGlobalContext = () => {
    const [langIndex, setLangIndex] = useState(0);
    
    const changeLang = useCallback((index) => {
        setLangIndex(index);
    }, []);

    return {langIndex, changeLang};
}

export default useGlobalContext;