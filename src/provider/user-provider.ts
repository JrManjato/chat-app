import {authenticatedRequest} from "@/provider/api";
import {IRestUser} from "@/common/types";

export const userProvider = {
    getUsers: async () => {
        try {
            const response = await authenticatedRequest()?.get('/users');
            const currentUsers: IRestUser[] = response.data.users;
            return {data: currentUsers};
        } catch (error) {
            console.error('An error occurred while fetching users:', error);
            throw new Error('Failed to fetch users. Please try again later.'); // Throw a new error for higher-level handling
        }
    },
};