"use client";

import { useUserSession } from "@/contexts/userContext";
import { useRouter } from "next/navigation";

// Main Page component
export default function Page() {
	// Accessing the current user session
	const { userSession } = useUserSession();
	const router = useRouter();

	// If no user session exists, redirect to the login page, otherwise redirect to panel.
	if (!userSession)
		router.replace("/login");
	else
		router.replace("/panel");

	return null;
}
