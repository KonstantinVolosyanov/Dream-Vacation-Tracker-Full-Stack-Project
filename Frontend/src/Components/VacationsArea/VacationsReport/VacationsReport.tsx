import { useEffect, useState } from 'react';
import CanvasJSReact from '../../../Assets/canvasjs.react';
import VacationModel from '../../../Models/VacationModel';
import userServices from '../../../Services/UserServices';
import notify from '../../../Utils/Notify';
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

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [options, setOptions] = useState<any>(null);

    // Vacations use effect
    useEffect(() => {
        userServices.getAllVacations()
            .then(vacations => {
                setVacations(vacations);
                const dataPoints = vacations.map(v => ({ y: v.followersCount, label: v.destination }));
                const options = {
                    animationEnabled: true,
                    theme: "light2",
                    title: {
                        text: "Vacations Popularity"
                    },
                    axisX: {
                        title: "List of Vacation",
                        reversed: true,
                    },
                    axisY: {
                        title: "Following statistics of our vacations",
                        labelFormatter: addSymbols,
                        interval: 1
                    },
                    data: [{
                        type: "bar",
                        dataPoints: dataPoints
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
        <div>
            <h1>Popularity Statistics</h1>
            {options && <CanvasJSChart options={options} />}
        </div>
    );
}

export default VacationsReport;