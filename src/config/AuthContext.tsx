import React, {createContext, useState, useContext} from 'react';

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

  const login = (newUser: any) => {
    setUser(newUser);
    // Aquí también podrías guardar el usuario en un almacenamiento persistente
  };

  const logout = () => {
    setUser(null);
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
