export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export enum Role {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: Role;
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