import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { DB_PATH } from "../constants";

const client = createClient({ url: DB_PATH! });
export const db = drizzle({ client });
