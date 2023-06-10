import {authenticatedRequest} from "@/provider/api";
import {ICreateMessage, IMessage, IRestUser, IUpdateUser, IUser} from "@/common/types";
import {emptyStringToNull} from "@/utils";

export const messageProvider = {
    getMessagesByUser: async (userID: string) => {
        try {
            const response = await authenticatedRequest()?.get(`/messages/${userID}`);
            const currentMessages: IMessage[] = response.data.messages;
            return {data: currentMessages};
        } catch (error) {
            console.error('An error occurred while fetching messages:', error);
            throw new Error('Failed to fetch messages. Please try again later.'); // Throw a new error for higher-level handling
        }
    },
    getMessagesByChannel: async (channelID: string) => {
        try {
            const response = await authenticatedRequest()?.get(`/messages/channel/${channelID}`);
            const currentMessages: IMessage[] = response.data.messages;
            return {data: currentMessages};
        } catch (error) {
            console.error('An error occurred while fetching messages:', error);
            throw new Error('Failed to fetch messages. Please try again later.'); // Throw a new error for higher-level handling
        }
    },
    sendMessage: async (newMessage: ICreateMessage) => {
        try {
            const response = await authenticatedRequest()?.post('/message', newMessage);
            const currentMessages: IMessage = response.data.messages;
            return {data: currentMessages};
        } catch (error) {
            console.error('An error occurred while fetching messages:', error);
            throw new Error('Failed to fetch messages. Please try again later.'); // Throw a new error for higher-level handling
        }
    },
};