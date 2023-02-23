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
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vacations-list" element={<VacationsList />} />
            <Route path="/vacations-report" element={<VacationsReport />} />
            <Route path="/csv" element={<CsvCreator />} />
            <Route path="/add-vacation" element={<AddVacation />} />
            <Route path="/update-vacation/:vacationId" element={<EditVacation />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
