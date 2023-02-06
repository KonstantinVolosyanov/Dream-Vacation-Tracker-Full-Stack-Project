import express, { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/vacation-model";
import adminServices from "../5-services/admin-services";
import userServices from "../5-services/user-services";


const router = express.Router();


// // Get Vacations // GET http://localhost:4000/api/user/vacations
// router.get("/admin/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
//    try {
//       // Extract user from token:
//       const user = cyber.getUserFromToken(request)
//       // Get vacations data:
//       const vacations = await userServices.getAllVacations(user);
//       // Return json vacations data:
//       response.json(vacations);
//    }
//    catch (err: any) {
//       next(err);
//    }
// });


// Get One Vacation for Admin Route // GET http://localhost:4000/api/admin/vacations
router.get("/admin/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
   try {
      const id = +request.params.vacationId;
      // Get all vacations:
      const vacation = await adminServices.getOneVacation(id);
      // Return vacations json data
      response.json(vacation);
   }
   catch (err: any) {
      next(err);
   }
});




// Add Vacation Route // POST http://localhost:4000/api/admin/vacations
router.post("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
   try {
      // Take image file from request
      request.body.image = request.files?.image;
      // Create new vacation
      const vacation = new VacationModel(request.body);
      // Enter vacation data into database
      const addedVacations = await adminServices.addVacation(vacation);
      // return status and json data
      response.status(201).json(addedVacations);
   }
   catch (err: any) {
      next(err);
   }
});


// Update Vacation // PUT http://localhost:4000/api/admin/vacations/:vacationId
router.put("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
   try {
      // Take vacation id from params data 
      request.body.vacationId = +request.params.vacationId;
      //  // Take image file from request data
      request.body.image = request.files?.image;
      // Create new vacation from request
      const vacation = new VacationModel(request.body);
      // Update existing vacation 
      const updatedVacation = await adminServices.updateVacation(vacation);
      // return updated vacation json data
      response.json(updatedVacation);
   }
   catch (err: any) {
      next(err);
   }
});


// Delete Vacation // DELETE http://localhost:4000/api/admin/vacations/:vacationId
router.delete("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
   try {
      // Take vacation id from params data
      const vacationId = +request.params.vacationId;
      // delete vacation by id
      await adminServices.deleteVacation(vacationId);
      // return status
      response.sendStatus(204);
   }
   catch (err: any) {
      next(err);
   }
});

// // Get Image // GET http://localhost:4000/api/admin/vacations/images/:imageName
// router.get("/admin/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
//    try {
//       const imageName = request.params.imageName;
//       const absolutePath = imageHandler.getAbsolutePath(imageName);
//       response.sendFile(absolutePath)
//    }
//    catch (err: any) {
//       next(err);
//    }
// });

export default router;