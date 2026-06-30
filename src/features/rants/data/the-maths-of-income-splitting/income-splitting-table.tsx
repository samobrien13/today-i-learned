import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { calculateEffectiveTaxRate, calculateTax } from "@/lib/tax";

function IncomeSplittingTable() {
    return (
        <Table className="mb-6">
            <TableHeader>
                <TableRow>
                    <TableHead>Total Income</TableHead>
                    <TableHead>Total Tax without income split</TableHead>
                    <TableHead>
                        Effective tax rate without income split
                    </TableHead>
                    <TableHead>Total Tax with income split</TableHead>
                    <TableHead>Effective tax rate with income split</TableHead>
                    <TableHead>Absolute Savings</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>$80,000</TableCell>
                    <TableCell>{`$${calculateTax(80000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(80000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(40000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(40000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(80000) - calculateTax(40000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$100,000</TableCell>
                    <TableCell>{`$${calculateTax(100000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(100000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(50000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(50000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(100000) - calculateTax(50000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$120,000</TableCell>
                    <TableCell>{`$${calculateTax(120000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(120000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(60000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(60000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(120000) - calculateTax(60000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$140,000</TableCell>
                    <TableCell>{`$${calculateTax(140000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(140000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(70000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(70000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(140000) - calculateTax(70000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$160,000</TableCell>
                    <TableCell>{`$${calculateTax(160000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(160000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(80000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(80000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(160000) - calculateTax(80000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$180,000</TableCell>
                    <TableCell>{`$${calculateTax(180000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(180000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(90000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(90000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(180000) - calculateTax(90000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$200,000</TableCell>
                    <TableCell>{`$${calculateTax(200000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(200000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(100000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(100000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(200000) - calculateTax(100000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$220,000</TableCell>
                    <TableCell>{`$${calculateTax(220000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(220000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(110000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(110000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(220000) - calculateTax(110000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$240,000</TableCell>
                    <TableCell>{`$${calculateTax(240000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(240000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(120000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(120000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(240000) - calculateTax(120000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$260,000</TableCell>
                    <TableCell>{`$${calculateTax(260000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(260000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(130000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(130000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(260000) - calculateTax(130000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$280,000</TableCell>
                    <TableCell>{`$${calculateTax(280000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(280000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(140000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(140000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(280000) - calculateTax(140000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$300,000</TableCell>
                    <TableCell>{`$${calculateTax(300000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(300000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(150000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(150000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(300000) - calculateTax(150000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$320,000</TableCell>
                    <TableCell>{`$${calculateTax(320000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(320000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(160000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(140000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(320000) - calculateTax(160000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$340,000</TableCell>
                    <TableCell>{`$${calculateTax(340000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(340000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(170000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(170000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(340000) - calculateTax(170000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$360,000</TableCell>
                    <TableCell>{`$${calculateTax(360000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(360000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(180000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(180000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(360000) - calculateTax(180000) * 2}`}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>$380,000</TableCell>
                    <TableCell>{`$${calculateTax(380000)}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(380000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(190000) * 2}`}</TableCell>
                    <TableCell>{`${calculateEffectiveTaxRate(190000)}%`}</TableCell>
                    <TableCell>{`$${calculateTax(380000) - calculateTax(190000) * 2}`}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default IncomeSplittingTable;
