import { DB_PATH } from "./src/config/constants";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./src/config/database/migrations",
  schema: "./src/config/database/schema.ts",
  dbCredentials: {
    url: DB_PATH,
  },
});
