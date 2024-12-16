"use client";

import Login from "./login/page";
import { useUserSession } from "@/contexts/userContext";
import Home from "./panel/home/page";

// Main Page component
export default function Page() {
	// Accessing the current user session
	const { userSession } = useUserSession();

	// If no user session exists, show the login page
	if (!userSession)
		return <Login />;

	// Otherwise, return nothing (null) because middleware handle this and redirect to /panel
	return null;
}
