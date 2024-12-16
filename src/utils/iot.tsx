import { IoT, LatLng } from "@/types/iot";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

export function getEmptyIoT(): IoT {
	return {
		id: crypto.randomUUID(),
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

export const validateCoordinates = (latLng: LatLng): boolean => {
	const { lat, lng } = latLng;

	const isLatValid = lat >= -90 && lat <= 90;
	const isLngValid = lng >= -180 && lng <= 180;

	return !(isNaN(lat) || isNaN(lng)) && (isLatValid && isLngValid);
};

export const validateEmptyFields = (iot: IoT): boolean => {
	if (
		!iot.iotCode.trim() ||
		!iot.title.trim() ||
		!iot.title.trim() ||
		iot.mobileNumber <= 0 ||
		!iot.description.trim() ||
		(iot.coordinates.lat === 0 || iot.coordinates.lng === 0) ||
		iot.lastConnection <= 0
	) return false;

	return true;
};



interface ColumnsProps {
	onAddNew: () => void,
	onEdit: (e: React.MouseEvent<HTMLButtonElement>, iot: IoT) => void,
	onDelete: (e: React.MouseEvent<HTMLButtonElement>, it: string) => void,
}

export const getColumns = ({ onAddNew, onEdit, onDelete }: ColumnsProps) => {
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Coordinates',
			dataIndex: 'coordinates',
			key: 'coordinates',
			render: (coordinates: LatLng) => `${coordinates.lat}, ${coordinates.lng}`,
		},
		{
			title: 'Mobile Number',
			dataIndex: 'mobileNumber',
			key: 'mobileNumber',
		},
		{
			title: 'Last Connection',
			dataIndex: 'lastConnection',
			key: 'lastConnection',
			render: (timestamp: number) => {
				const date = new Date(timestamp * 1000);
				return date.toLocaleDateString() + " " + date.toLocaleTimeString();
			},
		},
		{
			title: 'IoT Code',
			dataIndex: 'iotCode',
			key: 'iotCode',
		},
		{
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