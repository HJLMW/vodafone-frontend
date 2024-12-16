"use client";

import { useEffect, useRef } from "react";
import "./home-styles.css";
import Loading from "@/app/components/Loading/loading";
import dynamic from "next/dynamic";
import { useIoT } from "@/contexts/iotContext";

// Dynamically import the IoTMap component (client-side only) to avoid re-init from Maplibre error.
const IoTMap = dynamic(() => import('./components/IoTMap/ioTMap'), { ssr: false });

// Path /home that display the map component with all devices
export default function Home() {
	// State for checking if IoT data is loading
	const { isLoading } = useIoT();

	// Reference to the loading component
	const loadingRef = useRef<any>(null);

	useEffect(() => {
		// Set the document title when the component mounts
		document.title = "Home";
	}, []);

	return (
		<div className="home-root">
			{/* Display loading spinner when IoT data is loading */}
			<Loading show={isLoading} ref={loadingRef} />

			{/* Render IoT map component */}
			<IoTMap />
		</div>
	);
}