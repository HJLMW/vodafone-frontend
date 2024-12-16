import { NextRequest, NextResponse } from 'next/server';

// Middleware function that handles redirections based on user session
export function middleware(request: NextRequest) {
	// Retrieve user session from cookies
	const userCookie = request.cookies.get('@vodafone-user-session');
	
	// Extract the pathname from the URL
	const pathname = new URL(request.url).pathname;
	const url = request.url;

	// If no user session exists and trying to access '/panel' or its subpaths, redirect to the home page
	if (!userCookie && (url.includes("/panel") || url.includes("/panel/"))) {
		return NextResponse.redirect(new URL("/", url));
	}

	// If a user session exists and trying to access '/login' or the home page, redirect to the panel
	if (userCookie && (url.includes("/login") || pathname === "/")) {
		return NextResponse.redirect(new URL("/panel", url));
	}

	// If neither of the above conditions match, proceed with the request
	return NextResponse.next();
}

// Configuring which paths this middleware applies to
export const config = {
	matcher: ['/panel', '/panel/:path*', '/login', '/'],
};