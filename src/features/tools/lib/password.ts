const LENGTH = 16;
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SPECIAL_CHARACTERS = "!@#$%&*";
const REQUIREMENTS = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

export function generatePassword() {
    const charset = [LOWERCASE, UPPERCASE, NUMBERS].join("");

    let password = Array.from({ length: LENGTH })
        .map(() => charset[Math.floor(Math.random() * charset.length)])
        .join("");

    const index = Math.floor(Math.random() * LENGTH);
    password =
        password.substring(0, index) +
        SPECIAL_CHARACTERS[
            Math.floor(Math.random() * SPECIAL_CHARACTERS.length)
        ] +
        password.substring(index + 1);

    if (!REQUIREMENTS.test(password)) {
        return generatePassword();
    }

    return password;
}
