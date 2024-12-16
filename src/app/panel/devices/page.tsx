"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
import { useIoT } from '@/contexts/iotContext';
import { IoT } from '@/types/iot';
import Loading from '@/app/components/Loading/loading';
import IoTModal from '../components/IoTModal/IoTModal';
import "./devices-styles.css";
import { getColumns } from '@/utils/iot';

export default function Devices() {
	const { iots, deleteIoT, addIoT, isLoading } = useIoT();
	const [iotSelected, setIoTSelected] = useState<IoT | null>(null);
	const [createNewIoT, setCreateNewIoT] = useState(false);
	
	const loadingRef = useRef<any>(null);

	useEffect(() => {
		document.title = "Devices";
	}, []);

	const handleCreateNewIoT = () => setCreateNewIoT(true);

	const handleAddIoT = (iot: IoT): Promise<void> => {
		return addIoT({ ...iot, id: crypto.randomUUID() });
	}

	const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, iot: IoT) => {
		setIoTSelected(iot);
	};

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
		e.stopPropagation();

		const result = confirm("Are you sure you want to delete this IoT device?");
		if (!result) return;

		deleteIoT(id);
	};

	const handleModalClose = () => {
		setIoTSelected(null);
		setCreateNewIoT(false);
	}

	const handleRowClick = (iot: IoT) => {
		setIoTSelected(iot);
	}

	const columns = getColumns({
		onAddNew: handleCreateNewIoT,
		onEdit: handleEdit,
		onDelete: handleDelete,
	});

	return (
		<div className="devices-root">
			<Loading show={isLoading} ref={loadingRef} />
			<IoTModal
				show={iotSelected !== null || createNewIoT}
				iot={iotSelected}
				onClose={handleModalClose}
				isNew={createNewIoT}
				onSaveNewIoT={handleAddIoT}
			/>
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