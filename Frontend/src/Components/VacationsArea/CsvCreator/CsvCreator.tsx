import "./CsvCreator.css";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import userServices from "../../../Services/UserServices";


function CsvCreator(): JSX.Element {
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

    //Use getDataForCSV once:
    useEffect(() => {
        getDataForCSV();
    }, [user]);

    return (
        <div className="CsvCreator">

            {/* Show in Menu if user role = User */}
            {user && user.role === "Admin" && <>


                <CSVLink data={csvData}>Download CSV file</CSVLink>


            </>}

        </div>
    );
}
export default CsvCreator;
