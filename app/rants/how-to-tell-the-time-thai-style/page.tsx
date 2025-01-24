import ThaiTimeConverter from "@/components/thai-time-converter";
import Blog, { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { HOW_TO_TELL_THE_TIME_THAI_STYLE } from "@/data/blog";
import { Metadata } from "next";

export const metadata: Metadata = HOW_TO_TELL_THE_TIME_THAI_STYLE;

function HowToTellTheTimeThaiStyle() {
    return (
        <Blog
            title={HOW_TO_TELL_THE_TIME_THAI_STYLE.title}
            date={HOW_TO_TELL_THE_TIME_THAI_STYLE.date}
            slug={HOW_TO_TELL_THE_TIME_THAI_STYLE.slug}
        >
            <BlogParagraph>
                Thai people use a different system to tell the time compared to
                the Western system. The day is divided into four parts: morning,
                afternoon, evening, and night.
            </BlogParagraph>
            <BlogHeading>Before sunrise</BlogHeading>
            <BlogParagraph>
                Before 6am, Thai use “ตี___” for early morning time.
            </BlogParagraph>
            <BlogHeading>After sunrise</BlogHeading>
            <BlogParagraph>
                After the sun rises, Thai use “___โมงเช้า” for morning time.
            </BlogParagraph>
            <BlogHeading>After noon</BlogHeading>
            <BlogParagraph>
                From 1-4pm, Thai use “บ่าย___โมง” for afternoon time.
            </BlogParagraph>
            <BlogHeading>Late afternoon</BlogHeading>
            <BlogParagraph>
                Between 5-6pm, Thai use “บ่าย___เย็น” for late afternoon time.
            </BlogParagraph>
            <BlogHeading>Evening</BlogHeading>
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
                        <TableCell>12 p.m. (noon)</TableCell>
                        <TableCell>เที่ยง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1 p.m.</TableCell>
                        <TableCell>บ่ายโมง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2 p.m.</TableCell>
                        <TableCell>บ่ายสองโมง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3 p.m.</TableCell>
                        <TableCell>บ่ายสามโมง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>4 p.m.</TableCell>
                        <TableCell>บ่ายสี่โมง</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>5 p.m.</TableCell>
                        <TableCell>ห้าโมงเย็น</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>6 p.m.</TableCell>
                        <TableCell>หกโมงเย็น</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>7 p.m.</TableCell>
                        <TableCell>เจ็ดทุ่ม</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>8 p.m.</TableCell>
                        <TableCell>สองทุ่ม</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>9 p.m.</TableCell>
                        <TableCell>สามทุ่ม</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>10 p.m.</TableCell>
                        <TableCell>สี่ทุ่ม</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>11 p.m.</TableCell>
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
