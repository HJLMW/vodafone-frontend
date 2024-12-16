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

export const iot_mock: IoT[] = [
	{
		id: "1",
		title: "Dispositivo IoT - Estación Meteorológica",
		description: "Estación meteorológica inteligente para medir la temperatura, humedad y calidad del aire.",
		coordinates: {
			lat: 37.9850,
			lng: -1.1285
		},
		mobileNumber: +34605530649,
		lastConnection: new Date().getTime(),
		iotCode: "MET-001"
	},
	{
		id: "2",
		title: "Dispositivo IoT - Medidor de Consumo Energético",
		description: "Medidor inteligente de consumo energético, utilizado para optimizar el uso de la energía en zonas urbanas.",
		coordinates: {
			lat: 37.9815,
			lng: -1.1260
		},
		mobileNumber: +34605530649,
		lastConnection: new Date().getTime(),
		iotCode: "ENR-002"
	},
	{
		id: "3",
		title: "Dispositivo IoT - Cámara de Seguridad Exterior",
		description: "Cámara inteligente para la vigilancia de espacios exteriores, con detección de movimiento y visión nocturna.",
		coordinates: {
			lat: 37.9860,
			lng: -1.1290
		},
		mobileNumber: +34605530650,
		lastConnection: new Date().getTime(),
		iotCode: "SEC-003"
	},
	{
		id: "4",
		title: "Dispositivo IoT - Controlador de Riego Automático",
		description: "Sistema inteligente para el control del riego en jardines y huertos urbanos.",
		coordinates: {
			lat: 37.9825,
			lng: -1.1270
		},
		mobileNumber: +34605530651,
		lastConnection: new Date().getTime(),
		iotCode: "IRR-004"
	},
	{
		id: "5",
		title: "Dispositivo IoT - Sensor de Calidad del Aire",
		description: "Sensor que mide la calidad del aire y la concentración de contaminantes en zonas urbanas.",
		coordinates: {
			lat: 37.9840,
			lng: -1.1300
		},
		mobileNumber: +34605530652,
		lastConnection: new Date().getTime(),
		iotCode: "AIR-005"
	},
	{
		id: "6",
		title: "Dispositivo IoT - Termostato Inteligente",
		description: "Termostato inteligente para optimizar el consumo de energía en hogares y oficinas.",
		coordinates: {
			lat: 37.9800,
			lng: -1.1245
		},
		mobileNumber: +34605530653,
		lastConnection: new Date().getTime(),
		iotCode: "THR-006"
	},
	{
		id: "7",
		title: "Dispositivo IoT - Sensor de Movimiento",
		description: "Sensor de movimiento para automatizar encendido de luces y sistemas de seguridad.",
		coordinates: {
			lat: 37.9795,
			lng: -1.1225
		},
		mobileNumber: +34605530654,
		lastConnection: new Date().getTime(),
		iotCode: "MOV-007"
	},
	{
		id: "8",
		title: "Dispositivo IoT - Medidor de Temperatura y Humedad",
		description: "Sensor que mide la temperatura y humedad ambiental en interiores y exteriores.",
		coordinates: {
			lat: 37.9870,
			lng: -1.1320
		},
		mobileNumber: +34605530655,
		lastConnection: new Date().getTime(),
		iotCode: "THM-008"
	},
	{
		id: "9",
		title: "Dispositivo IoT - Control de Acceso Inteligente",
		description: "Sistema inteligente de control de acceso mediante reconocimiento facial y huella dactilar.",
		coordinates: {
			lat: 37.9880,
			lng: -1.1340
		},
		mobileNumber: +34605530656,
		lastConnection: new Date().getTime(),
		iotCode: "ACC-009"
	},
	{
		id: "10",
		title: "Dispositivo IoT - Sensor de Nivel de Agua",
		description: "Sensor para detectar el nivel de agua en reservorios y sistemas de recolección de lluvia.",
		coordinates: {
			lat: 37.9810,
			lng: -1.1210
		},
		mobileNumber: +34605530657,
		lastConnection: new Date().getTime(),
		iotCode: "WAT-010"
	}
];