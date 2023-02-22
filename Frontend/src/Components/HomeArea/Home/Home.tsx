import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import "./Home.css";


function Home(): JSX.Element {


    // const [user, setUser] = useState<UserModel>();
    // const navigate = useNavigate();

    // useEffect(() => {

    //     setUser(authStore.getState().user);
    //     // Listen to AuthState changes:
    //     const unsubscribe = authStore.subscribe(() => {
    //         setUser(authStore.getState().user);
    //     });
    //     return unsubscribe
    // }, []);




    return (
        <div className="Home">
            {/* {!user && <>

                {navigate("/login")}

            </>} */}

            {/* {user && <> */}

            <VacationsList />

            {/* </>} */}
        </div >
    );
}

export default Home;
