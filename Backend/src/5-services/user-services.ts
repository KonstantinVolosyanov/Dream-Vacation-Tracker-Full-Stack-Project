import dal from "../2-utils/dal";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";



//Get All Vacations:
async function getAllVacationsForUser(user: UserModel): Promise<VacationModel[]> {   
    // Create sql query:
    const sql = `
        SELECT DISTINCT 
            V.*,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount
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

/// ------ TODO: do not accept follow two times for same user for same vacation!

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
    getAllVacationsForUser,
    follow,
    unfollow
}