import React from 'react';
import withAuth from "@/pages/component/WithAuth";
import {getCookie, removeCookie} from "@/utils/cookie-management";

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
            {getCookie('userInfo')}
        </>
    );
}

export default withAuth(ChatHomePage);