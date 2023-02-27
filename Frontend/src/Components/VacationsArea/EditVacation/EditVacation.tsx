import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminServices from "../../../Services/AdminServices";
import notify from "../../../Utils/Notify";

function EditVacation(): JSX.Element {

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

    // Vacation Use State:
    const [vacation, setVacation] = useState<VacationModel>();

    // Use Form:
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();

    // Use Navigate
    const navigate = useNavigate();

    // Use Params:
    const params = useParams();

    // Use Effect fill form bu default vacation values
    useEffect(() => {
        adminServices.getOneVacation(+params.vacationId)
            .then(vacation => {

                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                // Get Time locale zone start date
                const startDate = new Date(vacation.startDate);
                startDate.setDate(startDate.getDate())
                const formattedStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
                setValue("startDate", formattedStartDate);
                setStartDate(startDate);
                // Get Time locale zone end date
                const endDate = new Date(vacation.endDate);
                endDate.setDate(endDate.getDate())
                const formattedEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
                setValue("endDate", formattedEndDate);
                setEndDate(endDate);

                setValue("price", vacation.price);
                setVacation(vacation);

            })
            .catch(err => notify.error(err));
    }, []);

    // Send function for handling update Vacation
    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await adminServices.updateVacation(vacation);
            notify.success("Vacation has been updated.")
            navigate("/vacations-list")
        }
        catch (err: any) {
            notify.error(err)
        }
    }

    // Start date State for past date validation:
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // Past date validation handler:
    const handleStartDateChange = (args: ChangeEvent<HTMLInputElement>) => {
        const inputStartDate = new Date(args.target.value);
        inputStartDate.setUTCHours(0, 0, 0, 0); // Set to midnight in UTC
        setStartDate(inputStartDate);
    };
    const handleEndDateChange = (args: ChangeEvent<HTMLInputElement>) => {
        const inputEndDate = new Date(args.target.value);
        inputEndDate.setUTCHours(0, 0, 0, 0); // Set to midnight in UTC
        setEndDate(inputEndDate);
    };

    return (
        <div>

            {user && user.role === "User" && <>
                {redirect()}
            </>}

            <h2 className="AddVacationH2">Edit Vacation</h2>

            <div className="AddEditForm">


                <form onSubmit={handleSubmit(send)}>
                    {/* Hiding Id */}
                    <input type="hidden" {...register("vacationId")} />
                    <div>
                        <br></br>
                        <br></br>
                        <label>Destination: </label>
                        <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                        <span className="Err">{formState.errors.destination?.message}</span>

                        {/* Start Date: onchange handler, value = previous Start Date */}
                        <label>Start date: </label>
                        <input type="date" {...register("startDate", VacationModel.startDateValidation)} onChange={handleStartDateChange} />
                        <span className="Err">{formState.errors.startDate?.message}</span>

                        {/* End Date: value = previous EndDate */}
                        <label>End date: </label>
                        <input type="date" {...register("endDate", VacationModel.endDateValidation)} onChange={handleEndDateChange} min={startDate.toISOString().split("T")[0]} />
                        <span className="Err">{formState.errors.endDate?.message}</span>

                        <label>Price: </label>
                        <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)} />
                        <span className="Err">{formState.errors.price?.message}</span>

                        <label>Image: </label>
                        <input type="file" accept="image/*" {...register("image", VacationModel.imagePutValidation)} />
                        <span className="Err">{formState.errors.image?.message}</span>

                    </div>
                    <div>
                        <label>Description: </label>
                        <textarea {...register("description", VacationModel.descriptionValidation)} />
                        <span className="Err">{formState.errors.description?.message}</span>
                        <br></br>
                        <img src={vacation?.imageUrl} />

                        <button className="ButtonUpdate">Update</button>
                    </div>

                    <button className="ButtonBackUpdate"><NavLink to={"/vacations-list"}>Back</NavLink></button>
                </form>

            </div>
        </div>
    );
}

export default EditVacation;
