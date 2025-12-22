// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState(""); // ✅ add userName
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const r = localStorage.getItem("role");
    const name = localStorage.getItem("userName"); // ✅ get userName

    if (t) {
      setToken(t);
      setRole(r);
      setUserName(name || ""); // ✅ set userName
      setIsAuth(true);
    }
  }, []);

  const login = (token, role, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userName", name); // ✅ save userName

    setToken(token);
    setRole(role);
    setUserName(name); // ✅ set userName
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUserName(""); // ✅ clear userName
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, userName, isAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
