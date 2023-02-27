import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import CsvCreator from "../../VacationsArea/CsvCreator/CsvCreator";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import VacationsReport from "../../VacationsArea/VacationsReport/VacationsReport";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <Routes>

            {/* Home Page */}
            <Route path="/home" element={<Home />} />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            {/* Register Page */}
            <Route path="/register" element={<Register />} />

            {/* Vacation List Component */}
            <Route path="/vacations-list" element={<VacationsList />} />

            {/* Statistics Component */}
            <Route path="/vacations-report" element={<VacationsReport />} />

            {/* Create csv Component */}
            <Route path="/csv" element={<CsvCreator />} />

            {/* Add Vacation Component */}
            <Route path="/add-vacation" element={<AddVacation />} />

            {/* Update Vacation Component */}
            <Route path="/update-vacation/:vacationId" element={<EditVacation />} />

            {/* Default Page */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Page Not Found */}
            <Route path="*" element={<PageNotFound />} />

        </Routes>
    );
}

export default Routing;
