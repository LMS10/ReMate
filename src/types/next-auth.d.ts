import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name: string;
      picture: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    accessToken: string;
    picture: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    userId: string;
  }
}
