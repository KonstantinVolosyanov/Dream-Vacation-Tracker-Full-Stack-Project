import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    public email: string;
    public password: string;


    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }


    // Validation
    private static validationSchema = Joi.object({
        email: Joi.string().email().required().min(2).max(30),
        password: Joi.string().required().min(4).max(30)
    })


    public validate(): void {
        const result = CredentialsModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}


export default CredentialsModel;
