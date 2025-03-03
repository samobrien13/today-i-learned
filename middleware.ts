import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: [
        {
            source: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const anonymousIdCookieName = "anonymous_id";

    const cookieAnonymousId = request.cookies.get(anonymousIdCookieName)?.value;

    let anonymousId: string;
    if (cookieAnonymousId) {
        anonymousId = cookieAnonymousId;
    } else {
        anonymousId = crypto.randomUUID();
        response.cookies.set(anonymousIdCookieName, anonymousId);
    }

    return response;
}
