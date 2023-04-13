import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import TELink from "./TELink.jsx";

export default function SideNavLink({ icon, title, to, isProtected, upcoming = false, external = false, withToken = false  }) {
    const { currentUser } = useAuth();
    
    if(isProtected && !(['admin', 'developer'].includes(currentUser.userType))) {
        return null;
    }

    return (
        external
            ? withToken
                ? (
                    <TELink path={to} className="nav-link">
                        {icon}
                        <div className="inline-flex jc-center ai-center g-0_5rem">
                            {title}
                            {upcoming ? (
                                <span className="upcoming">upcoming</span>
                            ) : null}
                        </div>
                    </TELink>
                )
                : (
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