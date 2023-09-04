import React, { Suspense, useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";

function LoadingScreen() {
    return (
        <div className="fixed h-screen w-screen flex items-center justify-center">
            Loading...
        </div>
    );
}

export default function ITRListBox() {
    const [selectedMenuItem, setSelectedMenuItem] = useState("");
    const [isSmallOrMediumScreen, setIsSmallOrMediumScreen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallOrMediumScreen(window.innerWidth <= 1000);
        };

        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    const handleSelectChange = (event) => {
        setSelectedMenuItem(event.target.value);
        navigate(event.target.value);
    };

    return (
        <div className="container mx-auto">
            <Sidebar />
            <div className="w-full">
                <Topbar className="main" />
                <div className="flex flex-col">
                    {isSmallOrMediumScreen ? (
                        <select
                            onChange={handleSelectChange}
                            value={selectedMenuItem}
                            className="rounded-md p-3 mt-2  border-blue-500 hover:border-b-4 hover:border-blue-500"
                            style={{ transition: 'border 0.3s ease-in-out' }}
                        >
                            <option value="" disabled>
                                Select a menu item
                            </option>
                            {menu.map((item) => (
                                <option key={item.link} value={item.link}>
                                    {item.label}
                                </option>
                            ))}
                        </select>

                    ) : (
                            <ul className="flex p-5 justify-around font-normal flex-wrap min-w-fit">
                            {menu.map((items) => (
                                <Link
                                    key={items.label}
                                    to={items.link}
                                    className="border-blue-500 hover:border-b-4 hover:border-blue-500 text-blue-600"
                                    style={{ transition: 'border 0.3s ease-in-out' }}
                                >
                                    {items.label}
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
                <section className="w-full py-10">
                    <Suspense fallback={<LoadingScreen />}>
                        <Outlet />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}

const menu = [
    {
        link: "/form-16/",
        label: "Import Form 16",
    },
    {
        link: "/form-16/itrForm-filling",
        label: "Form 16",
    },
    {
        link: "/form-16/deductions",
        label: "Deductions",
    },
    {
        link: "/form-16/tax-payable",
        label: "Tax Payable",
    },
    {
        link: "/form-16/taxes-paid",
        label: "Taxes Paid",
    },
    {
        link: "/form-16/taxes-filing",
        label: "Taxes Filing",
    },
];
