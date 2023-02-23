import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import userServices from "../../../Services/UserServices";
import Header from "../Header/Header";
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

            <Header />

            {/* Show in Menu if user role = User */}
            {user && user.role === "User" && <>
                {/* <NavLink to="/vacations-list">Vacation-List</NavLink> */}
            </>}

            {/* Show in menu if user role = Admin */}
            {user && user.role === "Admin" && <>
                <span> &nbsp; &nbsp; | &nbsp; &nbsp; </span>
                <NavLink to="/add-vacation">Add Vacation</NavLink>
                <span> &nbsp; &nbsp; | &nbsp; &nbsp; </span>
                <NavLink to="/vacations-report">Statistics</NavLink>
                <span>  &nbsp; &nbsp; | &nbsp; &nbsp; </span>
                <NavLink to="/vacations-list">Vacation-List</NavLink>
                <span> &nbsp;  &nbsp;| &nbsp;  </span>

            </>}

        </div>
    );
}

export default Menu;
