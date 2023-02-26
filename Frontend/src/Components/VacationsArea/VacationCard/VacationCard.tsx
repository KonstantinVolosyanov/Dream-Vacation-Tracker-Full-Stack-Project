import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import userServices from "../../../Services/UserServices";
import notify from "../../../Utils/Notify";
import "./VacationCard.css";

// Interface props + delete function for every card:
interface VacationCardProps {
    vacation: VacationModel;
    deleteVacation: (vacationId: number) => Promise<void>;
    user: UserModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const params = useParams();

    // Format Date:
    function formatDate(fullDate: string): string {
        const date = new Date(fullDate);
        return date.toDateString();
    }


    // DeleteMe vacation function------------------------------------------------------------
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

    // Follow state:-----------------------------------------------------------------
    const [isFollowing, setIsFollowing] = useState<boolean>(props.vacation.isFollowing);

    // Toggle follow button function:
    async function handleFollow() {
        try {
            await userServices.follow(props.user.userId, props.vacation.vacationId);
            setIsFollowing(true);
            // const updatedCount = props.vacation.followersCount++;
        } catch (err: any) {
            notify.error(err);
        }
    }

    async function handleUnfollow() {
        try {
            await userServices.unfollow(props.user.userId, props.vacation.vacationId);
            setIsFollowing(false);
            // const updatedCount = props.vacation.followersCount--;
        } catch (err: any) {
            notify.error(err);
        }
    }


    return (
        <div className="VacationCard">
            {/* If User */}
            {props.user && props.user.role === "User" &&
                <>
                    <div>
                        <img src={props.vacation.imageUrl} />
                    </div>
                    <div className="Price">
                        {props.vacation.price}$
                    </div>
                    <div className="Follow">
                        {isFollowing ? (
                            <button className="UnfollowBtn" onClick={handleUnfollow}>❤</button>
                        ) : (
                            <button className="FollowBtn" onClick={handleFollow}>❤</button>
                        )}
                        <div className="Count">
                            {props.vacation.followersCount}
                        </div>
                    </div>
                    <div className="Dates">
                        📅 {formatDate(props.vacation.startDate) + " - "}
                        {formatDate(props.vacation.endDate)}
                    </div>
                    <div className="Destination">
                        {props.vacation.destination}
                    </div>
                    <div className="Bio">
                        {props.vacation.description}
                    </div>


                </>}

            {/* If Admin */}
            {props.user && props.user.role === "Admin" &&
                <>
                    <div>
                        <img src={props.vacation.imageUrl} />
                    </div>
                    <div className="Price">
                        {props.vacation.price}$
                    </div>
                    <button className="Edit"><NavLink to={"/update-vacation/" + props.vacation.vacationId}>🖊</NavLink></button>
                    <button onClick={deleteMe} className="Delete">✖</button>
                    <div className="Dates">
                        📅 {formatDate(props.vacation.startDate) + "  -  "}
                        {formatDate(props.vacation.endDate)}
                    </div>
                    <div className="Destination">
                        {props.vacation.destination}
                    </div>
                    <div className="Bio">
                        {props.vacation.description}
                    </div>
                </>
            }
        </div >
    );
}

export default VacationCard;
