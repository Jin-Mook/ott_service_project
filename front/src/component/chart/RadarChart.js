import { useState } from "react";
import { Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const options = {
    legend: {
        display: true,
        labels: {
            fontSize: 5,
            fontColor: "#263238",
            generateLabels: function (chart) {
                const labels =
                    Chart.defaults.global.legend.labels.generateLabels(chart);
                return labels.map((property) => {
                    return { ...property, fillStyle: property.strokeStyle };
                });
            },
        },
        position: "bottom",
        align: "start",
    },
    animation: {
        duration: 2000,
    },
    elements: {
        point: {
            radius: 1.2,
        },
    },

    scale: {
        ticks: {
            beginAtZero: true,
            max: 1,
            min: 0,
            stepSize: 0.2,
            showLabelBackdrop: false,
        },
    },
};

const RadarChart = ({ feat, name, beforefeat }) => {
    console.log(beforefeat.danceability);
    const [chartData, setChartData] = useState({
        labels: ["danceability", "energy", "tempo", "valence", "acousticness"],
        datasets: [
            {
                label: name,
                data: [
                    feat.danceability,
                    feat.energy,
                    feat.tempo,
                    feat.valence,
                    feat.acousticness,
                ],
                backgroundColor: "rgba(243, 229, 185, 0.2)",
                borderColor: "rgb(65, 153, 0)",
                borderWidth: 1.5,
            },
            {
                label: "취향음악",
                data: [
                    beforefeat.danceability,
                    beforefeat.energy,
                    beforefeat.tempo,
                    beforefeat.valence,
                    beforefeat.acousticness,
                ],
                backgroundColor: "rgba(223, 219, 115, 0.2)",
                borderColor: "rgb(255, 183, 0)",
                borderWidth: 1.5,
            },
        ],
    });

    return (
        <div
            style={{
                background: "none",
                padding: "30px 0 20px",
                width: "300px",
            }}
        >
            <Radar data={chartData} options={options} />
        </div>
    );
};

export default RadarChart;
