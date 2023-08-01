import { Link, NavLink } from "react-router-dom";
import DashboardIcon from "./icons/DashboardIcon.jsx";
import RupeeIcon from "./icons/RupeeIcon.jsx";
import UserIcon from "./icons/UserIcon.jsx";
import Menu from "./Menu.jsx";

import Icon from "/icon.svg";
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
import {
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
  TOGGLE_SIDEBAR,
} from "../store/actions.js";
import CloseIcon from "./icons/CloseIcon.jsx";
import TransactionIcon from "./icons/TransactionIcon.jsx";
import ArrowRightIcon from "./icons/ArrowRightIcon.jsx";
import ArrowLeftIcon from "./icons/ArrowLeftIcon.jsx";
import CashTransactionIcon from "./icons/CashTransactionIcon.jsx";
import EditIcon from "./icons/EditIcon.jsx";
import BarGraphIcon from "./icons/BarGraphIcon.jsx";
import PercentageIcon from "./icons/PercentageIcon.jsx";
import { useEffect } from "react";
import HandshakeIcon from "./icons/HandshakeIcon.jsx";
import MenuIcon from "./icons/MenuIcon.jsx";
import FileTransferIcon from "./icons/FileTransferIcon.jsx";

export default function Sidebar({ open }) {
  const [state, dispatch] = useContext(StoreContext);

  const toggleSidebar = () => {
    dispatch({
      type: TOGGLE_SIDEBAR,
    });
  };

  useEffect(() => {
    if (open == null) {
      return;
    }

    dispatch({
      type: open ? OPEN_SIDEBAR : CLOSE_SIDEBAR,
    });
  }, [open]);

  return (
    <div
      className={`side-bar-container${state.sidebarOpen ? " open" : ""}`}
      style={{ width: state.sidebarOpen ? "280px" : "0px" }}
    >
      <div className="side-bar">
        <div className="flex p-1rem pb-0 jc-between ai-center">
          <button
            onClick={toggleSidebar}
            className="button icon-button small responsive-menu-toggle"
          >
            <ArrowLeftIcon />
          </button>
          <Link to="/" className="mx-auto">
          <img src={Icon} className="h-8" alt="iTaxEasy" />
          </Link>
          <div className="icon-box"></div>
        </div>
        <nav className="side-nav">
          <SideNavLink to="/" icon={<DashboardIcon />} title="Dashboard" />
          <ProtectedMenu>
            <Menu icon={<UserIcon />} title="Users">
              <SideNavLink to="/users" icon={<GlobeIcon />} title="All Users" />
              <SideNavLink
                to="/users"
                icon={<GlobeIcon />}
                title="Active Users"
              />
              <SideNavLink
                to="/users"
                icon={<GlobeIcon />}
                title="Non Active Users"
              />
            </Menu>
          </ProtectedMenu>
          {["normal", "developer"].includes(state.auth.currentUser.user.userType) ? (
            <>
              <Menu icon={<UserIcon />} title="My Account">
                <SideNavLink
                  icon={<GlobeIcon />}
                  to="https://itaxeasy.com/register-startup"
                  title="Services"
                  external
                />
                <SideNavLink icon={<GlobeIcon />} to="/orders" title="Orders" />
                <SideNavLink
                  icon={<GlobeIcon />}
                  to="/orders/payments"
                  title="Payments"
                />
                <SideNavLink
                  icon={<GlobeIcon />}
                  to="/"
                  title="APIs"
                  upcoming
                />
              </Menu>
            </>
          ) : null}
          <SideNavLink
            icon={<BankIcon />}
            to="/gst/gstr"
            title="Easy GST Return"
          />
          <Menu icon={<PercentageIcon />} title="ITR" upcoming>
            <SideNavLink icon={<GlobeIcon />} to="/" title="Form-16" />
            <SideNavLink icon={<GlobeIcon />} to="/" title="Form-2" />
            <SideNavLink icon={<GlobeIcon />} to="/" title="Form-2A" />
            <SideNavLink icon={<GlobeIcon />} to="/" title="Sehej" />
          </Menu>
          <Menu icon={<BarGraphIcon />} title="Easy Investment" upcoming>
            <SideNavLink icon={<GlobeIcon />} to="/" title="Mutual Fund" />
            <SideNavLink icon={<GlobeIcon />} to="/" title="SIP" />
            <SideNavLink icon={<GlobeIcon />} to="/" title="Sell of Share" />
            <SideNavLink
              icon={<GlobeIcon />}
              to="/"
              title="Purchase of Share"
            />
            <SideNavLink icon={<GlobeIcon />} to="/" title="Profit" />
            <SideNavLink icon={<GlobeIcon />} to="/" title="Loss" />
          </Menu>
          {/* <SideNavLink
            icon={<BillIcon />}
            to="/invoice"
            title="Invoice"
            external
            withToken
          /> */}
          <Menu icon={<BillIcon />} title="Invoice">
          <SideNavLink
              icon={<HandshakeIcon />}
              to="/invoice"
              title="Dashboard"
            />
             <SideNavLink
              icon={<UserIcon />}
              to="/invoice/addparty"
              title="Parties"
            />
             <SideNavLink
              icon={<FileTransferIcon />}
              to="/invoice/createitem"
              title="Items"
            />
            </Menu>

            
         
           
          <Menu icon={<RupeeIcon />} title="Finance">
          <SideNavLink
              icon={<HandshakeIcon />}
              to="/insurance"
              title="Insurance"
            />
            <SideNavLink icon={<BankIcon />} to="/loan" title="Loan" />
            <SideNavLink
              icon={<ArrowLeftIcon />}
              to="/payments"
              title="Payment"
            />
            <SideNavLink icon={<GlobeIcon />} to="/" title="Working Capital" />
          </Menu>
          <Menu icon={<TransactionIcon />} title="Transactions" upcoming>
            <SideNavLink icon={<ArrowRightIcon />} to="/" title="Recipt" />
            <SideNavLink icon={<ArrowLeftIcon />} to="/" title="Payment" />
            <SideNavLink icon={<CashTransactionIcon />} to="/" title="Cash" />
            <SideNavLink icon={<BankIcon />} to="/" title="Bank" />
          </Menu>
          <Menu icon={<ReportsIcon />} title="Reports">
            {/* <SideNavLink icon={<GlobeIcon />} to='/' title="Trading Account" />
                        <SideNavLink icon={<GlobeIcon />} to='/' title="Profit &amp; Loss" /> */}
            <SideNavLink
              icon={<ReportsIcon />}
              to="/project-report"
              title="Project Report"
            />
            {/* <SideNavLink icon={<GlobeIcon />} to='/' title="Balance Acc" /> */}
          </Menu>
          <Menu icon={<BillIcon />} title="Bill Payment">
            <SideNavLink
              icon={<GlobeIcon />}
              to="/"
              title="Electricity Bill"
              upcoming
            />
            <SideNavLink
              icon={<GlobeIcon />}
              to="/"
              title="Mobile Recharge"
              upcoming
            />
            <SideNavLink
              icon={<GlobeIcon />}
              to="/"
              title="Gas Bill"
              upcoming
            />
          </Menu>
          {/* <Menu icon={<ReportsIcon />} title="Reports" upcoming>
                        <SideNavLink icon={<GlobeIcon />} to='/' title="Trading Account" />
                        <SideNavLink icon={<GlobeIcon />} to='/' title="Profit &amp; Loss" />
                        <SideNavLink icon={<GlobeIcon />} to='/' title="Balance Acc" />
                    </Menu>  */}
          <ProtectedMenu>
            <Menu icon={<WindowIcon />} title="Web Settings">
              <SideNavLink
                icon={<GlobeIcon />}
                to="/update/homepage"
                title="Home Page"
              />
              <SideNavLink
                icon={<GlobeIcon />}
                to="/update/footer"
                title="Footer"
              />
              <SideNavLink icon={<GlobeIcon />} to="/blog" title="Blog" />
              <SideNavLink
                icon={<GlobeIcon />}
                to="/services"
                title="Services"
              />
              <SideNavLink
                icon={<GlobeIcon />}
                to="/e-library"
                title="e-library"
              />
              <SideNavLink icon={<GlobeIcon />} to="/career" title="Career" />
            </Menu>
          </ProtectedMenu>
          <ProtectedMenu>
            <Menu icon={<AccountIcon />} title="Admin">
              <SideNavLink
                icon={<GlobeIcon />}
                to="/admin/insurance"
                title="Insourance"
              />
            </Menu>
          </ProtectedMenu>
          <Menu icon={<SettingsIcon />} title="Settings">
            <SideNavLink
              icon={<AccountIcon />}
              to="/settings/my-account"
              title="My Account"
            />
            {/* <SideNavLink icon={<GlobeIcon />} to='/settings/language' title="Language" /> */}
            <SideNavLink
              icon={<PasswordIcon />}
              to="/settings/change-password"
              title="Change Password"
            />
          </Menu>
        </nav>
      </div>
    </div>
  );
}