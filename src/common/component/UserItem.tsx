import React from "react";
import {channelProvider} from "@/provider/channel-provider";
import {IChannel} from "@/common/types";


export const UserItem = (props) => {
    const {id, user} = props;
    const {name, _type} = user;

    return (
        <div
            key={id}
            className="channel-item"
        >
            <h2>{name}</h2>
        </div>
    )
}