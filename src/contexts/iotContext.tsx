"use client";

import { IoT } from '@/types/iot';
import { createIoTDevice, deleteIoTDevice, getAllIoTDevices, updateIoTDevice } from '@/utils/api';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Interface defining the context structure and available methods
interface IoTContextProps {
	iots: IoT[],  // List of IoT devices
	isLoading: boolean,  // Loading state for API calls
	addIoT: (iot: IoT) => Promise<void>,  // Method to add a new IoT device
	updateIoT: (id: string, updatedIoT: Partial<IoT>) => Promise<void>,  // Method to update an IoT device
	deleteIoT: (id: string) => void  // Method to delete an IoT device
}

/**
 * IMPORTANT !
 * The optimal solution would be to create a reducer and abstract the state management logic outside of the context,
 * but given the low complexity of the application and the use of the context to allow the flexible loading of IoTs
 * in any path within /panel without the need to add more code in the future, this solution has been chosen.
 */

// Creating the IoTContext to share state and methods across the app
const IoTContext = createContext<IoTContextProps | undefined>(undefined);

// Provider component to manage IoT data and expose functions to the rest of the app
export const IoTProvider = ({ children }: { children: ReactNode }) => {
	// State to store the list of IoT devices
	const [iots, setIots] = useState<IoT[]>([]);

	// Loading state for fetching IoT devices
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Fetch all IoT devices when the component is mounted
		getAllIoTDevices()
			.then(result => {
				setIots(result);
				setIsLoading(false);
			})
			.catch(error => {
				console.error("It was not possible to connect with NestJS server.");
				setIsLoading(false); 
			});
	}, []);

	// Method to add a new IoT device
	const addIoT = async (iot: IoT): Promise<void> => {
		try {
			// Call API to create the IoT device
			const createdIoT = await createIoTDevice(iot);
			
			// Add the new IoT to the state
			setIots((prev) => [createdIoT, ...prev]);
			return Promise.resolve();
		} catch (error) {
			console.error('Error trying to add IoT to NestJS:', error);
			return Promise.reject();
		}
	};

	// Method to update an existing IoT device
	const updateIoT = async (id: string, updatedIoT: Partial<IoT>): Promise<void> => {
		try {
			// Call API to update the IoT device
			const updated = await updateIoTDevice(id, updatedIoT as IoT);

			// Update the state with the updated IoT device
			setIots((prev) =>
				prev.map((iot) => (iot.id === id ? { ...iot, ...updated } : iot))
			);
			return Promise.resolve();
		} catch (error) {
			console.error('Error trying to update IoT to NestJS:', error);
			return Promise.reject();
		}
	};

	// Method to delete an IoT device
	const deleteIoT = async (id: string) => {
		try {
			// Call API to delete the IoT device
			await deleteIoTDevice(id);

			// Remove the IoT device from the state
			setIots((prev) => prev.filter((iot) => iot.id !== id));
		} catch (error) {
			console.error('Error trying to delete IoT to NestJS:', error);
		}
	};

	// Providing the context value to child components
	return (
		<IoTContext.Provider value={{
			iots,
			isLoading,
			addIoT,
			updateIoT,
			deleteIoT
		}}>
			{children}
		</IoTContext.Provider>
	);
};

// Custom hook to use IoTContext in any component
export const useIoT = () => {
	const context = useContext(IoTContext);

	// Ensure the hook is used within the IoTProvider
	if (!context) {
		throw new Error('useIoT must be used within a IoTProvider');
	}

	return context;
};