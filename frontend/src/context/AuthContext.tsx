import { useState, useEffect, createContext, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthContextProviderProps = {
  children: ReactNode;
};

type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  //*Function to set the token on login/signup or remove it
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
  //*logout => remove the token
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  console.log(token);

  //*get token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log("work");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
