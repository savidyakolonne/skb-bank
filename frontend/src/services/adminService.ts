import api from "../api/axios";
import type { AdminDashboard } from "../types/AdminDashboard";

class AdminService {

    async getDashboard(): Promise<AdminDashboard>{

        const response = 
            await api.get("/admin/dashboard");

        return response.data.data;
    }
}

export default new AdminService();