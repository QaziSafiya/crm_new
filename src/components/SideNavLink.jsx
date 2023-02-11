import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function SideNavLink({ icon, title, to, isProtected, upcoming = false, external = false  }) {
    const { currentUser } = useAuth();
    
    if(isProtected && currentUser.userType !== 'admin') {
        return null;
    }

    return (
        external
            ? (
                <a href={to} target='_blank' className="nav-link">
                    {icon}
                    <div className="inline-flex jc-center ai-center g-0_5rem">
                        {title}
                        {upcoming ? (
                            <span className="upcoming">upcoming</span>
                        ) : null}
                    </div>
                </a>
            )
            : (
                <NavLink to={upcoming ? '/' : to} className="nav-link">
                    {icon}
                    <div className="inline-flex jc-center ai-center g-0_5rem">
                        {title}
                        {upcoming ? (
                            <span className="upcoming">upcoming</span>
                        ) : null}
                    </div>
                </NavLink>
            )
    )
}