import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  user: any;
  login: (user: any) => void;
  logout: () => void;
  getUser: () => any;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadStoredUser();
  }, []);

  const login = async (newUser: any) => {
    setUser(newUser);

    await AsyncStorage.setItem('user', JSON.stringify(newUser));

    // Aquí también podrías guardar el usuario en un almacenamiento persistente
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    // Aquí también podrías eliminar el usuario del almacenamiento persistente
  };

  const getUser = () => {
    return user;
  };

  return (
    <AuthContext.Provider value={{user, login, logout, getUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
