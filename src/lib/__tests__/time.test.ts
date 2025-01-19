import { describe, expect, it } from "vitest";
import * as time from "../time";

describe("time", () => {
    describe(time.parseTime.name, () => {
        it("should return null for invalid input", () => {
            const date = time.parseTime("10:00:00");
            expect(date).toBe(null);
        });

        it("should return time", () => {
            const date = time.parseTime("10:00");
            expect(date?.getHours()).toBe(10);
            expect(date?.getMinutes()).toBe(0);
        });

        it("should return a.m.", () => {
            const date = time.parseTime("10:00 am");
            expect(date?.getHours()).toBe(10);
            expect(date?.getMinutes()).toBe(0);
        });

        it("should return a.m. with minutes", () => {
            const date = time.parseTime("10:30 am");
            expect(date?.getHours()).toBe(10);
            expect(date?.getMinutes()).toBe(30);
        });

        it("should return p.m.", () => {
            const date = time.parseTime("10:00 pm");
            expect(date?.getHours()).toBe(22);
            expect(date?.getMinutes()).toBe(0);
        });

        it("should return p.m with minutes", () => {
            const date = time.parseTime("10:30 pm");
            expect(date?.getHours()).toBe(22);
            expect(date?.getMinutes()).toBe(30);
        });

        it("should return 24 hours", () => {
            const date = time.parseTime("22:00");
            expect(date?.getHours()).toBe(22);
            expect(date?.getMinutes()).toBe(0);
        });

        it("should return 24 hours with minutes", () => {
            const date = time.parseTime("22:30");
            expect(date?.getHours()).toBe(22);
            expect(date?.getMinutes()).toBe(30);
        });
    });

    describe(time.numberToThai.name, () => {
        it("should return correct numbers for clock", () => {
            expect(time.numberToThai(0)).toBe("ศูนย์");
            expect(time.numberToThai(1)).toBe("หนึ่ง");
            expect(time.numberToThai(2)).toBe("สอง");
            expect(time.numberToThai(3)).toBe("สาม");
            expect(time.numberToThai(4)).toBe("สี่");
            expect(time.numberToThai(5)).toBe("ห้า");
            expect(time.numberToThai(6)).toBe("หก");
            expect(time.numberToThai(7)).toBe("เจ็ด");
            expect(time.numberToThai(8)).toBe("แปด");
            expect(time.numberToThai(9)).toBe("เก้า");
            expect(time.numberToThai(10)).toBe("สิบ");
            expect(time.numberToThai(11)).toBe("สิบเอ็ด");
            expect(time.numberToThai(12)).toBe("สิบสอง");
            expect(time.numberToThai(13)).toBe("สิบสาม");
            expect(time.numberToThai(14)).toBe("สิบสี่");
            expect(time.numberToThai(15)).toBe("สิบห้า");
            expect(time.numberToThai(16)).toBe("สิบหก");
            expect(time.numberToThai(17)).toBe("สิบเจ็ด");
            expect(time.numberToThai(18)).toBe("สิบแปด");
            expect(time.numberToThai(19)).toBe("สิบเก้า");
            expect(time.numberToThai(20)).toBe("ยี่สิบ");
            expect(time.numberToThai(21)).toBe("ยี่สิบเอ็ด");
            expect(time.numberToThai(22)).toBe("ยี่สิบสอง");
            expect(time.numberToThai(23)).toBe("ยี่สิบสาม");
            expect(time.numberToThai(24)).toBe("ยี่สิบสี่");
            expect(time.numberToThai(25)).toBe("ยี่สิบห้า");
            expect(time.numberToThai(26)).toBe("ยี่สิบหก");
            expect(time.numberToThai(27)).toBe("ยี่สิบเจ็ด");
            expect(time.numberToThai(28)).toBe("ยี่สิบแปด");
            expect(time.numberToThai(29)).toBe("ยี่สิบเก้า");
            expect(time.numberToThai(30)).toBe("สามสิบ");
            expect(time.numberToThai(31)).toBe("สามสิบเอ็ด");
            expect(time.numberToThai(32)).toBe("สามสิบสอง");
            expect(time.numberToThai(33)).toBe("สามสิบสาม");
            expect(time.numberToThai(34)).toBe("สามสิบสี่");
            expect(time.numberToThai(35)).toBe("สามสิบห้า");
            expect(time.numberToThai(36)).toBe("สามสิบหก");
            expect(time.numberToThai(37)).toBe("สามสิบเจ็ด");
            expect(time.numberToThai(38)).toBe("สามสิบแปด");
            expect(time.numberToThai(39)).toBe("สามสิบเก้า");
            expect(time.numberToThai(40)).toBe("สี่สิบ");
            expect(time.numberToThai(41)).toBe("สี่สิบเอ็ด");
            expect(time.numberToThai(42)).toBe("สี่สิบสอง");
            expect(time.numberToThai(43)).toBe("สี่สิบสาม");
            expect(time.numberToThai(44)).toBe("สี่สิบสี่");
            expect(time.numberToThai(45)).toBe("สี่สิบห้า");
            expect(time.numberToThai(46)).toBe("สี่สิบหก");
            expect(time.numberToThai(47)).toBe("สี่สิบเจ็ด");
            expect(time.numberToThai(48)).toBe("สี่สิบแปด");
            expect(time.numberToThai(49)).toBe("สี่สิบเก้า");
            expect(time.numberToThai(50)).toBe("ห้าสิบ");
            expect(time.numberToThai(51)).toBe("ห้าสิบเอ็ด");
            expect(time.numberToThai(52)).toBe("ห้าสิบสอง");
            expect(time.numberToThai(53)).toBe("ห้าสิบสาม");
            expect(time.numberToThai(54)).toBe("ห้าสิบสี่");
            expect(time.numberToThai(55)).toBe("ห้าสิบห้า");
            expect(time.numberToThai(56)).toBe("ห้าสิบหก");
            expect(time.numberToThai(57)).toBe("ห้าสิบเจ็ด");
            expect(time.numberToThai(58)).toBe("ห้าสิบแปด");
            expect(time.numberToThai(59)).toBe("ห้าสิบเก้า");
        });
    });

    describe(time.convertToThaiHours.name, () => {
        it("should return correct hours", () => {
            expect(time.convertToThaiHours(0)).toBe("เที่ยงคืน");
            expect(time.convertToThaiHours(1)).toBe("ตีหนึ่ง");
            expect(time.convertToThaiHours(2)).toBe("ตีสอง");
            expect(time.convertToThaiHours(3)).toBe("ตีสาม");
            expect(time.convertToThaiHours(4)).toBe("ตีสี่");
            expect(time.convertToThaiHours(5)).toBe("ตีห้า");
            expect(time.convertToThaiHours(6)).toBe("หกโมงเช้า");
            expect(time.convertToThaiHours(7)).toBe("เจ็ดโมง(เช้า)");
            expect(time.convertToThaiHours(8)).toBe("แปดโมงเช้า");
            expect(time.convertToThaiHours(9)).toBe("เก้าโมงเช้า");
            expect(time.convertToThaiHours(10)).toBe("สิบโมงเช้า");
            expect(time.convertToThaiHours(11)).toBe("สิบเอ็ดโมง(เช้า)");
            expect(time.convertToThaiHours(12)).toBe("เที่ยง");
            expect(time.convertToThaiHours(13)).toBe("บ่ายหนึ่งโมง");
            expect(time.convertToThaiHours(14)).toBe("บ่ายสองโมง");
            expect(time.convertToThaiHours(15)).toBe("บ่ายสามโมง");
            expect(time.convertToThaiHours(16)).toBe("สี่โมงเย็น");
            expect(time.convertToThaiHours(17)).toBe("ห้าโมงเย็น");
            expect(time.convertToThaiHours(18)).toBe("หกโมงเย็น");
            expect(time.convertToThaiHours(19)).toBe("(หนึ่ง)ทุ่ม");
            expect(time.convertToThaiHours(20)).toBe("สองทุ่ม");
            expect(time.convertToThaiHours(21)).toBe("สามทุ่ม");
            expect(time.convertToThaiHours(22)).toBe("สี่ทุ่ม");
            expect(time.convertToThaiHours(23)).toBe("ห้าทุ่ม");
        });
    });

    describe(time.convertToThaiTime.name, () => {
        it("should format times", () => {
            expect(time.convertToThaiTime(time.parseTime("00:00")!)).toBe(
                "เที่ยงคืน",
            );
            expect(time.convertToThaiTime(time.parseTime("01:22")!)).toBe(
                "ตีหนึ่งยี่สิบสองนาที",
            );
            expect(time.convertToThaiTime(time.parseTime("04:43")!)).toBe(
                "ตีสี่สี่สิบสามนาที\nอีกสิบเจ็ดนาทีตีห้า",
            );
            expect(time.convertToThaiTime(time.parseTime("06:00")!)).toBe(
                "หกโมงเช้า",
            );
            expect(time.convertToThaiTime(time.parseTime("07:11")!)).toBe(
                "เจ็ดโมง(เช้า)สิบเอ็ดนาที",
            );
            expect(time.convertToThaiTime(time.parseTime("12:00")!)).toBe(
                "เที่ยง",
            );
            expect(time.convertToThaiTime(time.parseTime("13:30")!)).toBe(
                "บ่ายหนึ่งโมงครึ่ง",
            );
            expect(time.convertToThaiTime(time.parseTime("16:45")!)).toBe(
                "สี่โมงเย็นสี่สิบห้านาที\nอีกสิบห้านาทีห้าโมงเย็น",
            );
            expect(time.convertToThaiTime(time.parseTime("19:00")!)).toBe(
                "(หนึ่ง)ทุ่ม",
            );
            expect(time.convertToThaiTime(time.parseTime("20:29")!)).toBe(
                "สองทุ่มยี่สิบเก้านาที",
            );
        });
    });
});
