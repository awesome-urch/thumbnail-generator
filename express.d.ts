// express.d.ts
import OAuth2Server from 'oauth2-server';
import { Request, Response } from 'express';

declare module 'express' {
  export interface Application {
    oauth?: OAuth2Server;
  }
}
