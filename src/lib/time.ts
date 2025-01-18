import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const thaiNumbers = [
    "ศูนย์",
    "หนึ่ง",
    "สอง",
    "สาม",
    "สี่",
    "ห้า",
    "หก",
    "เจ็ด",
    "แปด",
    "เก้า",
    "สิบ",
    "สิบเอ็ด",
];

function numberToThai(num: number): string {
    if (num <= 11) return thaiNumbers[num];
    if (num < 20)
        return `สิบ${num % 10 === 1 ? "เอ็ด" : thaiNumbers[num % 10]}`;
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return `${thaiNumbers[tens]}สิบ${ones === 1 ? "เอ็ด" : ones > 1 ? thaiNumbers[ones] : ""}`;
}

export function convertToThaiTime(timeStr: string): string {
    // const time = dayjs(timeStr, "HH:mm");

    const [time, period] = timeStr.toLowerCase().split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format
    if (period === "pm" && hours !== 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;

    let result = "";

    // Hours
    if (hours === 0) {
        result += "เที่ยงคืน";
    } else if (hours === 12) {
        result += "เที่ยง";
    } else {
        const thaiHour = hours > 12 ? hours - 12 : hours;
        result += `${numberToThai(thaiHour)} โมง`;
        if (hours > 12) result += "เย็น";
    }

    // Minutes
    if (minutes > 0) {
        if (minutes === 15) {
            result += "สิบห้านาที";
        } else if (minutes === 30) {
            result += "ครึ่ง";
        } else {
            result += `${numberToThai(minutes)} นาที`;
        }
    }

    // Time period
    if (hours >= 1 && hours < 6) {
        result += "ตี";
    } else if (hours >= 6 && hours < 12) {
        result += "เช้า";
    } else if (hours >= 13 && hours < 16) {
        result += "บ่าย";
    } else if (hours >= 16 && hours < 19) {
        result += "เย็น";
    } else if ((hours >= 19 && hours <= 23) || hours === 0) {
        result += "ทุ่ม";
    }

    return result.trim();
}
