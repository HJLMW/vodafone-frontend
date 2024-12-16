"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

interface UserContextProps {
	userSession: string | null;
	setUserSession: (email: string) => void;
	deleteUserSession: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [userSession, setUserState] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const userCookie = getCookie('@vodafone-user-session');

		if (userCookie) {
			setUserState(userCookie as string);
		} else {
			setUserState(null);
		}
	}, []);

	const setUserSession = (email: string) => {
		setCookie('@vodafone-user-session', email,{
			secure: process.env.NODE_ENV === 'production',
			path: "/",
			sameSite: "strict",
		});
		setUserState(email);
	};

	const deleteUserSession = () => {
		deleteCookie('@vodafone-user-session');
		setUserState(null);

		router.replace('/login');
	};

	return (
		<UserContext.Provider value={{ userSession, setUserSession, deleteUserSession }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserSession = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}

	return context;
};