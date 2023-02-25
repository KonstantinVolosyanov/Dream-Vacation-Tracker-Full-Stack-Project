import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authServices from "../../../Services/AuthServices";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);

        // Listen to AuthState changes:
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, []);


    function logout(): void {
        authServices.logout();
    }


    return (
        <div className="AuthMenu">

            {!user && <>

                <span className="UserName">Hello Guest </span>
                <span className="Pipe"> | </span>

                <NavLink to="/login">Login</NavLink>

                <span className="Pipe"> | </span>

                <NavLink to="/register">Register</NavLink>

            </>}
            {user && <>

                <span>Hello {user.firstName} {user.lastName}<span className="Pipe"> | </span></span>

                <NavLink to="/home" onClick={logout}>Logout</NavLink>

            </>}

        </div>
    );
}

export default AuthMenu;
