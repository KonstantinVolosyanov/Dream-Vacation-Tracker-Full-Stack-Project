import { useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import adminServices from "../../../Services/AdminServices";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import FilterVacation from "../FilterVacation/FilterVacation";
import VacationCard from "../VacationCard/VacationCard";
import "./Pagination.css";

interface PaginationProps {
    vacations: VacationModel[];
    setVacations: (vacations: VacationModel[]) => void;
    user: UserModel;
}

const Pagination: React.FC<PaginationProps> = ({ setVacations, vacations, user }) => {

    // Total vacations after filtering:
    const [totalFilteredVacations, setTotalFilteredVacations] = useState<VacationModel[]>([]);
    // Number vacations per page:
    const [vacationsPerPage] = useState(8);
    // Set current page:
    const [currentPage, setCurrentPage] = useState(1);
    // Find index of last vacation on page:
    const lastVacationIndex = currentPage * vacationsPerPage;
    // Find index of first vacation on page:
    const firstVacationIndex = lastVacationIndex - vacationsPerPage;
    // Current vacation:
    const currentVacation = totalFilteredVacations.slice(firstVacationIndex, lastVacationIndex)


    // Total pages count:
    const totalPages = Math.ceil(totalFilteredVacations.length / vacationsPerPage);

    const pageNumbers = [];

    // For loop for number of pages:
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Handle next page button:
    const nextPage = () => {
        // Is this page not last page - 
        if (currentPage !== totalPages) {
            paginate(currentPage + 1);
        }
    };

    // Handle next page button:
    const prevPage = () => {
        if (currentPage !== 1) {
            paginate(currentPage - 1);
        }
    };

    async function deleteClickedVacation(vacationId: number) {
        try {
            await adminServices.deleteVacation(vacationId);
            // Refresh list:
            const duplicatedVacations = [...vacations];
            const index = duplicatedVacations.findIndex(v => v.vacationId === vacationId);
            duplicatedVacations.splice(index, 1);
            setVacations(duplicatedVacations);
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    // Paginate ( # of pages )
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="Pagination">

            {/* If loading... */}
            {vacations.length === 0 && <Spinner />}

            <FilterVacation setCurrentPage={setCurrentPage} setTotalFilteredVacations={setTotalFilteredVacations} vacations={vacations} user={user} />

            {/* Vacations Map */}
            {currentVacation.map(v => (<VacationCard key={v.vacationId} vacation={v} deleteVacation={deleteClickedVacation} user={user} />))}

            {totalPages > 1 && (
                <div>
                    <button onClick={prevPage} className="Prev" disabled={currentPage === 1}>◀</button>
                    {pageNumbers.map((number) => (<button key={number} onClick={() => paginate(number)} className={number === currentPage ? "active" : "notActive"}></button>))}
                    {/* {pageNumbers.map((number) => <input type="checkbox" key={number} onClick={() => paginate(number)} className={number === currentPage ? "active" : ""}></input>)} */}
                    <button onClick={nextPage} className="Prev" disabled={currentPage === totalPages}>▶</button>
                </div>
            )}
        </div>
    );
};

export default Pagination;