import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import withAuth from "@/common/utils/WithAuth";
import {removeCookie} from "@/utils/cookie-management";
import {Channel, Message, ChannelInfo} from "@/common/component";
import {IChannel} from "@/common/types";

const ChatHomePage = () => {
    const clearStorage = () => {
        removeCookie('userInfo');
    }
    const [currentChannel, setCurrentChannel] = useState<IChannel>();

    return (
        <>
            <div className='chat-container container-flex-row'>
                <Channel updateCurrentChannel={setCurrentChannel}/>
                <Message currentChannel={currentChannel}/>
                <ChannelInfo currentChannel={currentChannel}/>
            </div>
            <button
                type='button'
                onClick={() => {
                    clearStorage();
                }}
            >Clear Cookies
            </button>
        </>
    );
}

export default ChatHomePage;  // adding WithAth in prod