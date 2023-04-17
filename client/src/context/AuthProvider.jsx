import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((_user) => {
      if (_user?.uid) {
        setUser(_user);
        localStorage.setItem("accessToken", _user.accessToken);
        return;
      }
      console.log("Clear user");
      setUser({});
      localStorage.clear();
      navigate("/login");
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
