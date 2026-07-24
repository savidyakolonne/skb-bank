import api from "../api/axios";
import type { Dashboard } from "../types/Dashboard";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class DashboardService {

  async getDashboard(): Promise<Dashboard> {

    const response = await api.get<ApiResponse<Dashboard>>("/dashboard");

    return response.data.data;
  }

}

export default new DashboardService();