import React, { useState } from 'react';
import { Modal, Input, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { IoT } from '@/types/iot';
import './ioTModal-styles.css';
import { getEmptyIoT, validateCoordinates, validateEmptyFields } from '@/utils/iot';
import { LoadingOutlined } from '@ant-design/icons';

interface IoTModalProps {
	iot: IoT | null, // The IoT device object being edited or null for new IoT
	show: boolean, // Control visibility of the modal
	onClose: () => void, // Function to close the modal
	isNew: boolean, // Flag to distinguish between adding new or updating an existing IoT
	onSaveNewIoT: (iot: IoT) => Promise<void>, // Function to handle saving new IoT
	onUpdateIoT: (iot: IoT) => Promise<void>, // Function to handle updating existing IoT
}

// Modal dialog component used for adding or editing IoT device information.
const IoTModal = ({ iot, show, onClose, isNew, onSaveNewIoT, onUpdateIoT }: IoTModalProps) => {

	// If no IoT data and it's not a new IoT, return null to prevent rendering
	if (!iot && !isNew) return null;

	// State for handling form data
	const [formData, setformData] = useState<IoT>((isNew || !iot) ? getEmptyIoT() : iot);
	const [showError, setShowError] = useState(false); // Flag to show error messages
	const [isLoading, setIsLoading] = useState(false); // Flag for loading state

	// Handle input change for text fields
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		let { name, value }: { name: string, value: any } = e.target;
		if (name === "mobileNumber") value = parseInt(value); // Ensure mobile number is an integer

		setformData({ ...formData, [name]: value }); // Update form data state
	};

	// Handle changes in latitude/longitude fields
	const handleCoordinatesChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setformData({
			...formData,
			coordinates: { ...formData.coordinates, [name]: parseFloat(value) },
		});
	};

	// Handle date change for the last connection timestamp
	const handleDateChange = (date: dayjs.Dayjs | null) => {
		if (date) {
			setformData({ ...formData, lastConnection: parseInt(date.toDate().getTime().toString()) });
		}
	};

	// Function to handle saving the IoT device (new or update)
	const handleSave = () => {
		setIsLoading(true);

		// Validation for coordinates
		if (!validateCoordinates(formData.coordinates)) {
			setIsLoading(false);
			setShowError(true);
			setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
			alert('Please enter valid latitude and longitude values. between 90 -90');
			return;
		}

		// Validation for empty fields
		if (!validateEmptyFields(formData)) {
			setShowError(true);
			setIsLoading(false);
			setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
			return;
		}

		// Saving the new IoT or updating the existing one
		if (isNew) {
			onSaveNewIoT({ ...formData })
				.then(result => setIsLoading(false))
				.finally(() => onClose()) // Close modal after save
				.catch(error => setIsLoading(false));
		} else {
			onUpdateIoT({ ...formData })
				.then(result => setIsLoading(false))
				.finally(() => onClose()) // Close modal after update
				.catch(error => setIsLoading(false));
		}
	};

	return (
		<Modal
			title={isNew ? '' : formData.title} // Display title if not new
			open={show} // Show modal based on the show prop
			onCancel={onClose} // Close modal when cancel button is clicked
			footer={
				// Modal footer containing save and cancel buttons
				<div className="modal-iot-footer">
					<button className="modal-iot-cancel-button" key="cancel" onClick={onClose}>
						Cancel
					</button>
					<button disabled={isLoading} className="modal-iot-save-button" key="save" onClick={handleSave}>
						{isLoading && <LoadingOutlined />} {/* Show loading spinner while saving */}
						Save
					</button>
				</div>
			}
		>
			<form className="modal-iot-form">
				{/* Title field */}
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

				{/* Description field */}
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

				{/* Coordinates fields (latitude and longitude) */}
				<div className="modal-form-item">
					<div className="modal-form-item-horizontal">
						<div className="modal-form-item">
							<label htmlFor="latitude">Latitude</label>
							<Input
								status={showError && formData.coordinates.lat === 0 ? "error" : undefined}
								id="latitude"
								name="lat"
								type="number"
								value={formData.coordinates.lat || ''}
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
								value={formData.coordinates.lng || ''}
								onChange={handleCoordinatesChange}
								placeholder="e.g., -74.0060"
								required
							/>
						</div>
					</div>
				</div>

				{/* Mobile number field */}
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

				{/* IoT Code field */}
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

				{/* Last Connection field (only for editing existing IoT) */}
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