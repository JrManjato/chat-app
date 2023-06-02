import React from "react";
import {channelProvider} from "@/provider/channel-provider";
import {IChannel} from "@/common/types";


export const ChannelInfo = (props) => {
    const {currentChannel} = props;
    return (
        <div className='channel-info-container'>
            <h1>{currentChannel?.name}</h1>

        </div>
    )
}