

class AppConfig {
    public port = 4000;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacationsDatabase"; // Fill in the database name
    public vacationImagesAddress = `http://localhost:${this.port}/api/vacations/images/`;
}

const appConfig = new AppConfig();

export default appConfig;
