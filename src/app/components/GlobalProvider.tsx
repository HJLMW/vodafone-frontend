"use client";

import { UserSessionProvider } from "@/contexts/userContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
	return (
		// Ensures Ant Design styles are correctly applied
		<AntdRegistry>
			{/* Provides user session context */}
			<UserSessionProvider>
				{children}
			</UserSessionProvider>
		</AntdRegistry>
	);
}
