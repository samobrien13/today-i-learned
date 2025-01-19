import ThaiTimeConverter from "@/components/thai-time-converter";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to tell the time Thai style",
    description: "Learn how to tell the time Thai style",
};

function HowToTellTheTimeThaiStyle() {
    return (
        <section className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl">How to tell the time Thai style</h1>
            <article className="flex flex-col gap-2">
                <p>Before 6am, Thai use “ตี___” for early morning time.</p>
                <p>
                    After the sun rises, Thai use “___โมงเช้า” for morning time.
                </p>
                <p>From 1-4pm, Thai use “บ่าย___โมง” for afternoon time.</p>
                <p>Between 5-6pm, Thai use “บ่าย___เย็น” for evening time.</p>
                <p>After noon, Thai use “___ทุ่ม” for evening time.</p>
                <table>
                    <tbody>
                        <tr>
                            <td>1 a.m.</td>
                            <td>
                                <span>ตีหนึ่ง</span>
                            </td>
                        </tr>
                        <tr>
                            <td>2 a.m.</td>
                            <td>
                                <span>ตีสอง</span>
                            </td>
                        </tr>
                        <tr>
                            <td>3 a.m.</td>
                            <td>
                                <span>ตีสม</span>
                            </td>
                        </tr>
                        <tr>
                            <td>4 a.m.</td>
                            <td>
                                <span>ตีสี่</span>
                            </td>
                        </tr>
                        <tr>
                            <td>5 a.m.</td>
                            <td>
                                <span>ตีห้า</span>
                            </td>
                        </tr>
                        <tr>
                            <td>6 a.m.</td>
                            <td>
                                <span>หกโมงเช้า</span>
                            </td>
                        </tr>
                        <tr>
                            <td>7 a.m.</td>
                            <td>
                                <span>เจ็ดโมงเช้า</span>
                            </td>
                        </tr>
                        <tr>
                            <td>8 a.m.</td>
                            <td>
                                <span>แปดโมงเช้า</span>
                            </td>
                        </tr>
                        <tr>
                            <td>9 a.m.</td>
                            <td>
                                <span>เก้าโมงเช้า</span>
                            </td>
                        </tr>
                        <tr>
                            <td>10 a.m.</td>
                            <td>
                                <span>สิบโมงเช้า</span>
                            </td>
                        </tr>
                        <tr>
                            <td>11 a.m.</td>
                            <td>
                                <span>สิบเอ็ดโมงเช้า</span>
                            </td>
                        </tr>
                        <tr>
                            <td>12 p.m. (noon)</td>
                            <td>
                                <span>เที่ยง</span>
                            </td>
                        </tr>
                        <tr>
                            <td>1 p.m.</td>
                            <td>
                                <span>บ่ายโมง</span>
                            </td>
                        </tr>
                        <tr>
                            <td>2 p.m.</td>
                            <td>
                                <span>บ่ายสองโมง</span>
                            </td>
                        </tr>
                        <tr>
                            <td>3 p.m.</td>
                            <td>
                                <span>บ่ายสามโมง</span>
                            </td>
                        </tr>
                        <tr>
                            <td>4 p.m.</td>
                            <td>
                                <span>บ่ายสี่โมง</span>
                            </td>
                        </tr>
                        <tr>
                            <td>5 p.m.</td>
                            <td>
                                <span>ห้าโมงเย็น</span>
                            </td>
                        </tr>
                        <tr>
                            <td>6 p.m.</td>
                            <td>
                                <span>หกโมงเย็น</span>
                            </td>
                        </tr>
                        <tr>
                            <td>7 p.m.</td>
                            <td>
                                <span>เจ็ดทุ่ม</span>
                            </td>
                        </tr>
                        <tr>
                            <td>8 p.m.</td>
                            <td>
                                <span>สองทุ่ม</span>
                            </td>
                        </tr>
                        <tr>
                            <td>9 p.m.</td>
                            <td>
                                <span>สามทุ่ม</span>
                            </td>
                        </tr>
                        <tr>
                            <td>10 p.m.</td>
                            <td>
                                <span>สี่ทุ่ม</span>
                            </td>
                        </tr>
                        <tr>
                            <td>11 p.m.</td>
                            <td>
                                <span>ห้าทุ่ม</span>
                            </td>
                        </tr>
                        <tr>
                            <td>12 a.m. (midnight)</td>
                            <td>
                                <span>เที่ยงคืน</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    Use the Thai Time Converter to convert the time to practice
                </p>
                <ThaiTimeConverter />
            </article>
        </section>
    );
}

export default HowToTellTheTimeThaiStyle;
