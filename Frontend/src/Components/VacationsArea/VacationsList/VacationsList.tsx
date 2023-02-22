import {useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/VacationsState";
import userServices from "../../../Services/UserServices";
import notify from "../../../Utils/Notify";
import CsvCreator from "../CsvCreator/CsvCreator";
import Pagination from "../Pagination/Pagination";
import "./VacationsList.css";

function VacationsList(): JSX.Element {
    // Users---------------------------------------------------------------------------
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    // User UseEffect
    useEffect(() => {
        // If not user - navigate to login:
        if (!authStore.getState().user) {
            navigate("/login")
        }
        setUser(authStore.getState().user);
        // Listen to AuthState changes:
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, []);


    // Vacations---------------------------------------------------------------------------
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    // Vacations UseEffect
    useEffect(() => {
        userServices.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err));


        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations(v => vacationsStore.getState().vacations);
        });
        return unsubscribe;
    }, []);


    return (
        <div className="VacationsList">
            {user && user.role === "Admin" && <>
                <CsvCreator />
            </>}

            {/* Pagination UI */}
            <Pagination user={user} vacations={vacations} setVacations={setVacations} />

        </div>
    );
}

export default VacationsList;
