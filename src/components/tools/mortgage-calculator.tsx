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
import { Input } from "@/components/ui/input";
import calculateMortgage from "@/lib/mortgage";
import { Line } from "react-chartjs-2";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";
import { cssVar } from "@/constants/colours";
import { MORTGAGE_CALCULATOR } from "@/data/tools";
import { Button } from "../ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function MortgageCalculator() {
    const [principal, setPrincipal] = useLocalStorage(
        "mortgage:principal",
        500000,
    );
    const [values, setValues] = useLocalStorage("mortgage:values", [
        {
            interestRate: 5,
            payment: 5000,
            offset: 0,
        },
    ]);

    const paymentSets = values.map((value) =>
        calculateMortgage(
            principal,
            value.interestRate,
            value.payment,
            value.offset,
        ),
    );

    const datasets = paymentSets.map((paymentSet, index) => ({
        label: `Interest Rate ${index + 1}`,
        data: paymentSet,
        borderColor: `hsl(${cssVar(`--chart-${index + 1}`)})`,
        backgroundColor: `hsl(${cssVar(`--chart-${index + 1}`)}`,
        pointRadius: 0,
        fill: false,
        tension: 0.1,
    }));

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
                <div className="flex flex-col gap-2">
                    <Label>Principal</Label>
                    <Input
                        value={principal}
                        onChange={(e) => setPrincipal(parseInt(e.target.value))}
                        type="number"
                        min={0}
                        max={10000000}
                        step={1000}
                    />
                </div>
                {values.map((value, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-row items-end gap-2">
                            <div className="flex flex-col gap-2">
                                <Label>Interest Rate</Label>
                                <Input
                                    value={value.interestRate}
                                    onChange={(e) => {
                                        setValues(
                                            values.map((v, i) =>
                                                i === index
                                                    ? {
                                                          ...v,
                                                          interestRate:
                                                              parseFloat(
                                                                  e.target
                                                                      .value,
                                                              ),
                                                      }
                                                    : v,
                                            ),
                                        );
                                    }}
                                    type="number"
                                    min={0}
                                    max={100}
                                    step={0.01}
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                                <Label>Monthly Payment</Label>
                                <Input
                                    value={value.payment}
                                    onChange={(e) => {
                                        setValues(
                                            values.map((v, i) =>
                                                i === index
                                                    ? {
                                                          ...v,
                                                          payment: parseInt(
                                                              e.target.value,
                                                          ),
                                                      }
                                                    : v,
                                            ),
                                        );
                                    }}
                                    type="number"
                                    min={0}
                                    max={100000}
                                    step={100}
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                                <Label>Offset</Label>
                                <Input
                                    value={value.offset}
                                    onChange={(e) => {
                                        setValues(
                                            values.map((v, i) =>
                                                i === index
                                                    ? {
                                                          ...v,
                                                          offset: parseInt(
                                                              e.target.value,
                                                          ),
                                                      }
                                                    : v,
                                            ),
                                        );
                                    }}
                                    type="number"
                                    min={0}
                                    max={principal}
                                    step={1000}
                                />
                            </div>
                            <Button
                                size="icon"
                                disabled={values.length === 1}
                                variant="outline"
                                onClick={() =>
                                    setValues(
                                        values.filter((_, i) => i !== index),
                                    )
                                }
                            >
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </React.Fragment>
                ))}
                {values.length < 5 ? (
                    <Button
                        onClick={() =>
                            setValues([
                                ...values,
                                {
                                    interestRate:
                                        values.length > 0
                                            ? values[values.length - 1]
                                                  .interestRate
                                            : 5,
                                    payment:
                                        values.length > 0
                                            ? values[values.length - 1].payment
                                            : 5000,
                                    offset:
                                        values.length > 0
                                            ? values[values.length - 1].offset
                                            : 0,
                                },
                            ])
                        }
                    >
                        Add <PlusIcon className="h-4 w-4" />
                    </Button>
                ) : null}
                {paymentSets.length > 0 ? (
                    <Line
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
                                },
                                x: {
                                    grid: {
                                        color: `hsl(${cssVar("--muted-foreground")})`,
                                    },
                                    ticks: {
                                        color: `hsl(${cssVar("--card-foreground")})`,
                                        maxTicksLimit:
                                            paymentSets[0].length / 12,
                                        stepSize: 12,
                                    },
                                },
                            },
                        }}
                        data={{
                            labels: paymentSets[0].map((_, index) =>
                                Math.floor(index / 12),
                            ),
                            datasets,
                        }}
                        height={300}
                        width={300}
                    />
                ) : null}
            </CardContent>
        </Card>
    );
}

export { MortgageCalculator };
