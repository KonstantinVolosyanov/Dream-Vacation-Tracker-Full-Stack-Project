import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class AdminServices {


   // Get All Vacations For Admin
   public async getAllVacationsForAdmin(): Promise<VacationModel[]> {
      // Take vacations from global state:
      let vacations = vacationsStore.getState().vacations;
      // If store have no vacations:
      if (vacations.length === 0) {
         // Fetch vacations from backend:
         const response = await axios.get<VacationModel[]>(appConfig.adminVacationsUrl);
         vacations = response.data;
      }
      // Return vacations:
      return vacations;

   }


   // Add vacation:
   public async addVacation(vacation: VacationModel): Promise<void> {
      const headers = { "Content-Type": "multipart/form-data" };
      const response = await axios.post<VacationModel>(appConfig.adminVacationsUrl, vacation, { headers });
      const addedVacation = response.data;

      // Send added vacation into redux global state:
      vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });

   }


   // Update Vacation:
   public async updateVacation(vacation: VacationModel): Promise<void> {
      const headers = { "Content-Type": "multipart/form-data" };
      const response = await axios.put<VacationModel>(appConfig.adminVacationsUrl + vacation.vacationId, vacation, { headers });
      const updatedProduct = response.data;

      // Send updated vacation into redux global state:
      vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedProduct });
      
   }


   // Delete Vacation:
   public async deleteVacation(vacationId: number): Promise<void> {
      await axios.delete(appConfig.adminVacationsUrl + vacationId);

       // Send delete id vacation into redux global state:
       vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });

   }

}

const adminServices = new AdminServices();

export default adminServices;
