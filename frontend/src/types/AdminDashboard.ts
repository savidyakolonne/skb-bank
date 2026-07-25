import type { User } from "./User";
import type { Transaction } from "./Transaction";

export interface AdminDashboard {
    
    totalUsers: number;

    totalAccounts: number;

    totalTransactions: number;

    totalBankBalance: number;

    recentUsers: User[];

    recentTransactions: Transaction[];
}