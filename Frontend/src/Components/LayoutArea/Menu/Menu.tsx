import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import userServices from "../../../Services/UserServices";
import "./Menu.css";


function Menu(): JSX.Element {

    // User set state:
    const [user, setUser] = useState<UserModel>();

    // useEffect for User and Subscribe;
    useEffect(() => {
        setUser(authStore.getState().user);
        // Listen to AuthState changes:
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, []);



    return (
        <div className="Menu">

            {/* Show in Menu if user role = User */}
            {user && user.role === "User" && <>
                <NavLink to="/vacations-list">Vacation-List</NavLink>
            </>}

            {/* Show in menu if user role = Admin */}
            {user && user.role === "Admin" && <>

                <NavLink to="/add-vacation">Add Vacation</NavLink>
                <span> | </span>
                <NavLink to="/vacations-report">Statistics</NavLink>
                <span> | </span>
                <NavLink to="/vacations-list">Vacation-List</NavLink>
                <span> | </span>

            </>}

        </div>
    );
}

export default Menu;
