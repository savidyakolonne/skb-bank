import api from "../api/axios";

import type {
  Transaction,
  TransferRequest,
} from "../types/Transaction";

class TransactionService {

  async getAll() {
    const response = await api.get("/transactions");
    return response.data.data as Transaction[];
  }

  async getByAccount(accountId: number) {
    const response = await api.get(
      `/transactions/account/${accountId}`
    );

    return response.data.data as Transaction[];
  }

  async getByUser(userId: number) {
    const response = await api.get(
      `/transactions/user/${userId}`
    );

    return response.data.data as Transaction[];
  }

  async transfer(data: TransferRequest) {
    const response = await api.post(
      "/transactions/transfer",
      data
    );

    return response.data.data as Transaction;
  }
}

export default new TransactionService();