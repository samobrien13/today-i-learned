import { exampleSentences } from "@/lib/keyboard";
import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    ChangeEvent,
} from "react";

type TypingInputProps = {
    sentences?: string[];
};

function TypingInput({ sentences = exampleSentences }: TypingInputProps) {
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
    const [targetSentence, setTargetSentence] = useState<string>("");
    const [typedText, setTypedText] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Function to load a sentence by index
    const loadSentence = useCallback(
        (index: number): void => {
            const effectiveIndex = index % sentences.length;
            setTargetSentence(sentences[effectiveIndex]);
            setTypedText("");
            setTimeout(() => inputRef.current?.focus(), 0);
        },
        [sentences], // Dependency: sentences array
    );

    useEffect(() => {
        loadSentence(currentSentenceIndex);
    }, [loadSentence, currentSentenceIndex]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const currentTypedText = event.target.value;

        setTypedText(currentTypedText);

        // Check for completion
        if (currentTypedText.length === targetSentence.length) {
            handleNextSentence();
        }
    };

    const handleNextSentence = (): void => {
        // Increment index, loadSentence will handle wrapping with modulo
        setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
    };

    // Render the target sentence with character highlighting
    const renderTargetSentence = () => {
        return targetSentence.split("").map((char, index) => {
            let charClass = "text-muted-foreground";
            const isCurrentChar = index === typedText.length;

            if (index < typedText.length) {
                // Character has been typed
                charClass =
                    typedText[index] === char
                        ? "text-green-600"
                        : "text-red-600";
                if (typedText[index] !== char) {
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
