import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import VacationModel from "../4-models/vacation-model";
import adminServices from "../5-services/admin-services";


const router = express.Router();



// Get One Vacation for Admin Route // GET http://localhost:4000/api/admin/vacations/:vacationId
router.get("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
   try {
      const vacationId = +request.params.vacationId;
      // Get all vacations:
      const vacation = await adminServices.getOneVacation(vacationId);
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


export default router;