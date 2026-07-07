export interface Transaction {
  id: number;
  accountId: number;
  accountNumber: string;

  ownerName: string;
  username: string;

  amount: number;

  transactionType:
    | "DEPOSIT"
    | "WITHDRAW"
    | "TRANSFER_IN"
    | "TRANSFER_OUT";

  description: string;

  createdAt: string;
}

export interface TransferRequest {
  fromAccountId: number;
  toAccountNumber: string;
  amount: number;
  description: string;
}