import { APOLLO_GRAPHQL_URL } from "@/lib/config";
import { IoT } from "@/types/iot";

export const createIoTDevice = async (input: IoT): Promise<IoT> => {
	const response = await fetch(`${APOLLO_GRAPHQL_URL}/iot`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	});

	if (!response.ok) {
		throw new Error("Error al crear el dispositivo");
	}

	const data = await response.json();
	return data;
};

export const getAllIoTDevices = async (): Promise<IoT[]> => {
	const response = await fetch(`${APOLLO_GRAPHQL_URL}/iot`);

	if (!response.ok) {
		throw new Error("Error al obtener los dispositivos");
	}

	const data = await response.json();
	return data;
};

export const updateIoTDevice = async (id: string, input: IoT): Promise<IoT> => {
	const response = await fetch(`${APOLLO_GRAPHQL_URL}/iot/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	});

	if (!response.ok) {
		throw new Error("Error al actualizar el dispositivo");
	}

	const data = await response.json();
	return data;
};

export const deleteIoTDevice = async (id: string): Promise<boolean> => {
	const response = await fetch(`${APOLLO_GRAPHQL_URL}/iot/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Error al eliminar el dispositivo");
	}

	const data = await response.json();
	return data;
};