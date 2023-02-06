import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminServices from "../../../Services/AdminServices";
import notify from "../../../Utils/Notify";
import "./VacationCard.css";


interface VacationCardProps {
    vacation: VacationModel;
    deleteVacation: (vacationId: number) => Promise<void>;
}


function VacationCard(props: VacationCardProps): JSX.Element {

    const params = useParams();
    const navigate = useNavigate();

    // Format Date:
    function formatDate(fullDate: string): string {
        const date = new Date(fullDate);
        return date.toDateString();
    }

    // Users State:
    const [user, setUser] = useState<UserModel>();

    // Users Use Effect
    useEffect(() => {
        setUser(authStore.getState().user);
        // Listen to AuthState changes:
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
    }, []);

    // Vacation State:
    const [vacation, setVacation] = useState<VacationModel>();

    //Vacation Use Effect:
    useEffect(() => {
        adminServices.getOneVacation(+params.id)
            .then(vacation => setVacation(vacation))
            .catch(err => notify.error(err));
    }, []);

    async function deleteMe() {
        try {
            if (!window.confirm("Are you sure?")) return;
            await props.deleteVacation(props.vacation.vacationId);
            notify.success("Vacation has been deleted.")
        }
        catch (err: any) {
            notify.error(err);
        }
    }


    return (
        <div className="VacationCard Box">
            {/* If User */}
            {user && user.role === "User" &&
                <>
                    <div>
                        <img src={props.vacation.imageUrl} />
                    </div>
                    <div>
                        {props.vacation.isFollowing}
                        <br />
                        {props.vacation.followersCount}
                        <br />
                        <span className="label">Destination: </span>
                        <br />
                        {props.vacation.destination}
                        <br />
                        <span className="label">Bio: </span>
                        <div className="Bio">
                            {props.vacation.description}
                        </div>
                        <br />
                        <span className="label">Start Date: </span>
                        {formatDate(props.vacation.startDate)}
                        <br />
                        <span className="label">End Date: </span>
                        {formatDate(props.vacation.endDate)}
                        <br />
                        <span className="label">Price: </span>
                        {props.vacation.price}
                        <br />
                    </div>
                </>}

            {/* If Admin */}
            {user && user.role === "Admin" &&
                <>
                    <div>
                        <img src={props.vacation.imageUrl} />
                    </div>
                    <div>
                        {props.vacation.followersCount}
                        <br />
                        <span className="label">Destination: </span>
                        <br />
                        {props.vacation.destination}
                        <br />
                        <span className="label">Bio: </span>
                        <div className="Bio">
                            {props.vacation.description}
                        </div>
                        <br />
                        <span className="label">Start Date: </span>
                        {formatDate(props.vacation.startDate)}
                        <br />
                        <span className="label">End Date: </span>
                        {formatDate(props.vacation.endDate)}
                        <br />
                        <span className="label">Price: </span>
                        {props.vacation.price}
                        <br />
                        <NavLink to={"/update-vacation/" + props.vacation.vacationId}>Edit</NavLink>
                        <button onClick={deleteMe}>Delete Vacation</button>
                    </div>
                </>}
        </div>
    );
}

export default VacationCard;
