"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
    calculateChildcareSubsidy,
    ChildcareSubsidyChildren,
} from "@/features/tools/lib/childcare-subsidy";
import { ToolData } from ".";

const MIN_INCOME = 0;
const MAX_INCOME = 600000;
const STEP_INCOME = 1000;

function ChildcareSubsidyCalculator({ title, description }: ToolData) {
    const [income, setIncome] = useState(88520);
    const [children, setChildren] = useState<ChildcareSubsidyChildren>("one");

    const subsidy = calculateChildcareSubsidy(income, children);

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="income">Combined household income</Label>
                    <Input
                        id="income"
                        type="number"
                        min={MIN_INCOME}
                        max={MAX_INCOME}
                        step={STEP_INCOME}
                        value={isNaN(income) ? "" : income}
                        onChange={(e) =>
                            setIncome(parseInt(e.target.value, 10))
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="income-slider">Income</Label>
                    <Slider
                        id="income-slider"
                        value={[income]}
                        min={MIN_INCOME}
                        max={MAX_INCOME}
                        step={STEP_INCOME}
                        onValueChange={(value) =>
                            setIncome(Array.isArray(value) ? value[0] : value)
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
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
                </div>
                <Heading>{`${subsidy}%`}</Heading>
            </CardContent>
        </Card>
    );
}

export { ChildcareSubsidyCalculator };
