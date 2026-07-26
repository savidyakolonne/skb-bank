import type { AdminAccount } from "./AdminAccount";
import type { AdminTransaction } from "./AdminTransaction";
import type { User } from "./auth";

export interface TransactionDetails{
    
    transaction: AdminTransaction;
    account: AdminAccount;
    customer: User;
}