import api from "../api/axios";
import type { AdminTransaction } from "../types/AdminTransaction";
import type { TransactionDetails } from "../types/TransactionDetails";

class AdminTransactionService {
    
    // get all transactions
    async getAllTransactions(): Promise<AdminTransaction[]>{

        const response = await api.get("/admin/transactions");

        return response.data.data;
    }

    // get transaction details
    async getTransactionDetails(id: number): Promise<TransactionDetails>{

        const response = await api.get(`/admin/transactions/${id}`);

        return response.data.data;
    }
}

export default new AdminTransactionService();