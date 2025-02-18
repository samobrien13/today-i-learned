"use client";

import { Line as LineChart } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from "chart.js";
import { cssVar } from "@/constants/colours";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
);

type LineProps = {
    paymentSets: [number, number][][];
    maxSetLength: number;
};

function Line({ paymentSets, maxSetLength }: LineProps) {
    return (
        <LineChart
            redraw
            className="py-4"
            title="Years to 0"
            color="hsl(var(--chart-3))"
            options={{
                scales: {
                    y: {
                        grid: {
                            color: `hsl(${cssVar("--muted-foreground")})`,
                        },
                        ticks: {
                            color: `hsl(${cssVar("--card-foreground")})`,
                        },
                        min: 0,
                    },
                    x: {
                        grid: {
                            color: `hsl(${cssVar("--muted-foreground")})`,
                        },
                        ticks: {
                            color: `hsl(${cssVar("--card-foreground")})`,
                            maxTicksLimit: maxSetLength / 12,
                            stepSize: 12,
                        },
                    },
                },
            }}
            data={{
                labels: Array.from({ length: maxSetLength }).map((_, index) =>
                    Math.floor(index / 12),
                ),
                datasets: paymentSets.map((paymentSet, index) => ({
                    label: `Set ${index + 1}`,
                    data: paymentSet.map(([principal]) => principal),
                    borderColor: `hsl(${cssVar(`--chart-${index + 1}`)})`,
                    backgroundColor: `hsl(${cssVar(`--chart-${index + 1}`)}`,
                    pointRadius: 0,
                    fill: false,
                    tension: 0.1,
                })),
            }}
            height={300}
            width={300}
        />
    );
}

export { Line };
