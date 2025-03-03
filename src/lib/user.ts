import { cookies } from "next/headers";

export async function getAnonymousId() {
    const cookieStore = await cookies();

    const cookie = cookieStore.get("anonymous_id");
    if (cookie) {
        return cookie.value;
    }

    const randomId = crypto.randomUUID();

    cookieStore.set("anonymous_id", randomId);

    return randomId;
}
