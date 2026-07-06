export interface Account {
    id: number;
    accountNumber: string;
    accountType: string;
    balance: number;
    status: string;
    createdAt: string;
}

export interface CreateAccountRequest {
    userId: number;
    accountType: string;
}

export interface DepositRequest {
    amount: number;
}

export interface WithdrawRequest {
    amount: number;
}