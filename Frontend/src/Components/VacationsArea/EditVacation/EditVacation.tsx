import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminServices from "../../../Services/AdminServices";
import notify from "../../../Utils/Notify";


function EditVacation(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();


    useEffect(() => {
        adminServices.getOneVacation(+params.vacationId)
            .then(vacation => {
                setVacation(vacation);
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);
                setStartDate(new Date(vacation.startDate));
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

    // Past date validation handler
    const handleStartDateChange = (args: ChangeEvent<HTMLInputElement>) => {
        setStartDate(args.target.valueAsDate);
    };

    return (
        <div className="EditVacation Box">

            <h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                {/* Hiding Id */}
                <input type="hidden" {...register("vacationId")} />

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                <label>Description: </label>
                <textarea {...register("description", VacationModel.descriptionValidation)} />
                <span className="Err">{formState.errors.description?.message}</span>

                {/* Start Date: min = Today , onchange handler, value = previous Start Date */}
                <label>Start date: </label>

                <input type="date" {...register("startDate", VacationModel.startDateValidation)} onChange={handleStartDateChange} value={vacation?.startDate?.split("T")[0]} min={startDate.toISOString().split("T")[0]} />;
                <span className="Err">{formState.errors.startDate?.message}</span>

                {/* End Date: minimum => Start Date, value = previous EndDate */}
                <label>End date: </label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)} value={vacation?.endDate?.split("T")[0]} min={startDate.toISOString().split("T")[0]} />;
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", VacationModel.imagePutValidation)} />
                <span className="Err">{formState.errors.image?.message}</span>

                <img src={vacation?.imageUrl} />

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditVacation;
