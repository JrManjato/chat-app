import React from "react";
import {channelProvider} from "@/provider/channel-provider";
import {IChannel} from "@/common/types";


export const ChannelItem = (props) => {
    const {id, channel, updateCurrentChannel} = props;
    const {name, _type} = channel;

    const fetchCurrentChannel = async () => {
        const currentChannel: IChannel = (await channelProvider.getChannelById(id)).data;

        updateCurrentChannel(currentChannel);
    }

    return (
        <div
            key={id}
            className="channel-item"
            onClick={fetchCurrentChannel}
        >
            <h2>{name}</h2>
        </div>
    )
}