"use client";

import Image from "next/image";
import "./topBar-styles.css";
import Logo from "@public/images/vodafone-logo.jpg";
import { usePathname, useRouter } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useState } from "react";
import { useUserSession } from "@/contexts/userContext";

interface TopBarItem {
	pathname: string;
	label: string;
}

// Items to display in the top bar navigation
const topBarItems: TopBarItem[] = [
	{
		pathname: "/panel",
		label: "Home",
	},
	{
		pathname: "/panel/devices",
		label: "Devices",
	}
];

// Top nav bar comopnent used in the whole /panel path web.
export default function TopBar() {
	// Get current route pathname and router functions
	const router = useRouter();
	const pathname = usePathname();

	// Get user session and session management functions
	const { userSession, deleteUserSession } = useUserSession();

	// State to control Popover visibility for user actions (e.g., logout)
	const [openOver, setOpenOver] = useState(false);

	// Navigation handler to go to the selected route
	const handleItemNavigation = (pathname: string) => router.push(pathname);

	// Control visibility of Popover when user clicks on the account icon
	const handleOpenChange = (newOpen: boolean) => setOpenOver(newOpen);

	// Handle user logout action
	const handleLogout = () => {
		const result = confirm("Are you sure you want to logout?");

		// Cancel if user doesn't confirm logout
		if (!result) return;

		// Delete user session on logout, redirecting the user to the login page.
		deleteUserSession();
	}

	// Popover content to show the logout option
	const popOverContent = (
		<div className="topBar-popOver">
			<span onClick={handleLogout}>Logout</span>
		</div>
	);

	return (
		<div className="topBar-root">
			<div className="topBar-content">
				{/* Logo with click to navigate to the home page */}
				<img
					src={Logo.src}
					alt="Vodafone logo"
					width={75}
					className="topBar-logo"
					onClick={() => router.push("/")}
				/>

				<div className="topBar-items">
					{/* Render navigation items with dynamic styling based on active route */}
					{topBarItems.map((item, index) => (
						<span
							key={index}
							className="topBar-item"
							style={
								pathname === item.pathname || (item.pathname === "/panel" && pathname === ("/panel/home"))
									? { fontWeight: 700 } // Apply bold styling for the active item
									: undefined
							}
							onClick={() => handleItemNavigation(item.pathname)} // Navigate on click
						>
							{item.label}
						</span>
					))}
				</div>

				{/* Popover for user account actions, shows user name and logout option */}
				<Popover
					content={popOverContent}
					title={userSession?.split("@")[0]} // Display part of the email as title
					trigger="click"
					open={openOver}
					onOpenChange={handleOpenChange}
				>
					<div className="topBar-account">
						<UserOutlined />
					</div>
				</Popover>
			</div>
		</div>
	);
}