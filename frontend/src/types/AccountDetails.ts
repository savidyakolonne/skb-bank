import type { AdminAccount } from "./AdminAccount";
import type { User } from "./auth";
import type { Transaction } from "./Transaction";

export interface AccountDetails{
    account: AdminAccount;
    owner: User;
    recentTransactions: Transaction[];
}