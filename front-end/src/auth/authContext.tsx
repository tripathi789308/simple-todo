import { Constants, RoutePath } from "../enums";
import apiService from "../service";
import { User } from "../types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "./snackbarContext";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loggedUserData: User | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserData, setLoggedUserData] = useState<User>();
  const navigate = useNavigate();
  const { postService } = apiService();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isLoggedIn");
    if (!storedAuth) {
      navigate(RoutePath.Login);
      return;
    }
    if (storedAuth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    if (username && password) {
      const response = await postService("/login", {
        username,
        password,
      });
      if (!response?.error) {
        setLoggedUserData(response.data?.userData);
        localStorage.setItem(Constants.Token, response.data?.token);
        navigate(RoutePath.Todos);
        showSnackbar("User has successfully logged in", "success");
      } else {
        const errorMessage =
          typeof response?.error === "string"
            ? response.error
            : "Login attempt failed";
        showSnackbar(errorMessage as string, "error");
      }
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLoggedUserData(undefined);
    localStorage.removeItem("isLoggedIn");
    navigate(RoutePath.Login);
  };

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
    loggedUserData,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider!");
  }
  return context;
};
