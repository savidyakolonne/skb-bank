import type { User } from "./auth";
import type { Account } from "./Account";
import type { Transaction } from "./Transaction";

export interface UserDetails {
    user: User;
    accounts: Account[];
    recentTransactions: Transaction[];
}