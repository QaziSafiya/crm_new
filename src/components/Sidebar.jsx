import { Link, NavLink } from "react-router-dom";
import DashboardIcon from "./icons/DashboardIcon.jsx";
import RupeeIcon from "./icons/RupeeIcon.jsx";
import UserIcon from "./icons/UserIcon.jsx";
import Menu from "./Menu.jsx";

import Logo from '../assets/logo.png';
import SideNavLink from "./SideNavLink.jsx";
import BankIcon from "./icons/BankIcon.jsx";
import BillIcon from "./icons/BillIcon.jsx";
import ReportsIcon from "./icons/ReportsIcon.jsx";
import WindowIcon from "./icons/WindowIcon.jsx";
import GlobeIcon from "./icons/GlobeIcon.jsx";
import SettingsIcon from "./icons/SettingsIcon.jsx";
import { useContext } from "react";
import { StoreContext } from "../store/store-context.js";
import ProtectedMenu from "./ProtectedMenu.jsx";
import ToolIcon from "./icons/ToolIcon.jsx";
import PasswordIcon from "./icons/PasswordIcon.jsx";
import AccountIcon from "./icons/AccountIcon.jsx";
import { CLOSE_SIDEBAR, OPEN_SIDEBAR, TOGGLE_SIDEBAR } from "../store/actions.js";
import CloseIcon from "./icons/CloseIcon.jsx";
import TransactionIcon from "./icons/TransactionIcon.jsx";
import ArrowRightIcon from "./icons/ArrowRightIcon.jsx";
import ArrowLeftIcon from "./icons/ArrowLeftIcon.jsx";
import CashTransactionIcon from "./icons/CashTransactionIcon.jsx";
import EditIcon from "./icons/EditIcon.jsx";
import BarGraphIcon from "./icons/BarGraphIcon.jsx";
import PercentageIcon from "./icons/PercentageIcon.jsx";
import { useEffect } from "react";

export default function Sidebar({ open }) {
    const [state, dispatch] = useContext(StoreContext);

    const toggleSidebar = () => {
        dispatch({
            type: TOGGLE_SIDEBAR
        })
    };

    useEffect(() => {
        if(open == null) {
            return;
        }

        dispatch({
            type: open ? OPEN_SIDEBAR : CLOSE_SIDEBAR
        });
    }, [open]);

    return (
        <div className={`side-bar${state.sidebarOpen ? ' open' : ''}`} style={{ width: state.sidebarOpen ? '280px' : '0px' }}>
            <div className="flex p-1rem jc-center ai-center">
                <button onClick={toggleSidebar} className="button icon-button small responsive-menu-toggle">
                    <CloseIcon />
                </button>
                <Link to="/">
                    <img src={Logo} height={48} alt="iTaxEasy" />
                </Link>
            </div>
            <nav className="side-nav">
                <SideNavLink to='/' icon={<DashboardIcon />} title='Dashboard' />
                <ProtectedMenu>
                    <Menu icon={<UserIcon />} title="Users">
                        <SideNavLink to='/users' icon={<GlobeIcon />} title='All Users' />
                        <SideNavLink to='/users' icon={<GlobeIcon />} title='Active Users' />
                        <SideNavLink to='/users' icon={<GlobeIcon />} title='Non Active Users' />
                    </Menu>
                </ProtectedMenu>
                {
                    state.auth.currentUser.userType === 'normal'
                        ? (
                            <Menu icon={<UserIcon />} title="Customers">
                                <SideNavLink to='/customers' icon={<GlobeIcon />} title='All Customers' />
                                <SideNavLink to='/add-customer' icon={<EditIcon />} title='Add Customer' />
                            </Menu>
                        )
                        : null
                }
                <SideNavLink icon={<BankIcon />} to='/gst/gstr1' title="Easy GST Return" />
                <Menu icon={<PercentageIcon />} title="ITR" upcoming>
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Form-16" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Form-2" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Form-2A" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Sehej" />
                </Menu> 
                <Menu icon={<BarGraphIcon />} title="Easy Investment" upcoming>
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Mutual Fund" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="SIP" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Sell of Share" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Purchase of Share" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Profit" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Loss" />
                </Menu> 
                <SideNavLink icon={<BillIcon />} to='/' title="Invoice" external withToken />
                <Menu icon={<RupeeIcon />} title="Finance">
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Car Loan" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Business Loan" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Home Loan" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Loan against Property" />
                    <SideNavLink icon={<GlobeIcon />} to='/payments' title="Payment" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Working Capital" />
                </Menu> 
                <Menu icon={<TransactionIcon />} title="Transactions" upcoming>
                    <SideNavLink icon={<ArrowRightIcon />} to='/' title="Recipt" />
                    <SideNavLink icon={<ArrowLeftIcon />} to='/' title="Payment" />
                    <SideNavLink icon={<CashTransactionIcon />} to='/' title="Cash" />
                    <SideNavLink icon={<BankIcon />} to='/' title="Bank" />
                </Menu> 
                <Menu icon={<ReportsIcon />} title="Reports" >
                    {/* <SideNavLink icon={<GlobeIcon />} to='/' title="Trading Account" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Profit &amp; Loss" /> */}
                <SideNavLink icon={<ReportsIcon />} to='/project-report' title="Project Report" />
                    {/* <SideNavLink icon={<GlobeIcon />} to='/' title="Balance Acc" /> */}
                </Menu> 
                <ProtectedMenu>
                    <Menu icon={<WindowIcon />} title="Web Settings">
                        <SideNavLink icon={<GlobeIcon />} to='/update/homepage' title="Home Page" />
                        <SideNavLink icon={<GlobeIcon />} to='/update/footer' title="Footer" />
                        <SideNavLink icon={<GlobeIcon />} to='/blog' title="Blog" />
                        <SideNavLink icon={<GlobeIcon />} to='/services' title="Services" />
                    </Menu> 
                </ProtectedMenu>
                <Menu icon={<SettingsIcon />} title="Settings">
                    <SideNavLink icon={<AccountIcon />} to='/settings/my-account' title="My Account" />
                    <SideNavLink icon={<GlobeIcon />} to='/settings/language' title="Language" />
                    <SideNavLink icon={<PasswordIcon />} to='/settings/change-password' title="Change Password" />
                </Menu> 
            </nav>
        </div>
    )
}