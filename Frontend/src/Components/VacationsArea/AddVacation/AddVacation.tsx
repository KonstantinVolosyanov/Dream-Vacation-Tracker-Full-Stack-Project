import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminServices from "../../../Services/AdminServices";
import notify from "../../../Utils/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    // Use form
    const { register, handleSubmit, formState } = useForm<VacationModel>();

    // Navigate
    const navigate = useNavigate();

    // Send added vacation
    async function send(vacation: VacationModel) {
        const startDate = new Date(vacation.startDate);
        const endDate = new Date(vacation.endDate);
        if (endDate.getDate() < startDate.getDate()) {
            notify.error("End date must be past start date");
            return;
        }
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await adminServices.addVacation(vacation);
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

                <label>Start date: </label>
                <input type="date" min={new Date().toISOString().split("T")[0]} {...register("startDate", VacationModel.startDateValidation)} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>End date: </label>
                <input type="date" min={new Date().toISOString().split("T")[0]} {...register("endDate", VacationModel.endDateValidation)} />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", VacationModel.imageValidation)} />
                <span className="Err">{formState.errors.image?.message}</span>

                <button>Add</button>

            </form>
        </div>
    );
}

export default AddVacation;