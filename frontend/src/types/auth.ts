export interface LoginRequest {
    email: string;
    password:string;
}

export interface RegisterRequest {
    name: string,
    email: string,
    password: string
}

export interface User {
    id: number,
    name: string,
    email: string,
    role: "USER" | "ADMIN"
}

export interface AuthResponse {
    success: boolean
    message: string,
    data: {
        token: string
    };
}

export interface AuthUser {
    email: string;
    role: string;
}