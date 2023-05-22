import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {getCookie} from "@/utils/cookie-management";

export default function withAuth(WrappedComponent) {
    return function WithAuthComponent(props) {
        const router = useRouter();
        const isAuthenticated = getCookie('userInfo');

        useEffect(() => {
            // Check if the user is authenticated, otherwise redirect

            // Authentication check logic
            if (!isAuthenticated) {
                router.push('/login'); // Redirect to login page
            }
            else{
                router.push("/chat");
            }
        }, []);

        // Additional check to prevent rendering the protected page if not authenticated
        if (!isAuthenticated) {
            return null; // we can also return a loading component, or redirect to a different page
        }

        return <WrappedComponent {...props} />;
    };
}
