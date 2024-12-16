"use client";

import { IoTProvider } from "@/contexts/iotContext";
import React from "react";

export default function GlobalPanelProvider({ children }: { children: React.ReactNode }) {
	return (
		<IoTProvider>
			{children}
		</IoTProvider>
	)
}