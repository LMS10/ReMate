import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isProtectedPage = pathname.startsWith('/workspace') || pathname.startsWith('/mypage');

  if (isProtectedPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/workspace', req.url));
  }

  const settingsMatch = pathname.match(/^\/workspace\/(\d+)\/settings/);
  if (settingsMatch && token?.accessToken) {
    const workspaceId = settingsMatch[1];
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspaces/${workspaceId}`,
        {
          headers: { Authorization: `Bearer ${token.accessToken}` },
        },
      );
      if (res.ok) {
        const data = await res.json();
        if (data?.data?.role === 'MEMBER') {
          return NextResponse.redirect(new URL(`/workspace/${workspaceId}`, req.url));
        }
      } else {
        return NextResponse.redirect(new URL('/workspace', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/workspace', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
