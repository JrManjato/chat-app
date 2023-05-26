import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import withAuth from "@/common/utils/WithAuth";
import {removeCookie} from "@/utils/cookie-management";
import {IRestUser} from "@/common/types";
import {Channel} from "@/common/component/Channel";

type FormData = {
    name: string;
    type: 'public' | 'private';
    members: IRestUser[];
};

const ChatHomePage = () => {
    const clearStorage = () => {
        removeCookie('userInfo');
    }
    return (
        <>
            <div className='chat-container container-flex-row'>
               <Channel />
                <div className='message-container'>
                    <h1>We have to place the selectedChannel's name here</h1>
                </div>
                <div className='channel-info-container'>
                    <h1>ChannelInfo here</h1>
                </div>
            </div>
            HomePage for the chat
            <button
                type='button'
                onClick={() => {
                    clearStorage();
                }}
            >Clear
            </button>
        </>
    );
}

export default ChatHomePage;