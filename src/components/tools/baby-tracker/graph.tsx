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
    type: "feeding" | "pooping" | "wee" | "sleeping";
    time: Date;
    startTime?: Date;
    endTime?: Date;
    notes?: string;
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
            (activity) => new Date(activity.time) >= sevenDaysAgo,
        );

        const sortedActivities = [...filteredActivities].sort(
            (a, b) =>
                new Date(a.time).getTime() -
                new Date(b.time).getTime(),
        );

        const labels = [
            ...new Set(
                sortedActivities.map((activity) =>
                    new Date(activity.time).toLocaleDateString(),
                ),
            ),
        ];

        const datasets = (["feeding", "pooping", "wee", "sleeping"] as const).map(
            (type) => {
                const data = labels.map((label) => {
                    if (type === "sleeping") {
                        return sortedActivities
                            .filter(
                                (activity) =>
                                    new Date(
                                        activity.time,
                                    ).toLocaleDateString() === label &&
                                    activity.type === type,
                            )
                            .reduce((total, activity) => {
                                if (activity.startTime && activity.endTime) {
                                    const diff =
                                        new Date(activity.endTime).getTime() -
                                        new Date(activity.startTime).getTime();
                                    return total + diff / (1000 * 60 * 60); // convert to hours
                                }
                                return total;
                            }, 0);
                    }
                    return sortedActivities.filter(
                        (activity) =>
                            new Date(activity.time).toLocaleDateString() ===
                                label && activity.type === type,
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
                              : type === "wee"
                                ? `hsl(${cssVar("--chart-3")})`
                                : `hsl(${cssVar("--chart-4")})`,
                    yAxisID: type === "sleeping" ? "y1" : "y",
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
                text: "Daily Totals",
            },
        },
        scales: {
            y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
                title: {
                    display: true,
                    text: "Count",
                },
                min: 0,
                ticks: {
                    stepSize: 1,
                },
            },
            y1: {
                type: "linear" as const,
                display: true,
                position: "right" as const,
                title: {
                    display: true,
                    text: "Hours",
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
            },
        },
    };

    return <Line options={options} data={data} />;
}
