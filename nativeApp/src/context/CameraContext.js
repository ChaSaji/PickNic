import React, { createContext, useState, useContext } from "react";

const CameraContext = createContext();

export const useCamera = () => useContext(CameraContext);

export const CameraProvider = ({ children }) => {
  const [cameraKey, setCameraKey] = useState(0);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [picture, setPicture] = useState(null);

  return (
    <CameraContext.Provider
      value={{
        cameraKey,
        setCameraKey,
        isCameraEnabled,
        setIsCameraEnabled,
        picture,
        setPicture,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};
