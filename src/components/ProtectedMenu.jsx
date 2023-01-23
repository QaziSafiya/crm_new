import useAuth from "../hooks/useAuth.js";

export default function({ children }) {
    const { currentUser } = useAuth();

    if(currentUser.userType !== 'admin') {
        return null;
    }

    return children;
}