import PasswordGenerator from "@/components/password-generator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password Generator",
    description:
        "No nonsense password generator that creates secure passwords that work for most websites.",
};

export default function Page() {
    return (
        <section className="flex-1">
            <PasswordGenerator />
        </section>
    );
}
