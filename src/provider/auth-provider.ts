import {unauthenticatedRequest} from "@/provider/api";
import {setCookie} from "@/utils/cookie-management";

export const authProvider = {
    signIn: async (user: any) => {
        try {
            const currentUser: any = (await unauthenticatedRequest().post('/users/login', user)).data.user;

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
}