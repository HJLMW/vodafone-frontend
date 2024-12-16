# IoT Device Management - Vodafone Technical Test

This project is a frontend application built with **Next.js** as part of a technical test for **Vodafone**. The goal of this app is to demonstrate the basic functionalities of an IoT device management platform, with a mock session management system, a dynamic device list, and a map showing device locations.

The app is hosted using Vercel at:

https://vodafone-frontend.vercel.app/

## Overview

The app consists of the following key features:

- **Session Management**: A small mock session system that allows users to "log in" and receive feedback as if they were interacting with a real login system.
- **Device Management**: Users can view, add, edit, and delete IoT devices using a table interface.
- **Map Integration**: The app uses a map to display IoT devices' locations. This is achieved through the **'react-map-gl/maplibre' library**.

## Features

- **Device List**: A table listing all IoT devices with columns for device details such as `Title`, `Description`, `Coordinates`, `Mobile Number`, and `Last Connection`.
- **Session Simulation**: A basic, mock session management system. Users can simulate logging in to the platform. Note: This is purely for feedback purposes and does not connect to a real authentication system.
- **Map Display**: Displays a map with IoT device coordinates. The map is powered by **react-map-gl and Maplibre** library.

## Technologies Used

  - **Next.js**: Framework for server-side rendering and static site generation.
  - **Apollo Client**: For interacting with a GraphQL API and managing the state of IoT devices.
  - **Ant Design**: Provides UI components like tables, buttons, and popovers for building an elegant interface.
  - **React Map GL**: Used to display IoT devices' locations on an interactive map.
  - **TypeScript**: Ensures type safety throughout the application.

## Key Features in Detail

### Mock Session Management

The app features a basic login screen where users can enter credentials to simulate logging into the system. While this feature does not integrate with a backend authentication system, it provides visual feedback to the user, mimicking the process of a real authentication flow. That's a bonus, but It was not mandatory to develop.

### Device Management Table

The **Device Management** page contains a table where users can manage IoT devices. Each device has the following attributes:
- **ID**
- **Title**
- **Description**
- **Coordinates (Latitude, Longitude)**
- **Mobile Number**
- **Last Connection Timestamp**
- **IoT Code**

Users can **add**, **edit**, and **delete** devices using intuitive buttons in the table's action column. The list is fetched dynamically and displays data based on the current state in the Apollo Client cache.

### Map Integration

The app includes a **Maplibre** map that shows IoT device locations based on their coordinates. As devices are added or modified, their locations are reflected on the map in real-time. The map is fully interactive, allowing users to zoom in and out or drag the view to explore different areas.

### Dynamic Data Fetching

One of the key features of the app is the global state management and the dynamic fetching of IoT device data. The device data is automatically fetched and managed through a **React Context**. Upon initialization, a `useEffect` hook is triggered, which fetches the device data and updates the state accordingly. This setup ensures that any changes to the data are instantly reflected across the application, providing a seamless user experience.

The use of state management frameworks like Redux was avoided due to the simplicity of the problem and the minimal state management required. Additionally, as an optimization for state management, it would have been more appropriate to create a reducer and abstract the state logic outside of the context. However, since the problem is so simple, this could have made the code more complex and harder for this problem. 

Furthermore, given that two routes require access to the devices (IoTs), the decision was made to create a context and call the API to fetch the devices when the context is initialized. This approach abstracts the logic of fetching devices within the components of those routes, simplifying the overall architecture.
