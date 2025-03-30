import {
    exampleSentences,
    Layouts,
    qwertyToColemakMap,
    qwertyToDvorakMap,
    qwertyToProgrammersDvorakMap,
    qwertyToRealProgrammersDvorakMap,
} from "@/lib/keyboard";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";

function getRandomSentence() {
    return exampleSentences[
        Math.floor(Math.random() * exampleSentences.length)
    ];
}

const qwertyToDvorak = {
    q: "'",
    w: ",", // ,
    e: ".", // .
    r: "p",
    t: "y",
    y: "f",
    u: "g",
    i: "c",
    o: "r",
    p: "l",
    a: "a",
    s: "o",
    d: "e",
    f: "u",
    g: "i",
    h: "d",
    j: "h",
    k: "t",
    l: "n",
    z: ";", // ;
    x: "q",
    c: "j",
    v: "k",
    b: "x",
    n: "b",
    m: "m",
};

type TypingInputProps = {
    targetLayout: Layouts;
};

function TypingInput({ targetLayout }: TypingInputProps) {
    const [targetSentence, setTargetSentence] = useState(getRandomSentence());
    const [typedText, setTypedText] = useState<string>("");
    const [targetText, setTargetText] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const currentTypedText = event.target.value;

        setTypedText(currentTypedText);
        setTargetText(
            currentTypedText
                .split("")
                .map((char) => {
                    console.log(char);
                    if (targetLayout === "colemak") {
                        return qwertyToColemakMap.get(char) ?? char;
                    } else if (targetLayout === "dvorak") {
                        return qwertyToDvorakMap.get(char) ?? char;
                    } else if (targetLayout === "programmersDvorak") {
                        return qwertyToProgrammersDvorakMap.get(char) ?? char;
                    } else if (targetLayout === "realProgrammersDvorak") {
                        console.log(qwertyToRealProgrammersDvorakMap.get(char));
                        return (
                            qwertyToRealProgrammersDvorakMap.get(char) ?? char
                        );
                    } else {
                        return char;
                    }
                })
                .join(""),
        );

        // Check for completion
        if (currentTypedText.length === targetSentence.length) {
            handleNextSentence();
        }
    };

    const handleNextSentence = (): void => {
        setTargetSentence(getRandomSentence());
        setTypedText("");
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    // Render the target sentence with character highlighting
    const renderTargetSentence = () => {
        return targetSentence.split("").map((char, index) => {
            let charClass = "text-muted-foreground";
            const isCurrentChar = index === typedText.length;

            if (index < typedText.length) {
                // Character has been typed
                charClass =
                    targetText[index] === char
                        ? "text-green-600"
                        : "text-red-600";
                if (targetText[index] !== char) {
                    charClass += " text-destructive underline";
                }
            } else if (isCurrentChar) {
                // Next character to be typed
                charClass = "bg-muted rounded-sm text-muted-foreground"; // Highlight current position
            }

            // Add transition for smoother color changes
            charClass += " transition-colors duration-100 ease-in-out";

            return (
                <span key={index} className={charClass}>
                    {char === " " && isCurrentChar ? "\u00A0" : char}
                </span>
            );
        });
    };

    return (
        <div className="relative">
            <div
                className="min-h-[6rem] rounded font-mono text-xl leading-relaxed break-words whitespace-pre-wrap select-none md:text-2xl"
                aria-label="Target sentence"
                onClick={() => inputRef.current?.focus()}
            >
                {renderTargetSentence()}
            </div>
            <input
                ref={inputRef}
                type="text"
                value={typedText}
                onChange={handleInputChange}
                className="absolute top-0 z-[-1] border-none bg-transparent opacity-0 outline-none"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="Typing input"
                aria-invalid={
                    typedText.length > 0 &&
                    typedText.length <= targetSentence.length &&
                    typedText[typedText.length - 1] !==
                        targetSentence[typedText.length - 1]
                }
            />
        </div>
    );
}

export default TypingInput;
