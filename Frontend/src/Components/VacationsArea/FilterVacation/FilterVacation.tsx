import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import "./FilterVacation.css";

interface Props {
    vacations: VacationModel[];
    user: UserModel;
    setTotalFilteredVacations: (vacations: VacationModel[]) => void;
    setCurrentPage: (n: number) => void;
}

const FilterVacation: React.FC<Props> = ({ vacations, setTotalFilteredVacations, user, setCurrentPage }) => {
    // Starting filtering on "All"
    // const [filter, setFilter] = useState<string>("all");

    const [filter, setFilter] = useState<string>("all");


    const onFilterChange = (filter: string) => {
        // Setting Filter:
        setFilter(filter)
        // Setting current page to 1
        setCurrentPage(1);
    }
    // UseEffect for filter
    useEffect(() => {
        const filtered = vacations.filter(vacation => {
            //All
            if (filter === "all") return true;
            // If user following
            if (filter === "following" && !vacation.isFollowing) return false;
            // Active now vacations
            if (filter === 'today') {
                const today = new Date();
                return today >= new Date(vacation.startDate) && today <= new Date(vacation.endDate);
            }
            // Future vacations
            if (filter === 'future') {
                const today = new Date();
                return today < new Date(vacation.startDate);
            }
            return true;
        });

        setTotalFilteredVacations(filtered);
    }, [filter, vacations]);



    return (
        <div className="FilterVacation">
            {user && user.role === "User" && <>
                <div className="FilterContainer">
                    {/* <label>Filter: </label> */}
                    <button className="FilterButton" onClick={() => onFilterChange("all")}>All</button>
                    <span> &nbsp; | &nbsp; </span>
                    <button className="FilterButton" onClick={() => onFilterChange("following")}>Following</button>
                    <span> &nbsp;| &nbsp;</span>
                    <button className="FilterButton" onClick={() => onFilterChange("today")}>Active</button>
                    <span>&nbsp; | &nbsp;</span>
                    <button className="FilterButton" onClick={() => onFilterChange("future")}>Future</button>
                </div>
            </>}
        </div>
    );
}

export default FilterVacation;
