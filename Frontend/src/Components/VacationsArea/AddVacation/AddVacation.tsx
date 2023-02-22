import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminServices from "../../../Services/AdminServices";
import notify from "../../../Utils/Notify";

function AddVacation(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();

    // Use form
    const { register, handleSubmit, formState } = useForm<VacationModel>();

    // Navigate
    const navigate = useNavigate();

    // Start date state for past date validation
    const [startDate, setStartDate] = useState(new Date());

    // Past date validation handler
    const handleStartDateChange = (args: ChangeEvent<HTMLInputElement>) => {
        setStartDate(args.target.valueAsDate);
    };

   

    // Send added vacation
    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            const addedVacation = await adminServices.addVacation(vacation);
            // await adminServices.addVacation(vacation);
            notify.success("Vacation added successfully");
            navigate("/vacations-list")


        }
        catch (err) {
            notify.error(err)
        }
    }


    return (
        <div className="AddVacation Box">

            {/* Add vacation form */}
            <form onSubmit={handleSubmit(send)}>

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                <label>Description: </label>
                <textarea {...register("description", VacationModel.descriptionValidation)} />
                <span className="Err">{formState.errors.description?.message}</span>

                {/* Start Date - min: Today + on change handler */}
                <label>Start date: </label>
                <input type="date" {...register("startDate", VacationModel.startDateValidation)} onChange={handleStartDateChange} min={new Date().toISOString().split("T")[0]} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>End date: </label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)} min={startDate.toISOString().split("T")[0]} />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", VacationModel.imageValidation)} />
                <span className="Err">{formState.errors.image?.message}</span>

                <img src={vacation?.imageUrl} />

                <button>Add</button>

            </form>
        </div>
    );
}

export default AddVacation;
