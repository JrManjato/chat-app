import {authenticatedRequest} from "@/provider/api";
import {IChannel, ICreateChannel} from "@/common/types";

export const channelProvider = {
    createChannel: async (newChannel: ICreateChannel) => {
        try {
            const createdChannel: IChannel = (await authenticatedRequest()?.post('/channel', newChannel)).data.channel;
            return { data: createdChannel, check: true };
        } catch (error) {
            return { data: null as any, check: false };
        }
    },
};