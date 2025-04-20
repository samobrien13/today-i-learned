interface KeyData {
    label: string; // Primary text on the key (e.g., "Q", "A", "SPACE")
    subLabel?: string; // Secondary text, often for modifiers (e.g., "LCTRL")
    raw: string; // The original ZMK code
    span?: number; // How many grid columns this key should span (for wider keys like space)
    isEmpty?: boolean; // Flag for empty spots in the grid
}

type KeymapLayout = KeyData[][]; // Array of rows, each row is an array of keys

// --- Helper Functions (Keep parseZmkCode as before) ---
function parseZmkCode(code: string): Pick<KeyData, "label" | "subLabel"> {
    const cleanedCode = code.trim();
    if (!cleanedCode || !cleanedCode.startsWith("&")) {
        return { label: cleanedCode };
    }
    const parts = cleanedCode.substring(1).split(" ");
    const type = parts[0];
    const args = parts.slice(1);

    if (type === "kp") {
        const labelMap: { [key: string]: string } = {
            N1: "1",
            N2: "2",
            N3: "3",
            N4: "4",
            N5: "5",
            N6: "6",
            N7: "7",
            N8: "8",
            N9: "9",
            N0: "0",
            DEL: "DEL",
            LBKT: "[",
            RBKT: "]",
            SEMI: ";",
            SQT: "'",
            BSLH: "\\",
            MINUS: "-",
            EQUAL: "=",
            COMMA: ",",
            DOT: ".",
            FSLH: "/",
            GRAVE: "`",
            BSPC: "BSPC",
            RET: "ENTER",
            ESC: "ESC",
            TAB: "TAB",
            CAPS: "CAPS",
            SPACE: "SPACE",
        };
        return { label: labelMap[args[0]] ?? args[0] };
    }
    if (type.startsWith("hm_")) {
        const modifierPart = args[0];
        let modifier = "MOD"; // Default
        if (modifierPart.includes("CTRL"))
            modifier = modifierPart.startsWith("L") ? "L CTRL" : "R CTRL";
        else if (modifierPart.includes("ALT"))
            modifier = modifierPart.startsWith("L") ? "L ALT" : "R ALT";
        else if (modifierPart.includes("GUI") || modifierPart.includes("CMD"))
            modifier = modifierPart.startsWith("L") ? "L GUI" : "R GUI";
        else if (modifierPart.includes("SHIFT"))
            modifier = modifierPart.startsWith("L") ? "L SHFT" : "R SHFT";

        const key = args[1];
        return { subLabel: modifier, label: key };
    }
    if (type === "mo" || type === "tog") {
        return { label: args[0], subLabel: type.toUpperCase() };
    }
    return { label: args.join(" ") || type };
}

function parseKeymapString(keymapString: string): KeymapLayout[] {
    console.log("Starting keymap parsing...");
    const lines = keymapString.trim().split("\n");
    const leftHalf: KeymapLayout = []; // Initialize as empty
    const rightHalf: KeymapLayout = []; // Initialize as empty
    const leftThumb: KeyData[] = [];
    const rightThumb: KeyData[] = [];
    const foundThumbRow = false;

    console.log("Lines:", lines);
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("//")) return; // Skip comments

        console.log(`Processing line ${index + 1}: "${trimmedLine}"`);

        const keys = trimmedLine
            .split("&")
            .map((key) => key.trim())
            .filter((k) => k.length > 0)
            .map((key) => key.split(" ")[1]);

        console.log("Keys found:", keys);

        console.log(` - Treating line ${index + 1} as MAIN row.`);
        const newLeftRow: KeyData[] = [];
        const newRightRow: KeyData[] = [];

        keys.slice(0, keys.length / 2).forEach((raw) => {
            const parsed = parseZmkCode(raw);
            newLeftRow.push({ ...parsed, raw });
        });
        keys.slice(keys.length / 2).forEach((raw) => {
            const parsed = parseZmkCode(raw);
            newRightRow.push({ ...parsed, raw });
        });

        leftHalf.push(newLeftRow);
        rightHalf.push(newRightRow);
    });

    // Assemble the final structure
    const finalLeftHalf = [...leftHalf];
    const finalRightHalf = [...rightHalf];

    if (foundThumbRow) {
        finalLeftHalf.push(leftThumb);
        finalRightHalf.push(rightThumb);
    } else {
        console.warn(
            "Thumb row not found or parsed correctly. Adding placeholders.",
        );
        // Add placeholder if thumb not found, adjust size as needed (e.g., 4 empty keys)
        finalLeftHalf.push(
            Array(4).fill({ label: "", raw: "", isEmpty: true }),
        );
        finalRightHalf.push(
            Array(4).fill({ label: "", raw: "", isEmpty: true }),
        );
    }

    // Final Validation
    if (
        finalLeftHalf.length === 0 ||
        finalRightHalf.length === 0 ||
        finalLeftHalf.length !== finalRightHalf.length
    ) {
        console.error(
            "Keymap parsing resulted in an invalid structure. Check logs.",
            { finalLeftHalf, finalRightHalf },
        );
        // Return empty structure to avoid crashing render, but show error in console
        return [[], []];
    }

    console.log("Final structure rows (left):", finalLeftHalf.length);
    console.log("Final structure rows (right):", finalRightHalf.length);
    console.log("Parsing complete.");
    return [finalLeftHalf, finalRightHalf];
}

interface KeyProps {
    data: KeyData;
}

const Key: React.FC<KeyProps> = ({ data }) => {
    if (data.isEmpty) {
        return (
            <div className="min-h-[3.5rem] min-w-[3.5rem] sm:min-h-[4rem] sm:min-w-[4rem]"></div>
        ); // Empty space
    }

    const keyWidth =
        data.span && data.span > 1
            ? `min-w-[${data.span * 3.5}rem] sm:min-w-[${data.span * 4}rem]` // Adjust width based on span
            : "min-w-[3.5rem] sm:min-w-[4rem]";

    return (
        <div
            className={` ${keyWidth} relative flex min-h-[3.5rem] flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-200 p-1 text-center shadow transition-colors hover:bg-gray-300 sm:min-h-[4rem] dark:border-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600`}
            title={data.raw} // Show raw ZMK code on hover
        >
            {data.subLabel && (
                <span className="absolute top-0.5 left-0.5 px-1 text-[0.6rem] text-gray-600 sm:text-[0.7rem] dark:text-gray-400">
                    {data.subLabel}
                </span>
            )}
            <span className="text-xs font-medium break-words sm:text-sm">
                {data.label}
            </span>
        </div>
    );
};

type KeymapDisplayProps = {
    keymapString: string;
};

export function KeymapDisplay({ keymapString }: KeymapDisplayProps) {
    const keymapHalves = parseKeymapString(keymapString);

    if (!keymapHalves || keymapHalves.length !== 2) {
        return <div>Error parsing keymap data.</div>;
    }

    const [leftHalf, rightHalf] = keymapHalves;

    const renderHalf = (halfData: KeymapLayout, side: "left" | "right") => (
        <div className="flex flex-col gap-1">
            {halfData.map((row, rowIndex) => (
                <div
                    key={`row-${side}-${rowIndex}`}
                    className={`flex gap-1 ${
                        // Add indentation for specific rows if needed (example for Lily58 pinky stagger)
                        rowIndex === 1 ? "ml-2 sm:ml-4" : ""
                    } ${
                        rowIndex === 3 ? "ml-[-0.5rem] sm:ml-[-1rem]" : "" // Example outdent
                    } ${
                        // Thumb cluster alignment
                        rowIndex === halfData.length - 1
                            ? "mt-2 justify-center"
                            : "justify-start" // Center thumb cluster horizontally
                    }`}
                >
                    {row.map((keyData, keyIndex) => (
                        <Key
                            key={`key-${side}-${rowIndex}-${keyIndex}`}
                            data={keyData}
                        />
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex justify-center gap-4 rounded-lg bg-gray-50 p-4 sm:gap-8 dark:bg-gray-800">
            {renderHalf(leftHalf, "left")}
            {renderHalf(rightHalf, "right")}
        </div>
    );
}
