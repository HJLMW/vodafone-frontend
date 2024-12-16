import type { Metadata } from "next";
import "../globals.css";
import "./panel-styles.css";
import TopBar from "./components/Topbar/topBar";
import GlobalPanelProvider from "./components/Topbar/GlobalPanelProvider";

export const metadata: Metadata = {
	title: "Vodafone",
	description: "Global IoT platform",
};

// Main PanelLayout component that wraps the panel page content
export default function PanelLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// Wrapping content with the GlobalPanelProvider to provide context and global state to child components
		<GlobalPanelProvider>
			<div className="panel-root">
				<TopBar />
				<div className="panel-content">
					{children}
				</div>
			</div>
		</GlobalPanelProvider>
	);
}
