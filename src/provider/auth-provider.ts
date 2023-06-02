import {unauthenticatedRequest} from "@/provider/api";
import {setCookie} from "@/utils/cookie-management";
import {ICreateUser, ILoginUser, IUser} from "@/common/types";

export const authProvider = {
    signIn: async (user: ILoginUser) => {
        try {
            const currentUser: IUser = (await unauthenticatedRequest().post('/users/login', user)).data.user;

            // store the logged-in user's information in the cookie
            setCookie('userInfo', JSON.stringify(currentUser));

            return {data: currentUser, authenticate: true};
        } catch (error) {
            const {
                response: {data},
            } = error as any;

            return {data, authenticate: false};
        }
    },
    signUp: async (user: ICreateUser) => {
        try {
            const currentUser: IUser = (await unauthenticatedRequest().post('/users', user)).data.user;

            return {data: currentUser, authenticate: true};
        } catch (error) {
            const {
                response: {data},
            } = error as any;

            return {data, authenticate: false};
        }
    },
}