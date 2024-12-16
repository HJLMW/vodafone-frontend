"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

// Interface defining the structure of the context and available methods
interface UserContextProps {
	userSession: string | null;  // The current user session (email in this case)
	setUserSession: (email: string) => void;  // Method to set the user session
	deleteUserSession: () => void;  // Method to delete the user session
}

// Create the UserContext to share session state across components
const UserContext = createContext<UserContextProps | undefined>(undefined);

// The provider component to manage the user session state
export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// State to hold user session
	const [userSession, setUserState] = useState<string | null>(null); 
	
	// Router to navigate programmatically
	const router = useRouter(); 

	// Effect to load the user session from cookies on component mount
	useEffect(() => {
		const userCookie = getCookie('@vodafone-user-session');

		// If the user session cookie exists, set it in the state
		if (userCookie) {
			setUserState(userCookie as string);
		} else {
			// If no cookie, clear the session state
			setUserState(null);
		}
	}, []);

	// Method to set the user session by storing the email in a cookie
	const setUserSession = (email: string) => {
		setCookie('@vodafone-user-session', email, {
			secure: process.env.NODE_ENV === 'production',// Ensure the cookie is secure in production
			path: "/",  // Cookie is available throughout the site
			sameSite: "strict",  // Restrict the cookie to same-site requests
		});
		
		// Set the email in the session state
		setUserState(email);
	};

	// Method to delete the user session (cookie and state)
	const deleteUserSession = () => {
		deleteCookie('@vodafone-user-session');
		
		// Clear the session state
		setUserState(null);

		// Redirect to the login page after session deletion
		router.replace('/login');
	};

	// Provide the user session data and methods to the context
	return (
		<UserContext.Provider value={{ userSession, setUserSession, deleteUserSession }}>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook to access the user session context in components
export const useUserSession = () => {
	const context = useContext(UserContext);

	// Ensure the hook is used inside the UserSessionProvider
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}

	return context;
};