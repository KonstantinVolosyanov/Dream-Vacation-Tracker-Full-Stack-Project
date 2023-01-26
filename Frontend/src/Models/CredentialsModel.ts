import { RegisterOptions } from "react-hook-form";

class CredentialsModel {

    public email: string;
    public password: string;


    // Email Validation:
    public static emailValidation: RegisterOptions = {
        required: { value: true, message: "Missing email" },
        minLength: { value: 8, message: "Email must be minimum 8 chars" },
        maxLength: { value: 30, message: "Email can't exceeds 30 chars" },

    };


    // Password Validation:
    public static passwordValidation: RegisterOptions = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 4, message: "Password must be minimum 4 chars" },
        maxLength: { value: 30, message: "Password can't exceeds 30 chars" }
    };
}


export default CredentialsModel;
