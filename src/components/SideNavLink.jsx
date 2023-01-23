import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function SideNavLink({ icon, title, to, isProtected  }) {
    const { currentUser } = useAuth();
    
    if(isProtected && currentUser.userType !== 'admin') {
        return null;
    }

    return (
        <NavLink to={to} className="nav-link">
            {icon}
            {title}
        </NavLink>
    )
}