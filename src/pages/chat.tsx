import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import withAuth from "@/common/utils/WithAuth";
import {removeCookie} from "@/utils/cookie-management";
import {Channel, Message, ChannelInfo} from "@/common/component";
import {IChannel, IRestUser} from "@/common/types";
import {userProvider} from "@/provider/user-provider";

const ChatHomePage = () => {
    const clearStorage = () => {
        removeCookie('userInfo');
    }
    const [currentDiscussion, setCurrentDiscussion] = useState<IChannel | IRestUser>();
    const [members, setMembers] = useState<IRestUser[]>();

    useEffect(() => {
        userProvider.getUsers()
            .then((users) => {
                setMembers(users.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])
    return (
        <>
            <div className='chat-container container-flex-row'>
                <Channel updateCurrentDiscussion={setCurrentDiscussion} members={members}/>
                <Message currentDiscussion={currentDiscussion}/>
                <ChannelInfo currentDiscussion={currentDiscussion} members={members}/>
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