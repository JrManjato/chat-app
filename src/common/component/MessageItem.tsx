import React from "react";

export const MessageItem = ({message}) => {
    const {id, createdAt, content, sender} = message;

    const {name} = sender;
    return (
        <div
            className='message-container'
            key={id}
        >
            <span>{createdAt}</span>
            <h1>{name}</h1>
            <p>{content}</p>
        </div>
    )
}