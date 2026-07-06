import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import type {
  LoginRequest,
  RegisterRequest,
  User,
} from "../types/auth";

import authService from "../services/AuthService";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedToken = authService.getToken();
    const savedUser = authService.getUser();

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (data: LoginRequest): Promise<User> => {
    const response = await authService.login(data);

    authService.saveToken(response.data.token);
    authService.saveUser(response.data.user);

    setToken(response.data.token);
    setUser(response.data.user);

    return response.data.user;
  };

  const register = async (data: RegisterRequest) => {
    await authService.register(data);
  };

  const logout = () => {
    authService.logout();

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}