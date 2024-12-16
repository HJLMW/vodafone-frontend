import type { Metadata } from "next";
import "./globals.css";
import GlobalProvider from "./components/GlobalProvider";

export const metadata: Metadata = {
	title: "Vodafone",
	description: "Global IoT platform",
};

// Main layout component that wraps the whole app content
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link href='https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css' rel='stylesheet' />
			</head>
			<body>
				<div className="root-content">
					{/* Wrapping content with the GlobalPanelProvider to provide context and global state to child components */}
					<GlobalProvider>
						{children}
					</GlobalProvider>
				</div>
			</body>
		</html>
	);
}
