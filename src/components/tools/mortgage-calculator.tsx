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
import { Line } from "@/components/line";
import { calculatePaymentSet, getTableData } from "@/lib/mortgage";
import { Fragment, unstable_ViewTransition as ViewTransition } from "react";
import { MORTGAGE_CALCULATOR } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
        {
            interestRate: 4.8,
            payment: 5000,
            offset: 0,
        },
        {
            interestRate: 5,
            payment: 5000,
            offset: 10000,
        },
    ]);

    const paymentSets = values.map((value) =>
        calculatePaymentSet(
            principal,
            value.interestRate,
            value.payment,
            value.offset,
        ),
    );

    console.log(paymentSets);

    const maxSetLength = Math.max(
        ...paymentSets.map((paymentSet) => paymentSet.length),
    );

    const tableData = getTableData(paymentSets);
    return (
        <ViewTransition name={`${MORTGAGE_CALCULATOR.slug}-card`}>
            <Card className="mx-auto w-full">
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
                            onChange={(e) =>
                                setPrincipal(parseInt(e.target.value))
                            }
                            type="number"
                            min={0}
                            max={10000000}
                            step={1000}
                        />
                    </div>
                    {values.map((value, index) => (
                        <Fragment key={index}>
                            <div className="flex flex-row items-end gap-2">
                                <div className="flex flex-col gap-2">
                                    <Label>Interest Rate</Label>
                                    <Input
                                        value={
                                            isNaN(value.interestRate)
                                                ? ""
                                                : value.interestRate
                                        }
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
                                        value={
                                            isNaN(value.payment)
                                                ? ""
                                                : value.payment
                                        }
                                        onChange={(e) => {
                                            setValues(
                                                values.map((v, i) =>
                                                    i === index
                                                        ? {
                                                              ...v,
                                                              payment: parseInt(
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
                                        max={100000}
                                        step={100}
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-2">
                                    <Label>Offset</Label>
                                    <Input
                                        value={
                                            isNaN(value.offset)
                                                ? ""
                                                : value.offset
                                        }
                                        onChange={(e) => {
                                            setValues(
                                                values.map((v, i) =>
                                                    i === index
                                                        ? {
                                                              ...v,
                                                              offset: parseInt(
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
                                            values.filter(
                                                (_, i) => i !== index,
                                            ),
                                        )
                                    }
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </Fragment>
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
                                                ? values[values.length - 1]
                                                      .payment
                                                : 5000,
                                        offset:
                                            values.length > 0
                                                ? values[values.length - 1]
                                                      .offset
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
                            paymentSets={paymentSets}
                            maxSetLength={maxSetLength}
                        />
                    ) : null}
                    <Table className="mb-6">
                        <TableHeader>
                            <TableRow>
                                <TableCell>Years to 0</TableCell>
                                <TableCell>Interest Paid</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tableData.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell>{`${data.yearsToZero} years ${data.monthsToZero} months`}</TableCell>
                                    <TableCell>
                                        {data.interestPaid.toFixed(0)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </ViewTransition>
    );
}

export { MortgageCalculator };
