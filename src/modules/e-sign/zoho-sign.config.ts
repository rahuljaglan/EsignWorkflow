import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
export const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
export const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
