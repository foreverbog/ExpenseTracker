import { useState, useEffect, createContext, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type AuthContextType = {
  user: UserType;
  isAuthenticated: boolean;
  login: (newToken: string) => void;
  logout: () => void;
  refetchUser: () => void;
  isLoading: boolean;
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
  const API_URL: string = import.meta.env.VITE_API_SERVER;
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const refetchUser = () => {
    setTriggerFetch((prev) => !prev);
  };

  const getUser = async (userId: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/${userId}?fetch=${triggerFetch}`
      );
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
    setIsLoading(false);
  };

  //*Function to set the token on login/signup or remove it
  const login = (newToken: string) => {
    setToken(newToken);
    Cookies.set("token", newToken);
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
    Cookies.remove("token");
    // console.log("log out");
    navigate("/auth");
  };

  // console.log(token);

  //*get token from local storage , this runs only if there is a token stored
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);

      const decodedToken = jwtDecode<DecodedTokentype>(storedToken);
      getUser(decodedToken.id);
    } else {
      setIsLoading(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFetch]);

  // console.log(user);

  const isAuthenticated = token !== null;

  return (
    <AuthContext.Provider
      value={{ refetchUser, login, logout, user, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
