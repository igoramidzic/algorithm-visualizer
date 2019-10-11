import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const MONGODB_URI = process.env["MONGODB_URI"];
export const SECRET = process.env["SECRET"];

if (!MONGODB_URI) {
    process.exit(1);
}