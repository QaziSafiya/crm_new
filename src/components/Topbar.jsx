import { useContext } from "react";
import { Link } from "react-router-dom";
import { LOGOUT, TOGGLE_SIDEBAR } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";
import HoverMenu from "./HoverMenu.jsx";
import AccountIcon from "./icons/AccountIcon.jsx";
import MenuIcon from "./icons/MenuIcon.jsx";
import ThemeButton from "./ThemeButton.jsx";

export default function Topbar() {
    const [state, dispatch] = useContext(StoreContext);

    const toggleSidebar = () => {
        dispatch({
            type: TOGGLE_SIDEBAR
        })
    };

    const handleSignOut = () => {
        dispatch({
            type: LOGOUT
        });
    };

    return (
        <div className="top-bar">
            <div className="inline-flex ai-center text-secondary g-1rem">
                <button onClick={toggleSidebar} className="button icon-button secondary-icon small">
                    <MenuIcon />
                </button>
                <h1 className="title">BillShill</h1>
            </div>
            <div className="flex g-1rem ai-center">
                <ThemeButton />
                <HoverMenu icon={<AccountIcon />} tooltip="Account">
                    <ul className="list-menu">
                        <li>
                            <Link className="list-menu-item" to='/roles'>Manage Roles</Link>
                        </li>
                        <li>
                            <Link className="list-menu-item" to='/settings/my-account'>My Account</Link>
                        </li>
                        <li>
                            <button
                                onClick={handleSignOut}
                                className="flex button list-menu-item is-small w-100pc jc-start"
                            >Log out</button>
                        </li>
                    </ul>
                </HoverMenu>
            </div>
        </div>
    )
}