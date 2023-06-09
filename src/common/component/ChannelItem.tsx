import React from "react";
import {router} from "next/client";


export const ChannelItem = (props) => {
    const {channel, _updateCurrentDiscussion} = props;
    const {name, _type} = channel;

    const editChannelByID = async () => {
      /*  const currentChannel: IChannel = (await channelProvider.getChannelById(channel.id)).data;

        updateCurrentDiscussion(currentChannel);

       */

        await router.push(`/channel/edit/${channel.id}`);
    }

    return (
        <div
            key={channel.id}
            className="channel-item"
            onClick={editChannelByID}
        >
            <h2>{name}</h2>
        </div>
    )
}