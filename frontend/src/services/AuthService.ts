import api from "../api/axios";
import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse
} from "../types/auth";

class AuthService {
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/auth/login", data);
        return response.data;
    }

    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/auth/register", data);
        return response.data;
    }

    logout() {
        localStorage.removeItem("token");
    }

    saveToken(token: string) {
        localStorage.setItem("token", token);
    }

    getToken() {
        return localStorage.getItem("token");
    }

    isAuthenticated() {
        return !!localStorage.getItem("token");
    }
}

export default new AuthService();