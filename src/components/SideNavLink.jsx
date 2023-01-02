import { NavLink } from "react-router-dom";

export default function SideNavLink({ icon, title, to  }) {
    return (
        <NavLink to={to} className="nav-link">
            {icon}
            {title}
        </NavLink>
    )
}