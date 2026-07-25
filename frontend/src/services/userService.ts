import api from "../api/axios";
import type { User } from "../types/auth";

class UserService {

    async getAll(): Promise<User[]> {

        const response =
            await api.get("/users");

        return response.data.data;
    }
}

export default new UserService();