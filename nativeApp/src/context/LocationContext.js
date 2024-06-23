import React, { createContext, useState, useContext, useEffect } from "react";
import * as Location from "expo-location";

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    (async () => {
      let locationSubscription;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setGranted(true);
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000, //android専用らしいけどわからん
            distanceInterval: 1,
          },
          (location) => {
            setLocation(location);
            console.log(
              `latitude: ${location.coords.latitude}, longitude: ${location.coords.longitude}`
            );
          }
        );
        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };
      }
    })();
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, setLocation, granted, setGranted }}
    >
      {children}
    </LocationContext.Provider>
  );
};
