import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminServices from "../../../Services/AdminServices";
import notify from "../../../Utils/Notify";

function AddVacation(): JSX.Element {
    
     // Users---------------------------------------------------------------------------
     const [user, setUser] = useState<UserModel>();
    

     // User UseEffect
     useEffect(() => {
         // If not user - navigate to login:
         if (!authStore.getState().user) {
             navigate("/login")
         }
         setUser(authStore.getState().user);
         // Listen to AuthState changes + unsubscribe:
         const unsubscribe = authStore.subscribe(() => {
             setUser(authStore.getState().user);
         });
         return unsubscribe;
     }, []);
 
 
     function redirect() {
         navigate("/vacations-list");
     }

    // Use form:
    const { register, handleSubmit, formState } = useForm<VacationModel>();

    // Use Navigate:
    const navigate = useNavigate();

    // Start date State for past date validation:
    const [startDate, setStartDate] = useState(new Date());

    // Past date validation handler:
    const handleStartDateChange = (args: ChangeEvent<HTMLInputElement>) => {
        setStartDate(args.target.valueAsDate);
    };
    


    // Send added vacation
    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await adminServices.addVacation(vacation);
            notify.success("Vacation added successfully");
            navigate("/vacations-list");
        }
        catch (err) {
            notify.error(err);
        }
    }


    return (
        <div >
            <h2 className="AddVacationH2">Add Vacation</h2>

            <div className="AddEditForm">

            {user && user.role === "User" && <>
                {redirect()}
            </>}

                {/* Add vacation form */}
                <form onSubmit={handleSubmit(send)}>
                    <div>

                        <br></br>
                        <br></br>

                        <label>Destination: </label>
                        <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                        <span className="Err">{formState.errors.destination?.message}</span>

                        {/* Start Date - min: Today + on change handler */}
                        <label>Start date: </label>
                        <input type="date" {...register("startDate", VacationModel.startDateValidation)} onChange={handleStartDateChange} min={new Date().toISOString().split("T")[0]} />
                        <span className="Err">{formState.errors.startDate?.message}</span>

                        {/* End Date - min: Start Date */}
                        <label>End date: </label>
                        <input type="date" {...register("endDate", VacationModel.endDateValidation)} min={startDate.toISOString().split("T")[0]} />
                        <span className="Err">{formState.errors.endDate?.message}</span>

                        <label>Price: </label>
                        <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)} />
                        <span className="Err">{formState.errors.price?.message}</span>

                        <label >Image: </label>
                        <input className="Button" type="file" accept="image/*" {...register("image", VacationModel.imageValidation)} />
                        <span className="Err">{formState.errors.image?.message}</span>

                    </div>
                    <div>

                        <label>Description: </label>
                        <textarea {...register("description", VacationModel.descriptionValidation)} />
                        <span className="Err">{formState.errors.description?.message}</span>

                        <button className="ButtonAdd">Add</button>

                    </div>

                    <button className="ButtonBack"><NavLink to={"/vacations-list"}>Back</NavLink></button>

                </form>
            </div>
        </div>
    );
}

export default AddVacation;
