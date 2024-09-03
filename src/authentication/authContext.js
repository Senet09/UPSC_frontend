import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    checkAuthentication();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      setUser({ token });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout ,updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
