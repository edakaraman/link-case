import React, { createContext, useContext, useState,useEffect } from 'react';

const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
    const [links, setLinks] = useState([]);   
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    
    useEffect(() => {
        const storedLinks = localStorage.getItem('links');
        if (storedLinks) {
          setLinks(JSON.parse(storedLinks));
        }
      }, []);

    return (
        <LinkContext.Provider value={{ links, setLinks,first,setFirst,rows,setRows }}>
            {children}
        </LinkContext.Provider>
    );
};

export const useLink = () => useContext(LinkContext);


