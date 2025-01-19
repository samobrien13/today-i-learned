import ThaiTimeConverter from "@/components/thai-time-converter";
import Blog, { BlogParagraph } from "@/components/ui/blog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to tell the time Thai style",
    description: "Learn how to tell the time Thai style",
};

function HowToTellTheTimeThaiStyle() {
    return (
        <Blog title="How to tell the time Thai style" date="2025-01-19">
            <BlogParagraph>
                Before 6am, Thai use “ตี___” for early morning time.
            </BlogParagraph>
            <BlogParagraph>
                After the sun rises, Thai use “___โมงเช้า” for morning time.
            </BlogParagraph>
            <BlogParagraph>
                From 1-4pm, Thai use “บ่าย___โมง” for afternoon time.
            </BlogParagraph>
            <BlogParagraph>
                Between 5-6pm, Thai use “บ่าย___เย็น” for evening time.
            </BlogParagraph>
            <BlogParagraph>
                After noon, Thai use “___ทุ่ม” for evening time.
            </BlogParagraph>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>1 a.m.</TableCell>
                        <TableCell>ตีหนึ่ง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2 a.m.</TableCell>
                        <TableCell>ตีสอง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3 a.m.</TableCell>
                        <TableCell>ตีสม</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>4 a.m.</TableCell>
                        <TableCell>ตีสี่</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>5 a.m.</TableCell>
                        <TableCell>ตีห้า</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>6 a.m.</TableCell>
                        <TableCell>หกโมงเช้า</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>7 a.m.</TableCell>
                        <TableCell>เจ็ดโมงเช้า</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>8 a.m.</TableCell>
                        <TableCell>แปดโมงเช้า</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>9 a.m.</TableCell>
                        <TableCell>เก้าโมงเช้า</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>10 a.m.</TableCell>
                        <TableCell>สิบโมงเช้า</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>11 a.m.</TableCell>
                        <TableCell>สิบเอ็ดโมงเช้า</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>12 BlogParagraph.m. (noon)</TableCell>
                        <TableCell>เที่ยง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1 BlogParagraph.m.</TableCell>
                        <TableCell>บ่ายโมง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2 BlogParagraph.m.</TableCell>
                        <TableCell>บ่ายสองโมง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3 BlogParagraph.m.</TableCell>
                        <TableCell>บ่ายสามโมง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>4 BlogParagraph.m.</TableCell>
                        <TableCell>บ่ายสี่โมง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>5 BlogParagraph.m.</TableCell>
                        <TableCell>ห้าโมงเย็น</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>6 BlogParagraph.m.</TableCell>
                        <TableCell>หกโมงเย็น</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>7 BlogParagraph.m.</TableCell>
                        <TableCell>เจ็ดทุ่ม</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>8 BlogParagraph.m.</TableCell>
                        <TableCell>สองทุ่ม</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>9 BlogParagraph.m.</TableCell>
                        <TableCell>สามทุ่ม</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>10 BlogParagraph.m.</TableCell>
                        <TableCell>สี่ทุ่ม</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>11 BlogParagraph.m.</TableCell>
                        <TableCell>ห้าทุ่ม</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>12 a.m. (midnight)</TableCell>
                        <TableCell>เที่ยงคืน</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <BlogParagraph>
                Use the Thai Time Converter to convert the time to practice
            </BlogParagraph>
            <ThaiTimeConverter />
        </Blog>
    );
}

export default HowToTellTheTimeThaiStyle;
