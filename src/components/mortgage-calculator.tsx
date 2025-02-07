"use client";

import useLocalStorage from "@/hooks/use-local-storage";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MORTGAGE_CALCULATOR } from "@/data/tools";
import { Input } from "./ui/input";
import calculateMortgage from "@/lib/mortgage";
import { Line } from "react-chartjs-2";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
} from "chart.js";
import { cssVar } from "@/constants/colours";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
);

export default function MortgageCalculator() {
    const [interestRate, setInterestRate] = useLocalStorage(
        "mortgage:interestRate",
        5,
    );
    const [principal, setPrincipal] = useLocalStorage(
        "mortgage:principal",
        500000,
    );
    const [payment, setPayment] = useLocalStorage("mortgage:payment", 5000);

    const payments = calculateMortgage(interestRate, principal, payment);

    const yearsToPayOff = Math.floor(payments.length / 12);
    const monthsToPayOff = payments.length % 12;

    return (
        <Card
            className="mx-auto w-full"
            style={{
                viewTransitionName: `${MORTGAGE_CALCULATOR.slug}-card`,
            }}
        >
            <CardHeader>
                <CardTitle>{MORTGAGE_CALCULATOR.title}</CardTitle>
                <CardDescription>
                    {MORTGAGE_CALCULATOR.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex w-full flex-col gap-4">
                <Label>Interest Rate</Label>
                <Input
                    value={interestRate}
                    onChange={(e) =>
                        setInterestRate(parseFloat(e.target.value))
                    }
                    type="number"
                    min={0}
                    max={100}
                    step={0.01}
                />
                <Label>Principal</Label>
                <Input
                    value={principal}
                    onChange={(e) => setPrincipal(parseInt(e.target.value))}
                    type="number"
                    min={0}
                    max={10000000}
                    step={1000}
                />
                <Label>Monthly Payment</Label>
                <Input
                    value={payment}
                    onChange={(e) => setPayment(parseInt(e.target.value))}
                    type="number"
                    min={0}
                    max={100000}
                    step={100}
                />
                <Line
                    className="py-4"
                    title="Years to 0"
                    options={{
                        scales: {
                            x: {
                                ticks: {
                                    maxTicksLimit: payments.length / 12,
                                    stepSize: 12,
                                },
                            },
                        },
                    }}
                    data={{
                        labels: payments.map((_, index) =>
                            Math.floor(index / 12),
                        ),
                        datasets: [
                            {
                                label: "Principal",
                                data: payments,
                                borderColor: `hsl(${cssVar("--chart-2")})`,
                                backgroundColor: `hsla(${cssVar("--chart-2")}`,
                                pointRadius: 0,
                                fill: false,
                                tension: 0.1,
                            },
                        ],
                    }}
                    height={300}
                    width={300}
                />
                <p>
                    {yearsToPayOff} years
                    {monthsToPayOff > 0 && `, ${monthsToPayOff} months`}
                </p>
            </CardContent>
        </Card>
    );
}
