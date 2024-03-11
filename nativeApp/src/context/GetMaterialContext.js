import React, { createContext, useState, useContext } from "react";

const GetMaterialContext = createContext();

export const useGetMaterial = () => useContext(GetMaterialContext);

export const GetMaterialProvider = ({ children }) => {
  const [material, setMaterial] = useState(null);

  return (
    <GetMaterialContext.Provider
      value={{
        material,
        setMaterial,
      }}
    >
      {children}
    </GetMaterialContext.Provider>
  );
};
