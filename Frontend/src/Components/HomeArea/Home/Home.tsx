import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";


function Home(): JSX.Element {

    // User Use State:
    const [user, setUser] = useState<UserModel>();

    //Use Navigate:
    const navigate = useNavigate();

    // Set user and subscribe for changes:
    useEffect(() => {

        setUser(authStore.getState().user);
        // Listen to AuthState changes:
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
            if (!authStore.getState().user) {
                navigate("/login");
            }
        });
        return unsubscribe
    }, []);



    return (
        <div className="Home">
            <>
                {/* If user - Vacation List */}
                {user && <VacationsList />}
                {/* If not user - go to login */}
                {!user && <Login />}
            </>
        </div >
    );
}

export default Home;
