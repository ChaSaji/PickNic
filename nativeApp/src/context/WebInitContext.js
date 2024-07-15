import React, { createContext, useState } from "react";

export const WebInitContext = createContext();

export const WebInitProvider = ({ children }) => {
  // WebID所持判定用
  const [isWebInit, setIsWebInit] = useState(false);
  // WebID初期化スキップ判定用
  const [isSkipped, setIsSkipped] = useState(false);

  return (
    <WebInitContext.Provider
      value={{ isWebInit, setIsWebInit, isSkipped, setIsSkipped }}
    >
      {children}
    </WebInitContext.Provider>
  );
};
