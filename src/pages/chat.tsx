import React from 'react';
import withAuth from "@/common/utils/WithAuth";
import {getAccessToken, getCookie, removeCookie} from "@/utils/cookie-management";

function ChatHomePage() {
    const clearStorage = () => {
       removeCookie('userInfo');
    }
    return (
        <>HomePage for the chat
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