import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../AuthArea/Home/Home";
import Register from "../../AuthArea/Register/Register";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vacations-list" element={<VacationsList />} />
            <Route path="/admin/vacations/add-vacation" element={<AddVacation />} />
            <Route path="/admin/vacations/update-vacation" element={<UpdateVacation />} />
            <Route path="/" element={<Navigate to="/vacations-list" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
