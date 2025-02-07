import { ThaiTimeConverter } from "@/components/tools/thai-time-converter";
import { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { BlogData } from "@/data/blog";

export const HOW_TO_TELL_THE_TIME_THAI_STYLE: BlogData = {
    title: "How to tell the time Thai style",
    description: "Learn how to tell the time Thai style",
    date: "2025-01-19",
    slug: "how-to-tell-the-time-thai-style",
    component: <HowToTellTheTimeThaiStyle />,
};

function HowToTellTheTimeThaiStyle() {
    return (
        <>
            <BlogParagraph>
                Thai people use a different system to tell the time compared to
                the Western system. The day is divided into four parts: morning,
                afternoon, evening, and night. The terms used are thought to
                have originated from the sounds of traditional timekeeping
                devices; a gong during the daytime and a drum during the night.
            </BlogParagraph>
            <BlogHeading>Before sunrise</BlogHeading>
            <BlogParagraph>
                Before 6am, Thai use ตี___ for early morning time. ตี means to
                hit or in this case to strike.
            </BlogParagraph>
            <BlogHeading>After sunrise</BlogHeading>
            <BlogParagraph>
                After the sun rises, Thai use ___โมงเช้า for morning time. โมง
                translates to hours and เช้า just translates to morning. This is
                used from 6am to 11am. Usually, the number used is the same as
                the Western system (hours past midnight), however in some places
                in Thailand, the number of hours since 6am is used.
            </BlogParagraph>
            <BlogHeading>After noon</BlogHeading>
            <BlogParagraph>
                From 1-4pm, Thai use บ่าย___โมง for afternoon time. บ่าย means
                afternoon. The number used is the hours past noon. หนึ่ง is
                usually omitted for 1pm.
            </BlogParagraph>
            <BlogHeading>Late afternoon</BlogHeading>
            <BlogParagraph>
                Between 5-6pm, Thai use บ่าย___เย็น for evening time. เย็น
                translates to evening or twilight. Again, the number used is the
                hours past noon.
            </BlogParagraph>
            <BlogHeading>Evening</BlogHeading>
            <BlogParagraph>
                Thai use ___ทุ่ม for night time. ทุ่ม is the onomatopoeia for
                the sound of the drum. In this case the number used is always
                the hours past 6pm, and for 7pm you would just say ทุ่ม.
            </BlogParagraph>
            <BlogHeading>Noon and midnight</BlogHeading>
            <BlogParagraph>
                Exceptions are used here where noon is เที่ยง and midnight is
                เที่ยงคืน.
            </BlogParagraph>
            <BlogHeading>Minutes</BlogHeading>
            <BlogParagraph>
                To say the minutes past the hour, Thai use ___นาที. นาที
                literally translating to minutes. You can also say the minutes
                to the hour, if past the half hour. The format for this is
                อีก___นาที. อีก translates to more or another. There is no
                particular rule for when to use อีก, just whatever you&apos;re
                feeling! You&apos;ll always be ok just saying the minutes past
                the hour.
            </BlogParagraph>
            <BlogHeading>Half past</BlogHeading>
            <BlogParagraph>
                Much like in English, Thai also have a term for half past the
                hour. Thai use ___ครึ่ง, with ครึ่ง meaning half. Quarter past
                and quarter to the hour are not used.
            </BlogParagraph>
            <BlogHeading>24 hour clock</BlogHeading>
            <BlogParagraph>
                Thai people use the 24 hour clock system in formal situations
                and on things like train schedules. The format is ___นาฬิกา___
                e.g. แปดนาฬิกาสิบนาที is 8:10am.
            </BlogParagraph>
            <BlogParagraph>
                This is rarely used in everyday conversation but would be likely
                to be understood.
            </BlogParagraph>
            <BlogHeading>All hours</BlogHeading>
            <Table className="mb-6">
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
                I have developed a thai time converter to help convert times
                into the spoken Thai sentences. I generally avoid
                transliterating Thai into the Latin alphabet as there&apos;s no
                standard way to do this and my eyes always gravitate towards the
                latin alphabet instead of the Thai script. Definitely learn how
                to read Thai script if you want to learn Thai!
            </BlogParagraph>
            <ThaiTimeConverter />
        </>
    );
}
