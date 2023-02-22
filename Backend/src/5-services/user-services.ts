import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";



//Get All Vacations:
async function getAllVacations(user: UserModel): Promise<VacationModel[]> {
    // Create sql query:
    const sql = `
        SELECT DISTINCT 
            V.*,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount,
            CONCAT('${appConfig.vacationImagesAddress}', imageName) AS imageUrl
        FROM vacations AS V LEFT JOIN followers As F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startDate    
    `;
    //Execute query:
    const vacations = await dal.execute(sql, user.userId);

    // return vacations:
    return vacations;

}

// Follow Vacation
async function follow(userId: number, vacationId: number): Promise<void> {
    // Create sql query:
    const sql = "INSERT INTO followers VALUES( ?, ?)"
    // Execute sql query
    await dal.execute(sql, userId, vacationId);
    
}


// Unfollow Vacation
async function unfollow(userId: number, vacationId: number): Promise<void> {
    // Create sql query:
    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
    // Execute sql query
    await dal.execute(sql, userId, vacationId);

}


export default {
    getAllVacations,
    follow,
    unfollow
}