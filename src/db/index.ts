import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";
import * as schema from "./schema";

const connectionString = env.DATABASE_URL + "?sslmode=require";

export const client = postgres(connectionString, {
    max: 1,
    idle_timeout: 5,
    connect_timeout: 5,
    prepare: false,
});

export const db = drizzle({
    client,
    schema,
});
