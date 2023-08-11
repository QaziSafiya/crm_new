import useAuth from "../hooks/useAuth.js";

export default function({ children }) {
    const { currentUser } = useAuth();
    
    if(!(['admin', 'developer', 'normal'].includes(currentUser?.user.userType))) {
        return null;
    }

    return children;
}
