import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('safar_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication - in production, this would call an API
    const mockUser = {
      id: Date.now().toString(),
      email,
      username: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=0ea5e9&color=fff`,
    };
    setUser(mockUser);
    localStorage.setItem('safar_user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const register = (email, password, username) => {
    // Mock registration - in production, this would call an API
    const mockUser = {
      id: Date.now().toString(),
      email,
      username,
      avatar: `https://ui-avatars.com/api/?name=${username}&background=0ea5e9&color=fff`,
    };
    setUser(mockUser);
    localStorage.setItem('safar_user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('safar_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

