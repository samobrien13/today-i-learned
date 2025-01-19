import ThaiTimeConverter from "@/components/thai-time-converter";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to tell the time Thai style",
    description: "Learn how to tell the time Thai style",
};

function HowToTellTheTimeThaiStyle() {
    return (
        <div>
            <h1>How to tell the time Thai style</h1>
            <p>Learn how to tell the time Thai style</p>

            <ThaiTimeConverter />
        </div>
    );
}

export default HowToTellTheTimeThaiStyle;
