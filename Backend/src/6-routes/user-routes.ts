import express, { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import userServices from "../5-services/user-services";


const router = express.Router();


// Get Vacations // GET http://localhost:4000/api/user/vacations
router.get("/user/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Extract user from token:
        const user = cyber.getUserFromToken(request)
        // Get vacations data:
        const vacations = await userServices.getAllVacations(user);
        // Return json vacations data:
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});



// Follow // POST http://localhost:4000/api/user/follow/:vacationId
router.post("/user/follow/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Extract user from token:
        const user = cyber.getUserFromToken(request)
        // Get Vacation Id from request params
        const vacationId = +request.params.vacationId
        // Follow vacation
        await userServices.follow(user.userId, vacationId)
        // Return status
        response.sendStatus(201);

    }
    catch (err: any) {
        next(err);
    }
});


//Unfollow // DELETE http://localhost:4000/api/user/unfollow/:vacationId
router.delete("/user/unfollow/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Extract user from token:
        const user = cyber.getUserFromToken(request)
        // Get Vacation Id from request params
        const vacationId = +request.params.vacationId
        // Unfollow vacation
        await userServices.unfollow(user.userId, vacationId)
        // Return status
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});


// Get Image // GET http://localhost:4000/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName);
        response.sendFile(absolutePath)
    }
    catch (err: any) {
        next(err);
    }
});


export default router;



