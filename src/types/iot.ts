export interface IoT {
	id: string,
	iotCode: string,
	title: string,
	description: string,
	coordinates: LatLng,
	lastConnection: number,
	mobileNumber: number,
}

export interface LatLng {
	lat: number,
	lng: number
}