import React from "react";


export const ChannelItem = (props) => {
    const {id, channel} = props;
    const {name, _type} = channel;
    return (
        <div key={id} className="channel-item">
            <h2>{name}</h2>
        </div>
    )
}