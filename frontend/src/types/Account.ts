export interface Account {
  id: number;
  accountNumber: string;
  accountType: "SAVINGS" | "CURRENT";
  balance: number;
  status: "ACTIVE" | "FROZEN" | "CLOSED";
  createdAt: string;

  ownerName: string;
  username: string;
}

export interface CreateAccountRequest {
  userId: number;
  accountType: "SAVINGS" | "CURRENT";
}

export interface DepositRequest {
  amount: number;
}

export interface WithdrawRequest {
  amount: number;
}