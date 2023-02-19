import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";
import { composeWithDevTools } from "redux-devtools-extension"

// 1. App State - application level state:
export class VacationsState {
   public vacations: VacationModel[] = [];
}


// 2. Action Type - list of actions needed on the data:
export enum VacationsActionType {
   FetchVacations = "FetchVacations",
   AddVacation = "AddVacation",
   UpdateVacation = "UpdateVacation",
   DeleteVacation = "DeleteVacation",
   Follow = "Follow",
   Unfollow = "Unfollow"
}


// 3. Action - a single object describing single operation on the data:
export interface VacationsAction {
   type: VacationsActionType;
   payload: any;
}

// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function):
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

   const newState: VacationsState = { ...currentState };

   // let indexToFollow: number;

   switch (action.type) {


      case VacationsActionType.FetchVacations:
         newState.vacations = action.payload;

         break;

      case VacationsActionType.AddVacation:
         newState.vacations.push(action.payload);
         break;

      case VacationsActionType.UpdateVacation:
         const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.id);
         if (indexToUpdate >= 0) {
            newState.vacations[indexToUpdate] = action.payload;
         }
         break;

      case VacationsActionType.DeleteVacation:
         const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
         if (indexToDelete >= 0) {
            newState.vacations.splice(indexToDelete, 1);
         }
         break

      case VacationsActionType.Follow:
         // newState.vacations.push(action.payload);
         const indexToFollow = newState.vacations.findIndex(v => v.vacationId === action.payload);
         if (indexToFollow >= 0) {
            newState.vacations[indexToFollow] = {
               ...newState.vacations[indexToFollow],
               isFollowing: true
            }
         }
         break;


      case VacationsActionType.Unfollow:
         // const indexToUnfollow = newState.vacations.findIndex(v => v.vacationId === action.payload);
         // if (indexToUnfollow >= 0) {
         //    newState.vacations.splice(indexToUnfollow, 1);
         // }
         const indexToUnfollow = newState.vacations.findIndex(v => v.vacationId === action.payload);
         if (indexToUnfollow >= 0) {
            newState.vacations[indexToUnfollow] = {
               ...newState.vacations[indexToUnfollow],
               isFollowing: false
            };
         }
         break
   }

   return newState;
}

// 5. Store - Redux manager:
export const vacationsStore = createStore(vacationsReducer, composeWithDevTools());