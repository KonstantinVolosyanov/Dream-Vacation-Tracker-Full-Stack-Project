class AppConfig {
    
    public adminVacationsUrl = "http://localhost:4000/api/admin/vacations/";
    public userVacationsUrl = "http://localhost:4000/api/user/vacations/";
    public userFollowUrl = "http://localhost:4000/api/user/follow/";
    public userUnfollowUrl = "http://localhost:4000/api/user/unfollow/";
    public registerUrl = "http://localhost:4000/api/auth/register/";
    public loginUrl = "http://localhost:4000/api/auth/login/";

}

const appConfig = new AppConfig();

export default appConfig;
