export interface Analytics {

    totalUsers: number;
    totalAccounts: number;
    totalTransactions: number;
    totalBankBalance: number;
    activeAccounts: number;
    frozenAccounts: number;
    closedAccounts: number;
    monthlyTransactions: MonthlyTransaction[];
}

export interface MonthlyTransaction {
    month: string;
    totalTransactions: number;
}