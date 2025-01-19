// https://stackoverflow.com/a/8395948
export function parseTime(timeString: string): Date | null {
    if (timeString == "") return null;

    const time = timeString.match(/^(\d+)([:\.](\d\d))?\s*((a|(p))m?)?$/i);

    if (time == null) return null;

    let m = parseInt(time[3], 10) || 0;
    let hours = parseInt(time[1], 10);

    if (time[4]) time[4] = time[4].toLowerCase();

    // 12 hour time
    if (hours == 12 && !time[4]) {
        hours = 12;
    } else if (hours == 12 && (time[4] == "am" || time[4] == "a")) {
        hours += 12;
    } else if (hours < 12 && (time[4] === "pm" || time[4] === "p")) {
        hours += 12;
    } else if (hours > 24 && hours.toString().length >= 3) {
        // 24 hour time
        if (hours.toString().length == 3) {
            m = parseInt(hours.toString().substring(1, 3), 10);
            hours = parseInt(hours.toString().charAt(0), 10);
        } else if (hours.toString().length == 4) {
            m = parseInt(hours.toString().substring(2, 4), 10);
            hours = parseInt(hours.toString().substring(0, 2), 10);
        }
    }

    const d = new Date();
    d.setHours(hours);
    d.setMinutes(m);
    d.setSeconds(0, 0);
    return d;
}

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
    if (num <= 11) {
        return thaiNumbers[num];
    }
    if (num < 20) {
        return `สิบ${num % 10 === 1 ? "เอ็ด" : thaiNumbers[num % 10]}`;
    }
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return `${thaiNumbers[tens]}สิบ${ones === 1 ? "เอ็ด" : ones > 1 ? thaiNumbers[ones] : ""}`;
}

export function convertToThaiTime(time: Date): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();

    let result = "";

    // Hours
    if (hours === 0) {
        // Midnight
        result += "เที่ยงคืน";
    } else if (hours === 12) {
        // Noon
        result += "เที่ยง";
    } else if (hours >= 1 && hours < 6) {
        result += `ตี${numberToThai(hours)}`;
    } else if (hours >= 6 && hours < 12) {
        result += `${numberToThai(hours)}โมงเช้า`;
    } else if (hours >= 13 && hours < 16) {
        result += `บ่าย${numberToThai(hours - 12)}โมง`;
    } else if (hours >= 16 && hours < 19) {
        result += `${numberToThai(hours - 12)}โมงเย็น`;
    } else if ((hours >= 19 && hours <= 23) || hours === 0) {
        result += `${numberToThai(hours - 18)}ทุ่ม`;
    }

    // Minutes
    if (minutes > 0) {
        if (minutes === 30) {
            result += "ครึ่ง";
        } else {
            result += `${numberToThai(minutes)}นาที`;
        }
    }

    return result.trim();
}
