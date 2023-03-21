import { SessionData } from "express-session";

export interface OAuthObject {
    client_id: string;
    client_secret: string;
  }

export interface MySession extends SessionData {
  authenticated?: boolean;
  userId?: string;
}