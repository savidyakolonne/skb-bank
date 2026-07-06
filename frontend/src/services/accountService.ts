import api from "../api/axios";
import type {
  Account,
  CreateAccountRequest,
  DepositRequest,
  WithdrawRequest,
} from "../types/Account";

class AccountService {
  async getAll() {
    const response = await api.get("/accounts");
    return response.data.data as Account[];
  }

  async getById(id: number) {
    const response = await api.get(`/accounts/${id}`);
    return response.data.data as Account;
  }

  async getByUser(userId: number) {
    const response = await api.get(`/accounts/user/${userId}`);
    return response.data.data as Account[];
  }

  async create(data: CreateAccountRequest) {
    const response = await api.post("/accounts", data);
    return response.data.data as Account;
  }

  async deposit(id: number, data: DepositRequest) {
    const response = await api.put(
      `/accounts/${id}/deposit`,
      data
    );

    return response.data.data as Account;
  }

  async withdraw(id: number, data: WithdrawRequest) {
    const response = await api.put(
      `/accounts/${id}/withdraw`,
      data
    );

    return response.data.data as Account;
  }
}

export default new AccountService();