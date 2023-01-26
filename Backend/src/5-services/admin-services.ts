import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";



// Get All Vacations For Admin
async function getAllVacationsForAdmin(): Promise<VacationModel[]> {
    // Create sql query:
    const sql = "SELECT * FROM vacations ORDER BY startDate";
    // Execute sql query
    const vacations = await dal.execute(sql);
    // Return vacation:
    return vacations;

}


// Add vacation:
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validation
    vacation.validatePost()
    // Save image to disk and get back its name:
    vacation.imageName = await imageHandler.saveImage(vacation.image);
    // Create sql query
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";
    // Execute query
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName);
    // Add new vacationId
    vacation.vacationId = result.insertId;
    // Delete Image File
    delete vacation.image;
    //Return vacation
    return vacation;

}


// Update Vacation:
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validation
    vacation.validatePut()
    // Save image to disk and get back its name:
    vacation.imageName = await getImageNameFromDB(vacation.vacationId);
    // Update existing image:
    if (vacation.image) {
        vacation.imageName = await imageHandler.updateImage(vacation.image, vacation.imageName);
    }
    // Create sql query:
    const sql = "UPDATE vacations SET destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageName = ? WHERE vacationId = ?";
    // Execute query
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);
    // If vacation doesn't exist
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);
    // Delete image file
    delete vacation.image;
    // Return updated product
    return vacation;

}


// Delete Vacation:
async function deleteVacation(vacationId: number): Promise<void> {
    // Get image name from database:
    const imageName = await getImageNameFromDB(vacationId);
    // Delete that image from database
    imageHandler.deleteImage(imageName);
    // Create sql query:
    const sql = "DELETE FROM vacations WHERE vacationId = ?";
    // Execute query
    const result: OkPacket = await dal.execute(sql, vacationId);
    // If vacationId doesn't exist
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

}


//-------------------------------------------------------------------------------------


// Get image name from database:
async function getImageNameFromDB(vacationId: number): Promise<string> {
    // Create sql query:
    const sql = "SELECT imageName FROM vacations WHERE vacationId = ?";
    // Get object array:
    const vacations = await dal.execute(sql, vacationId);
    // Extract single product: 
    const vacation = vacations[0];
    // If no such product: 
    if (!vacation) return null;
    // Return image name:
    return vacation.imageName;
}


export default {
    getAllVacationsForAdmin,
    addVacation,
    updateVacation,
    deleteVacation
}