import { ChangeEvent, useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminServices from "../../../Services/AdminServices";
import userServices from "../../../Services/UserServices";
import notify from "../../../Utils/Notify";
import Menu from "../../LayoutArea/Menu/Menu";
import Spinner from "../../SharedArea/Spinner/Spinner";
import FilterVacation from "../FilterVacation/FilterVacation";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        // Listen to AuthState changes:
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
    }, []);

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // Vacations use effect
    useEffect(() => {
        userServices.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err));
    }, []);

    // Filtering -------------------------------------------------------------------
    const [filter, setFilter] = useState<string>("all");

    const handleFilterChange = (filter: string) => {
        setFilter(filter)
    }

    const filteredVacations = vacations.filter(vacation => {
        if (filter === "following" && !vacation.isFollowing) return false;
        if (filter === 'today') {
            const today = new Date();
            return today >= new Date(vacation.startDate) && today <= new Date(vacation.endDate);
        }
        if (filter === 'future') {
            const today = new Date();
            return today < new Date(vacation.startDate);
        }
        return true;
    })

    // Delete ----------------------------------------------------------------------
    async function deleteClickedVacation(vacationId: number) {
        try {
            await adminServices.deleteVacation(vacationId);
            // Refresh list:
            const duplicatedVacations = [...vacations];
            const index = duplicatedVacations.findIndex(v => v.vacationId === vacationId);
            duplicatedVacations.splice(index, 1);
            setVacations(duplicatedVacations);
            // set
            // set...

        }
        catch (err: any) {
            notify.error(err);
        }
    }




    return (
        <div className="VacationsList">

            {vacations.length === 0 && <Spinner />}

            {user && user.role === "User" && <>

                <FilterVacation onFilterChange={handleFilterChange} />

            </>}


            {filteredVacations.map(v => (<VacationCard key={v.vacationId} vacation={v} deleteVacation={deleteClickedVacation} />))}

            {/* {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} deleteVacation={deleteClickedMovie} />)} */}

        </div>
    );
}

export default VacationsList;
