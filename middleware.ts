export { default } from 'next-auth/middleware'

export const config = {
  matcher: ["/issues/new",
            "/issues/:id/edit",
]
};

/**import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

export default withAuth({
  // pages to protect
  pages: {
    signIn: '/api/auth/signin',
  },
});

// middleware config
export const config = {
  matcher: [
    "/issues/new",
    "/issues/:id/edit",
  ],
};**/

