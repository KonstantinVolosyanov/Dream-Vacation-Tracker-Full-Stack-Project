import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminServices from "../../../Services/AdminServices";
import notify from "../../../Utils/Notify";

function EditVacation(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    // Load vacation data from local storage whenever it changes
    useEffect(() => {
        const storedVacation = JSON.parse(localStorage.getItem(`vacation-${params.vacationId}`) || '{}');
        setVacation(storedVacation);
    }, [params.vacationId]);

    // Save vacation data to local storage whenever it changes
    useEffect(() => {
        if (vacation) {
            localStorage.setItem(`vacation-${vacation.vacationId}`, JSON.stringify(vacation));
        }
    }, [vacation]);


    useEffect(() => {
        adminServices.getOneVacation(+params.vacationId)
            .then(vacation => {
                setVacation(vacation);
                if (vacation) {
                    setValue("vacationId", vacation.vacationId);
                    setValue("destination", vacation.destination);
                    setValue("description", vacation.description);
                    setValue("startDate", vacation.startDate);
                    setValue("endDate", vacation.endDate);
                    setValue("price", vacation.price);
                    const defaultStartDate = new Date(vacation.startDate);
                    defaultStartDate.setDate(defaultStartDate.getDate() + 1);
                    setStartDate(defaultStartDate);

                    const defaultEndDate = new Date(vacation.endDate);
                    defaultEndDate.setDate(defaultEndDate.getDate() + 1);
                    setEndDate(defaultEndDate);

                }
            })
            .catch(err => notify.error(err));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            const updatedVacation = await adminServices.updateVacation(vacation);
            notify.success("Vacation has been updated.")
            navigate("/vacations-list")
        }
        catch (err: any) {
            notify.error(err)
        }
    }

    // Start date state for past date validation
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // Past date validation handler
    const handleStartDateChange = (args: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(args.target.value);
        setStartDate(selectedDate);
        setValue("startDate", selectedDate.toISOString().split("T")[0]);
    };
    const handleEndDateChange = (args: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(args.target.value);
        setEndDate(selectedDate);
        setValue("endDate", selectedDate.toISOString().split("T")[0]);
    };

    return (
        <div>
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
                        <input type="date" {...register("startDate", VacationModel.startDateValidation)} onChange={handleStartDateChange} value={(startDate).toISOString().split("T")[0]} />
                        <span className="Err">{formState.errors.startDate?.message}</span>

                        {/* End Date: value = previous EndDate */}
                        <label>End date: </label>
                        <input type="date" {...register("endDate", VacationModel.endDateValidation)} onChange={handleEndDateChange} value={(endDate).toISOString().split("T")[0]} min={startDate.toISOString().split("T")[0]} />
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
