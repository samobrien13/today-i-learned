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

    const tens = Math.floor(num / 10);

    let tensText = "";
    if (tens === 1) {
        tensText = "สิบ";
    } else if (tens === 2) {
        tensText = "ยี่สิบ";
    } else {
        tensText = thaiNumbers[tens] + "สิบ";
    }

    const ones = num % 10;

    let onesText = "";
    if (ones === 1) {
        onesText = "เอ็ด";
    } else if (ones > 1) {
        onesText = thaiNumbers[ones];
    }

    return `${tensText}${onesText}`;
}

function convertToThaiHours(hours: number): string {
    // Hours
    if (hours === 0) {
        // Midnight
        return "เที่ยงคืน";
    } else if (hours === 12) {
        // Noon
        return "เที่ยง";
    } else if (hours >= 1 && hours < 6) {
        return `ตี${numberToThai(hours)}`;
    } else if (hours >= 6 && hours < 11) {
        return `${numberToThai(hours)}โมง${hours === 7 ? "(เช้า)" : "เช้า"}`;
    } else if (hours === 11) {
        return `${numberToThai(hours)}โมง(เช้า)`;
    } else if (hours >= 13 && hours < 16) {
        return `บ่าย${numberToThai(hours - 12)}โมง`;
    } else if (hours >= 16 && hours < 19) {
        return `${numberToThai(hours - 12)}โมงเย็น`;
    } else if (hours === 19) {
        return `(${numberToThai(hours - 18)})ทุ่ม`;
    } else if ((hours > 19 && hours <= 23) || hours === 0) {
        return `${numberToThai(hours - 18)}ทุ่ม`;
    }

    return "";
}

export function convertToThaiTime(time: Date): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();

    // Minutes
    if (minutes === 0) {
        return convertToThaiHours(hours);
    }

    if (minutes === 30) {
        return `${convertToThaiHours(hours)}ครึ่ง`;
    } else if (minutes < 30) {
        return `${convertToThaiHours(hours)}${numberToThai(minutes)}นาที`;
    } else {
        return `${convertToThaiHours(hours)}${numberToThai(minutes)}นาที
            อีก${numberToThai(60 - minutes)}นาที${convertToThaiHours(hours + 1)}`;
    }
}
