import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";



async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        // Verify token - crash if not valid:
        await cyber.verifyToken(request);
        // If valid - continue:
        next();
    }
    catch (err: any) {
        next(err);
    }
}


export default verifyLoggedIn;
