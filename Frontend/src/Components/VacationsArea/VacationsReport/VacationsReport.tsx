import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CanvasJSReact from '../../../Assets/canvasjs.react';
import UserModel from '../../../Models/UserModel';
import VacationModel from '../../../Models/VacationModel';
import { authStore } from '../../../Redux/AuthState';
import userServices from '../../../Services/UserServices';
import notify from '../../../Utils/Notify';
import Login from '../../AuthArea/Login/Login';
import Home from '../../HomeArea/Home/Home';
import CsvCreator from '../CsvCreator/CsvCreator';
import VacationsList from '../VacationsList/VacationsList';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJS = CanvasJSReact.CanvasJS;

const addSymbols = (e: any) => {
    const suffixes = ["", "K", "M", "B"];
    let order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1)
        order = suffixes.length - 1;
    const suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
}

const VacationsReport = () => {


    // Users---------------------------------------------------------------------------
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    // User UseEffect
    useEffect(() => {
        // If not user - navigate to login:
        if (!authStore.getState().user) {
            navigate("/login")
        }
        setUser(authStore.getState().user);
        // Listen to AuthState changes + unsubscribe:
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, []);


    function redirect() {
        navigate("/vacations-list");
    }



    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [options, setOptions] = useState<any>(null);

    // Vacations use effect
    useEffect(() => {
        userServices.getAllVacations()
            .then(vacations => {
                setVacations(vacations);
                const dataPoints = vacations.map(v => ({ y: v.followersCount, label: v.destination }));
                dataPoints.sort((a, b) => b.y - a.y); // sort the array in descending order
                const options = {
                    backgroundColor: "rgb(100, 136, 177)",
                    animationEnabled: true,
                    theme: "light1",

                    textAlign: "center",
                    title: {
                        text: "Vacations Popularity Statistics",
                        fontColor: "White",
                        fontFamily: "titillium"
                    },
                    axisX: {
                        title: "List of Vacation",
                        titleFontColor: "white",
                        titleFontFamily: "titillium",
                        reversed: true,
                        interval: 1 //Every Label
                    },
                    axisY: {
                        title: "Number of likes",
                        titleFontColor: "white",
                        titleFontFamily: "titillium",
                        labelFormatter: addSymbols,
                        interval: 1, // Like must only be decimal
                    },
                    data: [{
                        type: "bar",
                        vertical: true,
                        dataPoints: dataPoints,
                    }]
                };
                return options;
            })
            .then(options => {
                // Update the options object with the new data points
                setOptions(options);
            })
            .catch(err => notify.error(err));
    }, []);


    return (
        <div className='VacationsReport'>
            <div className="VacationsReportContainer">
                {/* If not user - go to login */}
                {!user && <Login />}

                {user && user.role === "User" && <>
                    {redirect()}
                </>}

                {user && user.role === "Admin" && <>
                    <CsvCreator />
                    {options && <CanvasJSChart options={options} />}
                </>}
            </div>
        </div>
    );
}

export default VacationsReport;