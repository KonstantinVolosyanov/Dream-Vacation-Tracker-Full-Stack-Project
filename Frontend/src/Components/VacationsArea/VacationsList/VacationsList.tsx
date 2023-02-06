import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import adminServices from "../../../Services/AdminServices";
import userServices from "../../../Services/UserServices";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {

    // const [user, setUser] = useState<UserModel>();

    // useEffect(() => {
    //     setUser(authStore.getState().user);
    //     // Listen to AuthState changes:
    //     authStore.subscribe(() => {
    //         setUser(authStore.getState().user);
    //     });
    // }, []);

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        userServices.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err));
    }, []);

    async function deleteClickedMovie(vacationId: number) {
        try {
            await adminServices.deleteVacation(vacationId);
            // Refresh list:
            const duplicatedVacations = [...vacations];
            const index = duplicatedVacations.findIndex(v => v.vacationId === vacationId);
            duplicatedVacations.splice(index, 1);
            setVacations(duplicatedVacations);

        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="VacationsList">

            {vacations.length === 0 && <Spinner />}


            {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} deleteVacation={deleteClickedMovie} />)}

        </div>
    );
}

export default VacationsList;
