import useAuth from "../hooks/useAuth.js";

export default function({ children }) {
    const { currentUser: { user: { userType } } } = useAuth();
    
    
    if(!(['admin', 'developer','normal'].includes(userType))) {
        return null;
    }

    return children;
}