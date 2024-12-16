"use client";

import Login from "./login/page";
import { useUserSession } from "@/contexts/userContext";
import Home from "./panel/home/page";

export default function Page() {
	const { userSession } = useUserSession();

	if (!userSession)
		return <Login />;

	return <Home />;
}