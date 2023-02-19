import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class UserServices {


   //Get All Vacations:
   public async getAllVacations(): Promise<VacationModel[]> {
      // Take vacations from global state:
      let vacations = vacationsStore.getState().vacations;
      // If store have no vacations:
      if (vacations.length === 0) {
         // Fetch vacations from backend:
         const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
         vacations = response.data;

         const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
         vacationsStore.dispatch(action);
      }
      // Return vacations:
      return vacations;
   }

   /// ------ TODO: do not accept follow two times for same user for same vacation!
   // Follow Vacation

   public async follow(userId: number, vacationId: number): Promise<void> {
      const response = await axios.post<VacationModel[]>(appConfig.userFollowUrl + vacationId);
      const vacations = response.data;
      vacationsStore.dispatch({ type: VacationsActionType.Follow, payload: vacationId });
   }


   // Unfollow Vacation
   public async unfollow(userId: number, vacationId: number): Promise<void> {

      await axios.delete(appConfig.userUnfollowUrl + vacationId);
      vacationsStore.dispatch({ type: VacationsActionType.Unfollow, payload: vacationId });

   }


}

const userServices = new UserServices();

export default userServices;
