"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    calculateChildcareSubsidy,
    ChildcareSubsidyChildren,
} from "@/features/tools/lib/childcare-subsidy";
import { ToolData } from ".";
import { calculateEffectiveTaxRate, calculateTax } from "@/lib/tax";
import { Field, FieldLabel } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";

function ChildcareSubsidyCalculator({
    title,
    description,
}: Pick<ToolData, "title" | "description">) {
    const [children, setChildren] = useState<ChildcareSubsidyChildren>("one");
    const [daysWorked, setDaysWorked] = useState(3);
    const [primaryIncome, setPrimaryIncome] = useState(90000);
    const [secondaryIncome, setSecondaryIncome] = useState(90000);
    const [childCareDayRate, setChildCareDayRate] = useState(180);
    const weightedIncome = Math.round(daysWorked * 0.2 * secondaryIncome);
    const taxOnIncome = calculateTax(secondaryIncome);
    const taxRate = calculateEffectiveTaxRate(secondaryIncome);
    const subsidyPercentage = calculateChildcareSubsidy(
        primaryIncome + weightedIncome,
        children,
    );
    const childCareDayRateWithSubsidy = Math.round(
        childCareDayRate - (childCareDayRate * subsidyPercentage) / 100,
    );
    const yearlyCost = childCareDayRateWithSubsidy * daysWorked * 52;

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <Field>
                    <FieldLabel htmlFor="daysWorked">
                        Number of days worked
                    </FieldLabel>
                    <Select
                        value={daysWorked}
                        onValueChange={(value) => setDaysWorked(value!)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel htmlFor="primaryIncome">
                        Primary Income
                    </FieldLabel>
                    <Input
                        id="primaryIncome"
                        value={primaryIncome}
                        onChange={(e) =>
                            setPrimaryIncome(parseInt(e.target.value))
                        }
                        type="number"
                        min={0}
                        max={10000000}
                        step={1000}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="secondaryIncome">
                        Secondary Income (if full time)
                    </FieldLabel>
                    <Input
                        id="secondaryIncome"
                        value={secondaryIncome}
                        onChange={(e) =>
                            setSecondaryIncome(parseInt(e.target.value))
                        }
                        type="number"
                        min={0}
                        max={10000000}
                        step={1000}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="childCareDayRate">
                        Child Care Day Rate
                    </FieldLabel>
                    <Input
                        id="childCareDayRate"
                        value={childCareDayRate}
                        onChange={(e) =>
                            setChildCareDayRate(parseInt(e.target.value))
                        }
                        type="number"
                        min={100}
                        max={300}
                        step={10}
                    />
                </Field>
                <Field>
                    <Label htmlFor="children">Number of children</Label>
                    <Select
                        value={children}
                        onValueChange={(value) =>
                            setChildren(value as ChildcareSubsidyChildren)
                        }
                    >
                        <SelectTrigger id="children">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="one">One child</SelectItem>
                            <SelectItem value="more">
                                More than one child
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
                <div className="flex flex-row gap-4 text-center">
                    <div className="flex flex-1 flex-col justify-center gap-2">
                        <div>Child Care Subsidy Rate</div>
                        <Heading>{subsidyPercentage}%</Heading>
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-2">
                        <div>Yearly Child Care Cost</div>
                        <Heading>${yearlyCost}</Heading>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export { ChildcareSubsidyCalculator };
