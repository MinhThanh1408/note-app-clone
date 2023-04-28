import { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user?.uid) {
        setUser(user);
        if (user.accessToken !== localStorage.getItem('accessToken')) {
          window.location.reload();
        }
        localStorage.setItem('accessToken', user.accessToken);
        setIsLoading(false);
        return;
      }
      console.log('Clear user');
      setIsLoading(false);
      setUser({});
      localStorage.clear();
      navigate('/login');
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
