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

export default function TopBar() {
	const router = useRouter();
	const pathname = usePathname();
	const { userSession, deleteUserSession } = useUserSession();

	const [openOver, setOpenOver] = useState(false);

	const handleItemNavigation = (pathname: string) => router.push(pathname);
	const handleOpenChange = (newOpen: boolean) => setOpenOver(newOpen);

	const handleLogout = () => {
		const result = confirm("Are you sure you want to logout?");
		if (!result) return;

		deleteUserSession();
	}

	const popOverContent = (
		<div className="topBar-popOver">
			<span onClick={handleLogout}>Logout</span>
		</div>
	);

	return (
		<div className="topBar-root">
			<div className="topBar-content">
				<img
					src={Logo.src}
					alt="Vodafone logo"
					width={75}
					className="topBar-logo"
					onClick={() => router.push("/")}
				/>

				<div className="topBar-items">
					{topBarItems.map((item, index) => (
						<span
							key={index}
							className="topBar-item"
							style={
								pathname === item.pathname || (item.pathname === "/panel" && pathname === ("/panel/home"))
									? { fontWeight: 700 }
									: undefined
							}
							onClick={() => handleItemNavigation(item.pathname)}
						>
							{item.label}
						</span>
					))}
				</div>

				<Popover
					content={popOverContent}
					title={userSession?.split("@")[0]}
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
