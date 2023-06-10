import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {getCookie} from "@/utils/cookie-management";

// A HOC to protect a route
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
        }, []);

        // Additional check to prevent rendering the protected page if not authenticated
        if (!isAuthenticated) return null; // we can also return a loading utils, or redirect to a different page

        return <WrappedComponent {...props} />;
    };
}
