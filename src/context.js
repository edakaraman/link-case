import React, { createContext, useContext, useState, useEffect } from 'react';

const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false); //Form modalı için
  const [visible, setVisible] = useState(false); //form için

  const [editingIndex, setEditingIndex] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false); //edit modalı için
  
  useEffect(() => {
    const storedLinks = localStorage.getItem('links');
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks));
    }
  }, []);

  return (
    <LinkContext.Provider value={{ links, setLinks, first, setFirst, rows, setRows, isModalOpen, setIsModalOpen, visible, setVisible, editModalVisible, setEditModalVisible,editingIndex,setEditingIndex }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLink = () => useContext(LinkContext);


