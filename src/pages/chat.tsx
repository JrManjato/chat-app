import React, {useEffect} from 'react';
import {useRouter} from "next/router";

function ChatHomePage() {
    const router = useRouter();

    useEffect(() => {
       !localStorage.getItem('userInfo') && router.push("/login");
    }, [])

    return (
         <>HomePage for the chat</>
    );
}

export default ChatHomePage;