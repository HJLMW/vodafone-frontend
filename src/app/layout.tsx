import type { Metadata } from "next";
import "./globals.css";
import GlobalProvider from "./components/GlobalProvider";

export const metadata: Metadata = {
	title: "Vodafone",
	description: "Global IoT platform",
};

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
					<GlobalProvider>
						{children}
					</GlobalProvider>
				</div>
			</body>
		</html>
	);
}
