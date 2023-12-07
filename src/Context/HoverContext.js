// HoverContext.js
import React, { createContext, useState } from 'react';

const HoverContext = createContext();

const HoverProvider = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);



  const handleHover = (value) => {
    setIsHovered(value);
  };

  return (
    <HoverContext.Provider value={{ isHovered, handleHover }}>
      {children}
    </HoverContext.Provider>
  );
};

export { HoverProvider, HoverContext };
