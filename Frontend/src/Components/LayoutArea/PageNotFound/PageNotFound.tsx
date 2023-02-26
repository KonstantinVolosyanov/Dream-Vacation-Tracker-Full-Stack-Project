import { NavLink } from "react-router-dom";
import "./PageNotFound.css";
import NotFoundImage from "../../../Assets/Images/pageNotFound4.png"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">

            <img src={NotFoundImage}></img>

            <h2>Try to find yourself one too, on our</h2>

            <button className="ButtonBack"><NavLink to={"/vacations-list"}>Vacations-List</NavLink></button>

        </div>
    );
}

export default PageNotFound;
