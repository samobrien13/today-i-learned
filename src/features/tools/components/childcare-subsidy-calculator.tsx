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
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";

function ChildcareSubsidyCalculator({
    title,
    description,
}: Pick<ToolData, "title" | "description">) {
    const [children, setChildren] = useState<ChildcareSubsidyChildren>("one");
    const [childCareDays, setChildCareDays] = useState(3);
    const [primaryIncome, setPrimaryIncome] = useState(90000);
    const [secondaryIncome, setSecondaryIncome] = useState(90000);
    const [childCareDayRate, setChildCareDayRate] = useState(180);
    const subsidyPercentage = calculateChildcareSubsidy(
        primaryIncome + secondaryIncome,
        children,
    );
    const childCareDayRateWithSubsidy = Math.round(
        childCareDayRate - (childCareDayRate * subsidyPercentage) / 100,
    );
    const yearlyCost = childCareDayRateWithSubsidy * childCareDays * 52;

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <Field className="flex-1">
                    <FieldLabel htmlFor="children">
                        Number of children under 5
                    </FieldLabel>
                    <Select
                        value={children}
                        onValueChange={(value) => setChildren(value!)}
                    >
                        <SelectTrigger id="children">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="one">One</SelectItem>
                            <SelectItem value="more">More than one</SelectItem>
                        </SelectContent>
                    </Select>
                    <FieldDescription>
                        Affects subsidy percentage
                    </FieldDescription>
                </Field>
                <div className="flex flex-col gap-4 md:flex-row">
                    <Field className="flex-2">
                        <FieldLabel htmlFor="childCareDays">
                            Days of child care
                        </FieldLabel>
                        <Input
                            id="childCareDays"
                            value={childCareDays}
                            onChange={(e) =>
                                setChildCareDays(parseInt(e.target.value))
                            }
                            type="number"
                            min={1}
                            max={20}
                            step={1}
                        />
                        <FieldDescription>
                            Total days per week of child care used for all
                            children
                        </FieldDescription>
                    </Field>
                    <Field className="flex-1">
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
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                    <Field className="flex-1">
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
                    <Field className="flex-1">
                        <FieldLabel htmlFor="secondaryIncome">
                            Secondary Income
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
                </div>
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
