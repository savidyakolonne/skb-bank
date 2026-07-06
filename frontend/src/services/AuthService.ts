import api from "../api/axios";

import type {
    LoginRequest,
    RegisterRequest,
    LoginResponse,
    RegisterResponse
} from "../types/auth";

class AuthService {

    async login(data: LoginRequest): Promise<LoginResponse> {

        const response =
            await api.post<LoginResponse>(
                "/auth/login",
                data
            );

        return response.data;
    }

    async register(
        data: RegisterRequest
    ): Promise<RegisterResponse> {

        const response =
            await api.post<RegisterResponse>(
                "/auth/register",
                data
            );

        return response.data;
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    saveToken(token: string) {
        localStorage.setItem("token", token);
    }

    getToken() {
        return localStorage.getItem("token");
    }

    saveUser(user: any) {
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );
    }

    getUser() {

        const user = localStorage.getItem("user");

        return user ? JSON.parse(user) : null;

    }

}

export default new AuthService();