import React from 'react';
import withAuth from "@/common/utils/WithAuth";
import {removeCookie} from "@/utils/cookie-management";

function ChatHomePage() {
    const clearStorage = () => {
        removeCookie('userInfo');
    }
    return (
        <>
            <div className='chat-container container-flex-row'>
                <div className='channel-container'>
                    <h1>Channel list</h1>

                </div>
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

export default withAuth(ChatHomePage);