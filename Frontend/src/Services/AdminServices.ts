import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class AdminServices {


   // Get All Vacations For Admin
   public async getAllVacations(): Promise<VacationModel[]> {
      // Take vacations from global state:
      let vacations = vacationsStore.getState().vacations;
      // If store have no vacations:
      if (vacations.length === 0) {
         // Fetch vacations from backend:
         const response = await axios.get<VacationModel[]>(appConfig.adminVacationsUrl);
         vacations = response.data;
         const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
         vacationsStore.dispatch(action);
      }
      // Return vacations:
      return vacations;

   }

   //Get All Vacations:
   public async createCSVFile(): Promise<void> {
      // Take vacations from global state:
      let vacations = vacationsStore.getState().vacations;
      // If store have no vacations:
      console.log("frontend function works");
      if (vacations.length === 0) {
         const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
         // Fetch vacations from backend:
         vacations = response.data;

      }
   }

   // Get One Vacation For Admin:
   public async getOneVacation(vacationId: number): Promise<VacationModel> {
      // Take vacations from global state:
      let vacations = vacationsStore.getState().vacations;
      // Find needed vacation from global state;
      let vacation = vacations.find(v => v.vacationId === vacationId);
      // If vacation not found:
      if (!vacations) {
         // Fetch vacations from backend:
         const response = await axios.get<VacationModel>(appConfig.adminVacationsUrl + vacationId);
         vacation = response.data;

      }
      // Return vacations:
      return vacation;

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
