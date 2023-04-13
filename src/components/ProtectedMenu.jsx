import useAuth from "../hooks/useAuth.js";

export default function({ children }) {
    const { currentUser } = useAuth();
    
    if(!(['admin', 'developer'].includes(currentUser.userType))) {
        return null;
    }

    return children;
}