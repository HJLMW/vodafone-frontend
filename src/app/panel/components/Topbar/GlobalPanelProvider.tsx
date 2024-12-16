"use client";

import { IoTProvider } from "@/contexts/iotContext";
import React from "react";

// Global provider component to wrap the application with IoT context.
// Allows to obtain all IoT devices by loading the context in any path
// within /panel, in addition to being able to obtain, create, edit
// and delete the iots using the context values.
export default function GlobalPanelProvider({ children }: { children: React.ReactNode }) {
	return (
		// Wrapping children with the IoTProvider to provide IoT context to the entire /panel path component tree
		<IoTProvider>
			{children}
		</IoTProvider>
	)
}