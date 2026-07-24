import type { Account } from "./Account";
import type { Transaction } from "./Transaction";

export interface Dashboard{
    totalBalance: number;
    accounts: Account[];
    recentTransactions: Transaction[];
}