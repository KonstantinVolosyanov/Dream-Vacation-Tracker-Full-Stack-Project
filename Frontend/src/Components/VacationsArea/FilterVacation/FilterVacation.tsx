import { useEffect } from "react";
import "./FilterVacation.css";

interface Props {
    onFilterChange: (filter: string) => void;
}

const FilterVacation: React.FC<Props> = ({ onFilterChange }) => {


    return (
        <div className="FilterVacation">
            <div className="filter-container">
                <label>Filter: </label>
                <button onClick={() => onFilterChange("all")}>All</button>
                <span> | </span>
                <button onClick={() => onFilterChange("following")}>Following</button>
                <span> | </span>
                <button onClick={() => onFilterChange("today")}>Active</button>
                <span> | </span>
                <button onClick={() => onFilterChange("future")}>Future</button>
            </div>
        </div>
    );
}

export default FilterVacation;
