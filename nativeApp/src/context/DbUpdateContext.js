import React, { createContext, useContext, useState } from "react";

const DbUpdateContext = createContext();

export const useDbUpdate = () => useContext(DbUpdateContext);

export const DbUpdateProvider = ({ children }) => {
  const [materialUpdate, setMaterialUpdate] = useState(Date.now);
  const [mealUpdate, setMealUpdate] = useState(Date.now);
  const [photoUpdate, setPhotoUpdate] = useState(Date.now);

  return (
    <DbUpdateContext.Provider
      value={{
        materialUpdate,
        setMaterialUpdate,
        mealUpdate,
        setMealUpdate,
        photoUpdate,
        setPhotoUpdate,
      }}
    >
      {children}
    </DbUpdateContext.Provider>
  );
};
