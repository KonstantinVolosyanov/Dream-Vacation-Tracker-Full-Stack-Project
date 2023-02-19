import { NavLink } from "react-router-dom";
import "./Pagination.css";

interface PaginationProps {
    vacationsPerPage: number;
    totalVacations: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ vacationsPerPage, totalVacations, paginate }) => {

    const totalPages = Math.ceil(totalVacations / vacationsPerPage);

    if (totalPages <= 1) {
        return null;
    }

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="Pagination">
            <span>{pageNumbers.map(number => (
                <span key={number}>
                    <button onClick={() => paginate(number)}>
                        {number}
                    </button>
                </span>
            ))}</span>
        </div >
    )
}

export default Pagination;
