import React, { createContext, useContext, useState } from "react";
import { getProfile } from "../api/auth";
import { checkToken } from "../api/storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const isValid = await checkToken();
      if (isValid) {
        const profile = await getProfile();
        setUserData(profile);
        setUserAuthenticated(true);
      } else {
        setUserAuthenticated(false);
        setUserData(null);
      }
    } catch (error) {
      setUserAuthenticated(false);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update user state after login/register
  const updateUserState = (data) => {
    setUserData(data);
    setUserAuthenticated(true);
  };

  // Function to clear user state on logout
  const clearUserState = () => {
    setUserData(null);
    setUserAuthenticated(false);
  };

  return (
    <UserContext.Provider 
      value={{ 
        userAuthenticated, 
        setUserAuthenticated,
        userData,
        isLoading,
        checkAuthStatus,
        updateUserState,
        clearUserState
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
