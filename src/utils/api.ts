import { APOLLO_GRAPHQL_URL } from "@/lib/config";
import { IoT } from "@/types/iot";

// Function to create a new IoT device
export const createIoTDevice = async (input: IoT): Promise<IoT> => {
	// Sending a POST request to create a new IoT device
	const response = await fetch(`${APOLLO_GRAPHQL_URL}/iot`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	});

	// Handle unsuccessful responses by throwing an error
	if (!response.ok) {
		throw new Error("Error al crear el dispositivo");
	}

	// Parse and return the response data if the request was successful
	const data = await response.json();
	return data;
};

// Function to fetch all IoT devices
export const getAllIoTDevices = async (): Promise<IoT[]> => {
	// Sending a GET request to retrieve all IoT devices
	const response = await fetch(`${APOLLO_GRAPHQL_URL}/iot`);

	// Handle unsuccessful responses by throwing an error
	if (!response.ok) {
		throw new Error("Error al obtener los dispositivos");
	}

	// Parse and return the response data (list of IoT devices)
	const data = await response.json();
	return data;
};

// Function to update an existing IoT device
export const updateIoTDevice = async (id: string, input: IoT): Promise<IoT> => {
	// Sending a PUT request to update an IoT device with the given ID
	const response = await fetch(`${APOLLO_GRAPHQL_URL}/iot/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	});

	// Handle unsuccessful responses by throwing an error
	if (!response.ok) {
		throw new Error("Error al actualizar el dispositivo");
	}

	// Parse and return the updated device data if the request was successful
	const data = await response.json();
	return data;
};

// Function to delete an IoT device
export const deleteIoTDevice = async (id: string): Promise<boolean> => {
	// Sending a DELETE request to remove the IoT device with the given ID
	const response = await fetch(`${APOLLO_GRAPHQL_URL}/iot/${id}`, {
		method: "DELETE",
	});

	// Handle unsuccessful responses by throwing an error
	if (!response.ok) {
		throw new Error("Error al eliminar el dispositivo");
	}

	// Parse and return the response data indicating successful deletion
	const data = await response.json();
	return data;
};
