import { describe, expect, it } from "vitest";
import { generatePassword } from "../password";

describe("password", () => {
    describe(generatePassword.name, () => {
        it("should return password", () => {
            Array.from({ length: 100 }).forEach(() => {
                const password = generatePassword();
                expect(password).not.toBe(null);
                expect(password.length).toBe(16);
                expect(password).toMatch(/[a-z]/);
                expect(password).toMatch(/[A-Z]/);
                expect(password).toMatch(/\d/);
                expect(password).toMatch(/[!@#$%&*]/);
            });
        });
    });
});
