import React, {useEffect, useState} from "react";
import {Button, Modal} from "antd";
import {IChannel, IRestUser} from "@/common/types";

import {channelProvider} from "@/provider/channel-provider";
import {ChannelItem} from "@/common/component/ChannelItem";
import {UserItem} from "@/common/component/UserItem";
import {router} from "next/client";


export const Channel = ({updateCurrentDiscussion, members}) => {
    const [channelList, setChannelList] = useState<IChannel[]>();

    useEffect(() => {
        channelProvider.getChannels()
            .then((channels) => {
                setChannelList(channels.data);
            }).catch((error) => {
            console.error(error);
        });
    }, [])

    return (
        <div className='channel-container'>
            <h1>Channel list</h1>
            <Button
                type="primary"
                onClick={async () => router.push('/channel/create')} //redirect at create channel
            >
                Add channel
            </Button>
            <div className="channel-list">
                {channelList?.map((channel:IChannel) => (
                    <ChannelItem
                        channel={channel}
                        updateCurrentDiscussion={updateCurrentDiscussion}
                    />
                ))}
                {members?.map((user:IRestUser) => (
                    <UserItem
                        id={user.id}
                        user={user}
                    />
                ))}
            </div>
        </div>
    )
}