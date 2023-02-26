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

            // Update vacationsStore:
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }
        // Return vacations:
        return vacations;
    }


    // Follow Vacation
    public async follow(userId: number, vacationId: number): Promise<void> {

        // Send vacationId for follow to backend:
        const response = await axios.post<VacationModel[]>(appConfig.userFollowUrl + vacationId);

        // const vacations = response.data;

        // Update Vacations Store:
        vacationsStore.dispatch({ type: VacationsActionType.Follow, payload: vacationId });

        // Refresh vacationState:
        this.updateRedux()
    }


    // Unfollow Vacation
    public async unfollow(userId: number, vacationId: number): Promise<void> {

        // Send vacationId for unfollow to backend:
        await axios.delete(appConfig.userUnfollowUrl + vacationId);

        // Update Vacations Store:
        vacationsStore.dispatch({ type: VacationsActionType.Unfollow, payload: vacationId });

        // Refresh vacationState:
        this.updateRedux()
    }

    //Update Redux
    public async updateRedux(): Promise<void> {

        // Get vacations from server
        const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
        const vacations = response.data;

        // Update Vacations Store:
        vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
    }
}

const userServices = new UserServices();

export default userServices;
