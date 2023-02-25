import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthServices";
import notify from "../../../Utils/Notify";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notify.success("Welcome " + user.firstName);
            navigate("/vacations-list");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Register">


            <form className="AuthForm" onSubmit={handleSubmit(send)}>
                <h1>Register</h1>

                <label>First name: </label>
                <input type="text" {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Err">{formState.errors.firstName?.message}</span>

                <label>Last name: </label>
                <input type="text" {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Err">{formState.errors.lastName?.message}</span>

                <label>Email: </label>
                <input type="email" {...register("email", UserModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password", UserModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <button>Register</button>
                <p>I already registered, please <NavLink to={"/login"}>Login</NavLink></p>

            </form>

        </div>
    );
}

export default Register;
