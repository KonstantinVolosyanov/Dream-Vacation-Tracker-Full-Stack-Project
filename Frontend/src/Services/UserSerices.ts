import axios from "axios";
import UserModel from "../Models/UserModel";
import VacationModel from "../Models/VacationModel";
import { vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class UserServices {


   //Get All Vacations:
   public async getAllVacationsForUser(user: UserModel): Promise<VacationModel[]> {
      // Take vacations from global state:
      let vacations = vacationsStore.getState().vacations;
      // If store have no vacations:
      if (vacations.length === 0) {
         // Fetch vacations from backend:
         const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
         vacations = response.data;
      }
      // Return vacations:
      return vacations;
   }

   /// ------ TODO: do not accept follow two times for same user for same vacation!
   // Follow Vacation
   public async follow(userId: number, vacationId: number): Promise<void> {
      const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
      const followUsers = response.data;
   }

   // Unfollow Vacation
   public async unfollow(userId: number, vacationId: number): Promise<void> {
      await axios.delete(appConfig.userUnfollowUrl + vacationId);

   }

}

const userServices = new UserServices();

export default userServices;
