import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const userCookie = request.cookies.get('@vodafone-user-session');
	const pathname = new URL(request.url).pathname;
	const url = request.url;
	
	if (!userCookie && (url.includes("/panel") || url.includes("/panel/"))) {
		return NextResponse.redirect(new URL("/", url));
	}

	if (userCookie && (url.includes("/login") || pathname === "/")) {
		return NextResponse.redirect(new URL("/panel", url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/panel', '/panel/:path*', '/login', '/'],
};