"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useTheme } from "next-themes";
import { keys } from "@/lib/colours";

function Colours() {
    const { resolvedTheme: theme } = useTheme();
    const [prevTheme, setPrevTheme] = useState<string>();

    if (theme !== prevTheme) {
        setPrevTheme(theme);
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Colour</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from(keys).map((color) => (
                        <TableRow key={color} suppressHydrationWarning>
                            <TableCell>{color}</TableCell>
                            <TableCell>
                                <div
                                    className="h-8 w-8 rounded-md"
                                    style={{
                                        backgroundColor: `var(--${color})`,
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export { Colours };
