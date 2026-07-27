import api from "../api/axios";
import type { AccountDetails } from "../types/AccountDetails";
import type { AdminAccount } from "../types/AdminAccount";

class AdminAccountService{

    // get all accounts
    async getAllAccounts(): Promise<AdminAccount[]>{

        const response = await api.get("/admin/accounts");

        return response.data.data;
    }

    // get account details
    async getAccountDetails(id: number): Promise<AccountDetails>{

        const response = await api.get(`/admin/accounts/${id}`);

        return response.data.data;
    }

    // Cash Deposit
    async deposit(
        id: number,
        amount: number,
        remarks: string
    ): Promise<void> {

        await api.put(
            `/accounts/${id}/deposit`,
            {
                amount,
                remarks
            }
        );

    }

    // Cash Withdrawal
    async withdraw(
        id: number,
        amount: number,
        remarks: string
    ): Promise<void> {

        await api.put(
            `/accounts/${id}/withdraw`,
            {
                amount,
                remarks
            }
        );

    }

    // Freeze account
    async freezeAccount(id: number): Promise<void> {

        await api.patch(`/admin/accounts/${id}/freeze`);

    }

    // Activate account
    async activateAccount(id: number): Promise<void> {

        await api.patch(`/admin/accounts/${id}/activate`);

    }

    // Close account
    async closeAccount(id: number): Promise<void> {

        await api.patch(`/admin/accounts/${id}/close`);

    }
}

export default new AdminAccountService();