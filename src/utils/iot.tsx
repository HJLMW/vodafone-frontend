import { IoT, LatLng } from "@/types/iot";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

// Function to generate an empty IoT device with default values
export function getEmptyIoT(): IoT {
	return {
		id: crypto.randomUUID(), // A random ID although not neccesary, the backend generates a unique ID.
		iotCode: '',
		title: '',
		mobileNumber: 0,
		description: '',
		coordinates: {
			lat: 0,
			lng: 0
		},
		lastConnection: new Date().getTime()
	}
}

// Function to validate whether the given coordinates (latitude and longitude) are valid
export const validateCoordinates = (latLng: LatLng): boolean => {
	const { lat, lng } = latLng;

	// Latitude must be between -90 and 90, longitude between -180 and 180
	const isLatValid = lat >= -90 && lat <= 90;
	const isLngValid = lng >= -180 && lng <= 180;

	// Checks if the lat and lng are valid numbers and within the acceptable range
	return !(isNaN(lat) || isNaN(lng)) && (isLatValid && isLngValid);
};

// Function to validate that all required fields in the IoT device object are filled out correctly
export const validateEmptyFields = (iot: IoT): boolean => {
	// Checks for empty fields, invalid mobile number, and invalid coordinates
	if (
		!iot.iotCode.trim() ||
		!iot.title.trim() ||
		iot.mobileNumber <= 0 ||
		!iot.description.trim() ||
		(iot.coordinates.lat === 0 || iot.coordinates.lng === 0) ||
		iot.lastConnection <= 0
	) return false;

	return true;
};

// Interface defining the props for columns in the IoT table
interface ColumnsProps {
	onAddNew: () => void, // Handler for adding a new IoT device
	onEdit: (e: React.MouseEvent<HTMLButtonElement>, iot: IoT) => void, // Handler for editing an existing IoT device
	onDelete: (e: React.MouseEvent<HTMLButtonElement>, it: string) => void, // Handler for deleting an IoT device
}

// Function to return column configuration for the IoT device table
export const getColumns = ({ onAddNew, onEdit, onDelete }: ColumnsProps) => {
	const columns = [
		{
			// Column to display the IoT device ID
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			// Column to display the title of the IoT device
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			// Column to display the description of the IoT device
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			// Column to display coordinates in the format 'lat, lng'
			title: 'Coordinates',
			dataIndex: 'coordinates',
			key: 'coordinates',
			render: (coordinates: LatLng) => `${coordinates.lat}, ${coordinates.lng}`,
		},
		{
			// Column to display the mobile number associated with the IoT device
			title: 'Mobile Number',
			dataIndex: 'mobileNumber',
			key: 'mobileNumber',
		},
		{
			// Column to display the last connection timestamp as a formatted date and time
			title: 'Last Connection',
			dataIndex: 'lastConnection',
			key: 'lastConnection',
			render: (timestamp: number) => {
				// Converts the timestamp into a localized date and time format
				const date = new Date(parseInt(timestamp.toString()));
				return date.toLocaleDateString() + " " + date.toLocaleTimeString();
			},
		},
		{
			// Column to display the IoT code
			title: 'IoT Code',
			dataIndex: 'iotCode',
			key: 'iotCode',
		},
		{
			// Column to provide actions for editing or deleting IoT devices
			title: (
				<button
					className="devices-add-button"
					onClick={onAddNew}
				>
					<PlusOutlined />Add
				</button>
			),
			key: 'actions',
			render: (text: string, iot: IoT) => (
				<div style={{ display: 'flex', gap: '8px' }}>
					<button
						className="devices-edit-button"
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => onEdit(e, iot)}
					>
						<EditOutlined />
					</button>
					< button
						className="devices-delete-button"
						title="Are you sure you want to delete this IoT?"
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => onDelete(e, iot.id)}
					>
						<DeleteOutlined />
					</button>
				</div>
			),
		},
	];

	return columns;
}