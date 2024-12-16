import { IoT } from '@/types/iot';
import { createIoTDevice, deleteIoTDevice, getAllIoTDevices, updateIoTDevice } from '@/utils/api';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface IoTContextProps {
	iots: IoT[],
	isLoading: boolean,
	addIoT: (iot: IoT) => Promise<void>,
	updateIoT: (id: string, updatedIoT: Partial<IoT>) => Promise<void>,
	deleteIoT: (id: string) => void
}

const IoTContext = createContext<IoTContextProps | undefined>(undefined);

export const IoTProvider = ({ children }: { children: ReactNode }) => {
	const [iots, setIots] = useState<IoT[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {

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

	const addIoT = async (iot: IoT): Promise<void> => {
		try {
			const createdIoT = await createIoTDevice(iot);
			setIots((prev) => [createdIoT, ...prev]);

			return Promise.resolve();
		} catch (error) {
			console.error('Error trying to add IoT to NestJS:', error);
			return Promise.reject();
		}
	};

	const updateIoT = async (id: string, updatedIoT: Partial<IoT>): Promise<void> => {
		try {
			const updated = await updateIoTDevice(id, updatedIoT as IoT);
			setIots((prev) =>
				prev.map((iot) => (iot.id === id ? { ...iot, ...updated } : iot))
			);

			return Promise.resolve();
		} catch (error) {
			console.error('Error trying to update IoT to NestJS:', error);
			return Promise.reject();
		}
	};

	const deleteIoT = async (id: string) => {
		try {
			await deleteIoTDevice(id);
			setIots((prev) => prev.filter((iot) => iot.id !== id));
		} catch (error) {
			console.error('Error trying to delete IoT to NestJS:', error);
		}
	};

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

export const useIoT = () => {
	const context = useContext(IoTContext);

	if (!context) {
		throw new Error('useIoT must to be used within a IoTProvider');
	}
	
	return context;
};
