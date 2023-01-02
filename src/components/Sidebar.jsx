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
import { useContext, useRef } from "react";
import { StoreContext } from "../store/store-context.js";

export default function Sidebar() {
    const [state] = useContext(StoreContext);

    return (
        <div className={`side-bar${state.sidebarOpen ? ' open' : ''}`} style={{ width: state.sidebarOpen ? '280px' : '0px' }}>
            <div className="flex p-1rem jc-center">
                <Link to="/">
                    <img src={Logo} height={24} alt="iTaxEasy" />
                </Link>
            </div>
            <nav className="side-nav">
                <SideNavLink to='/' icon={<DashboardIcon />} title='Dashboard' />
                <SideNavLink to='/users' icon={<UserIcon />} title='Users' />
                <Menu icon={<BankIcon />} title="Easy GST Return">
                    <SideNavLink icon={<GlobeIcon />} to='/' title="GSTR1" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="GSTR2A" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="GSTR2B" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="GSTR3" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="GSTR4" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="GSTR7" />
                </Menu> 
                <Menu icon={<BankIcon />} title="ITR">
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Form-16" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Form-2" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Form-2A" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Sehej" />
                </Menu> 
                <Menu icon={<RupeeIcon />} title="Finance">
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Invoice" />
                </Menu> 
                <Menu icon={<BillIcon />} title="Transactions">
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Recipt" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Payment" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Cash" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Bank" />
                </Menu> 
                <Menu icon={<ReportsIcon />} title="Reports">
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Trading Account" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Profit &amp; Loss" />
                    <SideNavLink icon={<GlobeIcon />} to='/' title="Balance Acc" />
                </Menu> 
                <Menu icon={<WindowIcon />} title="Web Front">
                    <SideNavLink icon={<GlobeIcon />} to='/edit/home-page' title="Home Page" />
                    <SideNavLink icon={<GlobeIcon />} to='/edit/footer' title="Footer" />
                    <SideNavLink icon={<GlobeIcon />} to='/edit/blog' title="Blog" />
                </Menu> 
                <Menu icon={<SettingsIcon />} title="Settings">
                    <SideNavLink icon={<GlobeIcon />} to='/settings/language' title="Language" />
                    <SideNavLink icon={<GlobeIcon />} to='/settings/change-password' title="Change Password" />
                </Menu> 
            </nav>
        </div>
    )
}