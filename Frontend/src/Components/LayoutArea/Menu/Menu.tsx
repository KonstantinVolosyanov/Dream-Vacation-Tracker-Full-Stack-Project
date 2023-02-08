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
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
    }, []);


    // csvData set State:
    const [csvData, setCSVData] = useState<csvEntry[][]>([[]]);

    // csvEntry variable can contain string or/and number
    type csvEntry = string | number;

    // Set headers for CSV file:
    let csvArray: csvEntry[][] = [['Destination', 'Followers']];

    // Get data from service for CSV file:
    async function getDataForCSV(): Promise<void> {

        // Get data:
        const vacations = await userServices.getAllVacations();
        // Push data into array of arrays
        csvArray.push(...vacations.map(v => [v.destination, v.followersCount]));
        // Set CSV state:
        setCSVData(csvArray);

    }

    // Use getDataForCSV once:
    useEffect(() => {
        getDataForCSV();
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
                <NavLink to="/statistics">Statistics</NavLink>
                <span> | </span>
                <NavLink to="/vacations-list">Vacation-List</NavLink>
                <span> | </span>
                {/* CSV download link */}
                <CSVLink data={csvData}>Download CSV file</CSVLink>


            </>}

        </div>
    );
}

export default Menu;
