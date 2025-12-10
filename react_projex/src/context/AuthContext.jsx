import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Dummy account
  const DUMMY_USER = { username: "admin", password: "admin" };

  // Safely read user from localStorage
  let initialUser = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) initialUser = JSON.parse(storedUser);
  } catch (err) {
    console.warn("Failed to parse user from localStorage:", err);
    localStorage.removeItem("user"); // clear bad value
  }

  const [user, setUser] = useState(initialUser);

  // Simulated login
  function login(username, password) {
    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      const userData = { username };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
