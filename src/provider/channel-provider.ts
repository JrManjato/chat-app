import {authenticatedRequest} from "@/provider/api";
import {IChannel, ICreateChannel, IRestUser} from "@/common/types";

export const channelProvider = {
    createChannel: async (newChannel: ICreateChannel) => {
        try {
            const createdChannel: IChannel = (await authenticatedRequest()?.post('/channel', newChannel)).data.channel;
            return { data: createdChannel, check: true };
        } catch (error) {
            return { data: null as any, check: false };
        }
    },
    getChannels: async () => {
        try {
            const response = await authenticatedRequest()?.get('/channels');
            const currentChannels: IChannel[] = response.data.channels;
            return {data: currentChannels};
        } catch (error) {
            console.error('An error occurred while fetching channels:', error);
            throw new Error('Failed to fetch channels. Please try again later.');
        }
    },
    getChannelById: async (id: number) => {
        try {
            const response = await authenticatedRequest()?.get(`/channel/${id}`);
            const currentChannel: IChannel = response.data.channel;
            return {data: currentChannel};
        } catch (error) {
            console.error('An error occurred while fetching channel:', error);
            throw new Error('Failed to fetch channel. Please try again later.');
        }
    },
};