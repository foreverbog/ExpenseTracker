import { useState, useEffect, createContext, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: UserType;
  isAuthenticated: boolean;
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

type DecodedTokentype = {
  id: string;
};

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const deployedUrl = "https://extr-backend.onrender.com";
  // const local = "http://localhost:8080";
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const getUser = async (userId: string) => {
    try {
      const response = await axios.get(`${deployedUrl}/${userId}`);
      const data = response.data;
      setUser({
        id: userId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  //*Function to set the token on login/signup or remove it
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    const decodedToken = jwtDecode<DecodedTokentype>(newToken);
    getUser(decodedToken.id);
  };
  //*logout => remove the token
  const logout = () => {
    setToken(null);
    setUser({
      id: "",
      email: "",
      firstName: "",
      lastName: "",
    });
    localStorage.removeItem("token");
    // console.log("log out");
    navigate("/auth");
  };

  // console.log(token);

  //*get token from local storage , this runs only if there is a token stored
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      const decodedToken = jwtDecode<DecodedTokentype>(storedToken);
      getUser(decodedToken.id);
    }
  }, []);

  // console.log(user);

  const isAuthenticated = token !== null;

  return (
    <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
