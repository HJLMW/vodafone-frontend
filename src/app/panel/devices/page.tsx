"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
import { useIoT } from '@/contexts/iotContext';
import { IoT } from '@/types/iot';
import Loading from '@/app/components/Loading/loading';
import IoTModal from '../components/IoTModal/IoTModal';
import "./devices-styles.css";
import { getColumns } from '@/utils/iot';

// Path /devices that display a table with all devices
export default function Devices() {
	// Get IoT devices data and actions from context
	const { iots, deleteIoT, addIoT, updateIoT, isLoading } = useIoT();

	// State for managing selected IoT device and modal state
	const [iotSelected, setIoTSelected] = useState<IoT | null>(null);
	const [createNewIoT, setCreateNewIoT] = useState(false);

	const loadingRef = useRef<any>(null);

	// Set page title on component mount
	useEffect(() => {
		document.title = "Devices";
	}, []);

	// Handle creating a new IoT device
	const handleCreateNewIoT = () => setCreateNewIoT(true);

	// Add new IoT device to the context and also the DB
	const handleAddIoT = (iot: IoT): Promise<void> => {
		return addIoT({ ...iot });
	}

	const handleUpdateIoT = (iot: IoT): Promise<void> => {
		return updateIoT(iot.id, { ...iot });
	}

	// Set the selected IoT device for editing
	const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, iot: IoT) => {
		setIoTSelected(iot);
	};

	// Handle deleting an IoT device after confirmation
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
		e.stopPropagation();

		const result = confirm("Are you sure you want to delete this IoT device?");
		if (!result) return;

		deleteIoT(id);
	};

	// Close the modal and reset states
	const handleModalClose = () => {
		setIoTSelected(null);
		setCreateNewIoT(false);
	}

	// Handle row click to select a device
	const handleRowClick = (iot: IoT) => {
		setIoTSelected(iot);
	}

	// Define table columns with actions for add, edit, and delete
	const columns = getColumns({
		onAddNew: handleCreateNewIoT,
		onEdit: handleEdit,
		onDelete: handleDelete,
	});

	return (
		<div className="devices-root">
			<Loading show={isLoading} ref={loadingRef} />

			{/* IoT Modal for creating/editing devices */}
			<IoTModal
				show={iotSelected !== null || createNewIoT}
				iot={iotSelected}
				onClose={handleModalClose}
				isNew={createNewIoT}
				onSaveNewIoT={handleAddIoT}
				onUpdateIoT={handleUpdateIoT}
				
			/>

			{/* Table to display the IoT devices */}
			<Table
				className="devices-table"
				columns={columns}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
				dataSource={iots}
				rowKey="id"
				pagination={false}
				scroll={{ y: 750 }}
			/>
		</div>
	);
}