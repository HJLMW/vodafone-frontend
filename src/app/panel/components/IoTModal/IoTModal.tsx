import React, { useState } from 'react';
import { Modal, Input, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { IoT } from '@/types/iot';
import { useIoT } from '@/contexts/iotContext';
import './ioTModal-styles.css';
import { getEmptyIoT, validateCoordinates, validateEmptyFields } from '@/utils/iot';
import { LoadingOutlined } from '@ant-design/icons';

interface IoTModalProps {
	iot: IoT | null,
	show: boolean,
	onClose: () => void,
	isNew: boolean,
	onSaveNewIoT: (iot: IoT) => Promise<void>,
}

const IoTModal = ({ iot, show, onClose, isNew, onSaveNewIoT }: IoTModalProps) => {

	if(!iot && !isNew) return null;
	
	const [formData, setformData] = useState<IoT>((isNew || !iot) ? getEmptyIoT() : iot);
	const { updateIoT } = useIoT();
	const [showError, setShowError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		let { name, value } : {name: string, value: any} = e.target;
		if(name === "mobileNumber") value = parseInt(value);

		setformData({ ...formData, [name]: value });
	};

	const handleCoordinatesChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setformData({
			...formData,
			coordinates: { ...formData.coordinates, [name]: parseFloat(value) },
		});
	};

	const handleDateChange = (date: dayjs.Dayjs | null) => {
		if (date) {
			setformData({ ...formData, lastConnection: parseInt(date.toDate().getTime().toString()) });
		}
	};

	const handleSave = () => {
		setIsLoading(true);

		if (!validateCoordinates(formData.coordinates)) {
			setIsLoading(false);
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
			alert('Please enter valid latitude and longitude values. between 90 -90');
			return;
		}

		if (!validateEmptyFields(formData)) {
			setShowError(true);
			setIsLoading(false);
			setTimeout(() => setShowError(false), 3000);
			return;
		}

		if (isNew) {
			onSaveNewIoT({ ...formData })
				.then(result => setIsLoading(false))
				.catch(errpr => setIsLoading(false));
		} else {
			updateIoT(formData.id, { ...formData })
				.then(result => setIsLoading(false))
				.catch(errpr => setIsLoading(false));
		}

		onClose();
	};

	return (
		<Modal
			title={isNew ? '' : formData.title}
			open={show}
			onCancel={onClose}
			footer={
				<div className="modal-iot-footer">
					<button className="modal-iot-cancel-button" key="cancel" onClick={onClose}>
						Cancel
					</button>
					<button disabled={isLoading} className="modal-iot-save-button" key="save" onClick={handleSave}>
						{isLoading && <LoadingOutlined
						/>}
						Save
					</button>
				</div>
			}
		>
			<form className="modal-iot-form">
				<div className="modal-form-item">
					<label htmlFor="title">Title</label>
					<Input
						status={showError && formData.title === "" ? "error" : undefined}
						id="title"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="modal-form-item">
					<label htmlFor="description">Description</label>
					<Input.TextArea
						status={showError && formData.description === "" ? "error" : undefined}
						id="description"
						name="description"
						value={formData.description}
						onChange={handleInputChange}
						rows={3}
						required
					/>
				</div>

				<div className="modal-form-item">
					<div className="modal-form-item-horizontal">
						<div className="modal-form-item">
							<label htmlFor="latitude">Latitude</label>
							<Input
								status={showError && formData.coordinates.lat === 0 ? "error" : undefined}
								id="latitude"
								name="lat"
								type="number"
								value={formData.coordinates.lat || ''}
								onChange={handleCoordinatesChange}
								placeholder="e.g., 40.7128"
								required
							/>
						</div>

						<div className="modal-form-item">
							<label htmlFor="longitude">Longitude</label>
							<Input
								status={showError && formData.coordinates.lng === 0 ? "error" : undefined}
								id="longitude"
								name="lng"
								type="number"
								value={formData.coordinates.lng || ''}
								onChange={handleCoordinatesChange}
								placeholder="e.g., -74.0060"
								required
							/>
						</div>
					</div>
				</div>

				<div className="modal-form-item">
					<label htmlFor="mobileNumber">Mobile Number</label>
					<Input
						status={showError && formData.mobileNumber === 0 ? "error" : undefined}
						id="mobileNumber"
						name="mobileNumber"
						type="number"
						value={formData.mobileNumber || ''}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="modal-form-item">
					<label htmlFor="iotCode">IoT Code</label>
					<Input
						status={showError && formData.iotCode === "" ? "error" : undefined}
						id="iotCode"
						name="iotCode"
						value={formData.iotCode}
						onChange={handleInputChange}
						required
					/>
				</div>

				{!isNew && <div className="modal-form-item">
					<label htmlFor="lastConnection">Last Connection</label>
					<DatePicker
						id="lastConnection"
						value={dayjs(formData.lastConnection)}
						onChange={(date) => handleDateChange(date)}
						showTime
						format="YYYY-MM-DD HH:mm:ss"
						required
					/>
				</div>}
			</form>
		</Modal>
	);
};

export default IoTModal;