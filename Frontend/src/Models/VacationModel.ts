import { RegisterOptions } from "react-hook-form";


class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageUrl: string;
    public imageName: string;
    public image?: File;
    public isFollowing: boolean;
    public followersCount?: number;


    // Destination Validation:
    public static destinationValidation: RegisterOptions = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 3, message: "Destination must be minimum 3 chars" },
        maxLength: { value: 1000, message: "Destination can't exceeds 50 chars" },

    };

    // Description Validation:
    public static descriptionValidation: RegisterOptions = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 2, message: "Description must be minimum 2 chars" },
        maxLength: { value: 1000, message: "Description can't exceeds 1000 chars" },

    };

    // Start Date Validation:
    public static startDateValidation: RegisterOptions = {
        required: { value: true, message: "Missing start date" },
        //TODO = DATE VALIDATION!!!
    };

    // End Date Validation:
    public static endDateValidation: RegisterOptions = {
        required: { value: true, message: "Missing end date" },
    };

    // Price Validation:
    public static priceValidation: RegisterOptions = {
        required: { value: true, message: "Missing price" },
        min: { value: 0, message: "Price must be positive" },
        max: { value: 10000, message: "Price can't exceeds 10.000" }

    };

    // Image post Validation:
    public static imageValidation: RegisterOptions = {
        required: { value: true, message: "Missing image" }
    };
    
    // Image put Validation:
    public static imagePutValidation: RegisterOptions = {

    };


}

export default VacationModel;