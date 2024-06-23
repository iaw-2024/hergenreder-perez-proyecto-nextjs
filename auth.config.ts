import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      
      if (isOnAdmin && !isLoggedIn) {
        // Not authorized for admin and not logged in
        return false; 
      }
      
      return true; // Authorized for all other paths or already logged in
    },
    redirect({ url, baseUrl }) {
      // After successful sign in, redirect to the admin page if previously trying to access it
      if (url.startsWith(baseUrl + '/login')) {
        return '/admin';
      }
      return baseUrl; // Default redirect to homepage
    },
  },
  providers: [], // Add providers with an empty array for now
};