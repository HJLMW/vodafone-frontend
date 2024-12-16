"use client";

import { UserSessionProvider } from "@/contexts/userContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
	return (
		<AntdRegistry>
			<UserSessionProvider>
				{children}
			</UserSessionProvider>
		</AntdRegistry>
	)
}