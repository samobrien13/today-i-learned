"use client";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { cssVar } from "@/lib/colours";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

type Activity = {
    id: string;
    type: "feeding" | "pooping" | "wee";
    timestamp: Date;
};

type BabyTrackerGraphProps = {
    activities: Activity[];
};

export default function BabyTrackerGraph({
    activities,
}: BabyTrackerGraphProps) {
    const processData = () => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const filteredActivities = activities.filter(
            (activity) => new Date(activity.timestamp) >= sevenDaysAgo,
        );

        const sortedActivities = [...filteredActivities].sort(
            (a, b) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime(),
        );

        const labels = [
            ...new Set(
                sortedActivities.map((activity) =>
                    new Date(activity.timestamp).toLocaleDateString(),
                ),
            ),
        ];

        const datasets = (["feeding", "pooping", "wee"] as const).map(
            (type) => {
                const data = labels.map((label) => {
                    return sortedActivities.filter(
                        (activity) =>
                            new Date(
                                activity.timestamp,
                            ).toLocaleDateString() === label &&
                            activity.type === type,
                    ).length;
                });

                return {
                    label: type.charAt(0).toUpperCase() + type.slice(1),
                    data: data,
                    borderColor:
                        type === "feeding"
                            ? `hsl(${cssVar("--chart-1")})`
                            : type === "pooping"
                              ? `hsl(${cssVar("--chart-2")})`
                              : `hsl(${cssVar("--chart-3")})`,
                };
            },
        );

        return {
            labels,
            datasets,
        };
    };

    const data = processData();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Daily Running Totals",
            },
        },
        scales: {
            y: {
                min: 0,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return <Line options={options} data={data} />;
}
