import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class AdminServices {

    // Get One Vacation For Admin:
    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        // Take vacations from global state:
        let vacations = vacationsStore.getState().vacations;

        // Find needed vacation from global state;
        let vacation = vacations.find(v => v.vacationId === vacationId);

        // If vacation not found:
        if (!vacation) {

            // Fetch vacations from backend:
            const response = await axios.get<VacationModel>(appConfig.adminVacationsUrl + vacationId);

            vacation = response.data;
            console.log(vacation);
        }

        // Return vacations:
        return vacation;
    }


    // Add vacation:
    public async addVacation(vacation: VacationModel): Promise<void> {

        // Add headers for image:
        const headers = { "Content-Type": "multipart/form-data" };

        // Send request to backend:
        const response = await axios.post<VacationModel>(appConfig.adminVacationsUrl, vacation, { headers });

        // Receive response to addedVacation
        const addedVacation = response.data;

        // Full image url:
        const imageUrl = appConfig.imagesUrl + addedVacation.imageName;

        // Add full url to addedVacation:
        const vacationWithImageUrl = { ...addedVacation, imageUrl };

        // Send added vacation into redux global state:
        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: vacationWithImageUrl });

    }


    // Update Vacation:
    public async updateVacation(vacation: VacationModel): Promise<void> {

        // Add headers for image:
        const headers = { "Content-Type": "multipart/form-data" };

        // Send request to backend:
        const response = await axios.put<VacationModel>(appConfig.adminVacationsUrl + vacation.vacationId, vacation, { headers });

        // Receive response to updatedVacation
        const updatedVacation = response.data;

        // Full image url:
        const imageUrl = appConfig.imagesUrl + updatedVacation.imageName;

        // Add full url to updatedVacation:
        const vacationWithImageUrl = { ...updatedVacation, imageUrl };

        // Send updated vacation into redux global state:
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: vacationWithImageUrl });

    }


    // Delete Vacation:
    public async deleteVacation(vacationId: number): Promise<void> {

        // Send delete request + vacationId  
        await axios.delete(appConfig.adminVacationsUrl + vacationId);

        // Send delete id vacation into redux global state:
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });

    }

}

const adminServices = new AdminServices();

export default adminServices;
