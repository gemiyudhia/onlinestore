import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const authPage = ["/login", "/register"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = ["/profile"]
) {
  return async (req: NextRequest, res: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (authPage.includes(pathname)) {
      if (token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    if (requireAuth.includes(pathname)) {
      if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURIComponent(req.url));

        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
    return middleware(req, res);
  };
}
