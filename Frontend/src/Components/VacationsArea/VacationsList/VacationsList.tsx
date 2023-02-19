import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminServices from "../../../Services/AdminServices";
import userServices from "../../../Services/UserServices";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import FilterVacation from "../FilterVacation/FilterVacation";
import Pagination from "../Pagination/Pagination";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {
    // Users---------------------------------------------------------------------------
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        // Listen to AuthState changes:
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
    }, []);

    // Vacations---------------------------------------------------------------------------
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // Vacations use effect
    useEffect(() => {
        userServices.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err));
    }, []);

    // Filtering -------------------------------------------------------------------
    const [filter, setFilter] = useState<string>("all");
    const [totalFilteredVacations, setTotalFilteredVacations] = useState<number>(0);

    const handleFilterChange = (filter: string) => {
        setFilter(filter)
    }

    const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        const filtered = vacations.filter(vacation => {
            if (filter === "all") return true;
            if (filter === "following" && !vacation.isFollowing) return false;
            if (filter === 'today') {
                const today = new Date();
                return today >= new Date(vacation.startDate) && today <= new Date(vacation.endDate);
            }
            if (filter === 'future') {
                const today = new Date();
                return today < new Date(vacation.startDate);
            }
            return true;
        });

        setFilteredVacations(filtered);
        setTotalFilteredVacations(filtered.length);
    }, [filter, vacations]);

    // Delete ----------------------------------------------------------------------
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
    // Refilter ----------------------------------------------------------------------

    // Pagination -------------------------------------------------------------------

    // Current page State:
    const [currentPage, setCurrentPage] = useState(1);
    // Vacations per page:
    const [vacationsPerPage] = useState(3);

    // First - Last vacation indexes for pagination:
    const lastVacationIndex = currentPage * vacationsPerPage;
    const firstVacationIndex = lastVacationIndex - vacationsPerPage;
    const currentVacation = filteredVacations.slice(firstVacationIndex, lastVacationIndex)
    const lastPage = vacations.length / vacationsPerPage;

    // Paginate ( # of pages )
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Next page paginate button:
    const nextPage = () => {
        if (currentPage !== lastPage) {
            setCurrentPage(prev => prev + 1)
        }
    }

    // Prev page paginate button:
    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(prev => prev - 1)
        }
    }


    return (
        <div className="VacationsList">

            {/* If loading... */}
            {vacations.length === 0 && <Spinner />}

            {/* If "User" - show filter */}
            {user && user.role === "User" && <>

                <FilterVacation onFilterChange={handleFilterChange} />

            </>}

            {/* Vacations Map */}
            {currentVacation.map(v => (<VacationCard key={v.vacationId} vacation={v} deleteVacation={deleteClickedVacation} />))}

            {/* Pagination UI */}
            <Pagination vacationsPerPage={vacationsPerPage} totalVacations={totalFilteredVacations} paginate={paginate} />
            <br></br>

            {totalFilteredVacations > 3 &&
                <div>
                    <button onClick={prevPage}>◀</button>
                    <button onClick={nextPage}>▶</button>
                </div>
            }

        </div>
    );
}

export default VacationsList;
