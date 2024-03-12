import React, { createContext, useContext, useState } from "react";

const DbUpdateContext = createContext();

export const useDbUpdate = () => useContext(DbUpdateContext);

export const DbUpdateProvider = ({ children }) => {
  const [materialUpdate, setMaterialUpdate] = useState(Date.now);

  return (
    <DbUpdateContext.Provider value={{ materialUpdate, setMaterialUpdate }}>
      {children}
    </DbUpdateContext.Provider>
  );
};
