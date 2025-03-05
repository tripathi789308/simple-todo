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
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
  loggedUserData: User | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [loggedUserData, setLoggedUserData] = useState<User>();
  const navigate = useNavigate();
  const { postService } = apiService();
  const { showSnackbar } = useSnackbar();

  const reset = () => {
    setLoggedUserData(undefined);
    localStorage.removeItem(Constants.Token);
  };

  useEffect(() => {
    const token = localStorage.getItem(Constants.Token);
    if (!token) {
      reset();
      navigate(RoutePath.Login);
      return;
    }
    if (token) {
      navigate(RoutePath.Todos);
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
    } else {
      showSnackbar("Invalid input", "error");
    }
  };

  const register = async (username: string, password: string) => {
    if (username && password) {
      const response = await postService("/register", {
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
    } else {
      showSnackbar("Invalid input", "error");
    }
  };

  const logout = () => {
    reset();
    navigate(RoutePath.Login);
  };

  const value: AuthContextType = {
    login,
    logout,
    register,
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
