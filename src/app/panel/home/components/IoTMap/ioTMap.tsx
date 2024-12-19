import Map, { Marker } from 'react-map-gl/maplibre';
import { Popover } from 'antd';
import { useState } from 'react';
import "./ioTMap-styles.css";
import { useIoT } from '@/contexts/iotContext';
import { DEFAULT_MAP_POSITION, MAP_STYLE } from '@/lib/config';

// Map component showing all devices
export default function IoTMap() {
	// Get IoT devices data from the context
	const { iots } = useIoT();

	// State to track the currently selected device
	const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

	// Toggle selection of the device on marker click
	const handleMarkerClick = (id: string) => {
		if (selectedDevice === id) {
			// Deselect if the same marker is clicked
			setSelectedDevice(null);
		} else {
			// Select the new marker
			setSelectedDevice(id);
		}
	};

	// Customize the popup container's position
	const getPopupContainer = (triggerNode: HTMLElement): HTMLElement => {
		const parent = triggerNode.parentNode;
		if (parent instanceof HTMLElement) {
			return parent;
		}
		return triggerNode;
	};

	// Hide markers that are not selected to clean the interface
	const hideMarker = (id: string): boolean => selectedDevice !== null && selectedDevice !== id;

	return (
		<div className="iotmap-root">
			<Map
				initialViewState={{
					longitude: DEFAULT_MAP_POSITION.longitude,
					latitude: DEFAULT_MAP_POSITION.latitude,
					zoom: 15
				}}
				mapStyle={MAP_STYLE}
				style={{ width: 1100, height: 750, borderRadius: 8, overflow: 'hidden' }}
			>
				{/* Loop through the IoT devices and display each marker */}
				{iots.map(device => (
					<Marker
						style={{ display: hideMarker(device.id) ? "none" : "block" }}
						key={device.id}
						longitude={device.coordinates.lng}
						latitude={device.coordinates.lat}
						onClick={() => handleMarkerClick(device.id)}
					>
						{/* Popover to show device details when a marker is clicked */}
						<Popover
							content={
								<div className="iot-marker-content">
									<h4>{device.title}</h4>
									<p>{device.description}</p><br />
									<p><b>Last connection: </b>{new Date(parseInt(device.lastConnection.toString())).toLocaleString()}</p>
									<span className="iot-marker-close" onClick={() => setSelectedDevice(null)}>close</span>
								</div>
							}
							open={selectedDevice === device.id}
							placement="top"
							trigger="click"
							getPopupContainer={getPopupContainer}
						>
							<div className={selectedDevice === device.id ? "iot-marker marker-selected" : "iot-marker"}>
								{device.iotCode}
							</div>
						</Popover>
					</Marker>
				))}
			</Map>
		</div>
	);
}
