export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: "USER" | "ADMIN";
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: User;
    };
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data: User;
}