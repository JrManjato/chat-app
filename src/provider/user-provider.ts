import {authenticatedRequest} from "@/provider/api";
import {IRestUser, IUpdateUser, IUser} from "@/common/types";
import {emptyStringToNull} from "@/utils";

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
    getUser: async () => {
        try {
            const response = await authenticatedRequest()?.get('/user');
            const currentUser: IUser = response.data.user;
            return {data: currentUser};
        } catch (error) {
            console.error('An error occurred while fetching user:', error);
            throw new Error('Failed to fetch user. Please try again later.'); // Throw a new error for higher-level handling
        }
    },
    updateUser: async (userInfo: IUpdateUser) => {
        try {
            const response = await authenticatedRequest()?.put('/user', emptyStringToNull(userInfo));
            const currentUser: IUser = response.data.user;
            return {data: currentUser};
        } catch (error) {
            console.error('An error occurred while fetching user:', error);
            throw new Error('Failed to fetch user. Please try again later.'); // Throw a new error for higher-level handling
        }
    },
};