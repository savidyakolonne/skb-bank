import api from "../api/axios";
import type { Analytics } from "../types/Analytics";

class AnalyticsService {

    async getDashboardAnalytics(): Promise<Analytics> {

        const response =
            await api.get("/admin/analytics");

        return response.data.data;

    }

}

export default new AnalyticsService();