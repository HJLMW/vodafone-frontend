"use client";

import { useEffect, useRef } from "react";
import "./home-styles.css";
import Loading from "@/app/components/Loading/loading";
import dynamic from "next/dynamic";
import { useIoT } from "@/contexts/iotContext";
const IoTMap = dynamic(() => import('./components/IoTMap/ioTMap'), { ssr: false });

export default function Home() {
	const { isLoading } = useIoT();	
	const loadingRef = useRef<any>(null);

	useEffect(() => {
		document.title = "Home";
	});

	return (
		<div className="home-root">
			<Loading show={isLoading} ref={loadingRef} />
			<IoTMap />
		</div>
	)
}