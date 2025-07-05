import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading, setLoading] = useState(true)
  const login = () => setIsAuthenticated(true);
  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    console.log("logout")
    setIsAuthenticated(false)
  };


    const [user, setUser] = useState(null);
 
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    axios
      .get("/user", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.user);
            setLoading(false)
        setIsAuthenticated(true)
    
        setUser(res.data.user);
      })
      .catch((err) => {
setLoading(false)

      });
  };



  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
