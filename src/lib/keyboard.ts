export interface KeyData {
    label: string;
    shiftLabel?: string; // Label when shift is held
    code: string; // Corresponds to KeyboardEvent.code
    widthMultiplier?: number;
}

export type LayoutData = KeyData[][];

export type Layouts =
    | "qwerty"
    | "dvorak"
    | "colemak"
    | "programmersDvorak"
    | "realProgrammersDvorak";

export const qwertyLayout: LayoutData = [
    [
        { label: "`", shiftLabel: "~", code: "Backquote" },
        { label: "1", shiftLabel: "!", code: "Digit1" },
        { label: "2", shiftLabel: "@", code: "Digit2" },
        { label: "3", shiftLabel: "#", code: "Digit3" },
        { label: "4", shiftLabel: "$", code: "Digit4" },
        { label: "5", shiftLabel: "%", code: "Digit5" },
        { label: "6", shiftLabel: "^", code: "Digit6" },
        { label: "7", shiftLabel: "&", code: "Digit7" },
        { label: "8", shiftLabel: "*", code: "Digit8" },
        { label: "9", shiftLabel: "(", code: "Digit9" },
        { label: "0", shiftLabel: ")", code: "Digit0" },
        { label: "-", shiftLabel: "_", code: "Minus" },
        { label: "=", shiftLabel: "+", code: "Equal" },
        { label: "⌫", code: "Backspace", widthMultiplier: 2 },
    ],
    [
        { label: "↹", code: "Tab", widthMultiplier: 1.5 },
        { label: "Q", code: "KeyQ" },
        { label: "W", code: "KeyW" },
        { label: "E", code: "KeyE" },
        { label: "R", code: "KeyR" },
        { label: "T", code: "KeyT" },
        { label: "Y", code: "KeyY" },
        { label: "U", code: "KeyU" },
        { label: "I", code: "KeyI" },
        { label: "O", code: "KeyO" },
        { label: "P", code: "KeyP" },
        { label: "[", shiftLabel: "{", code: "BracketLeft" },
        { label: "]", shiftLabel: "}", code: "BracketRight" },
        {
            label: "\\",
            shiftLabel: "|",
            code: "Backslash",
            widthMultiplier: 1.5,
        },
    ],
    [
        { label: "⇪", code: "CapsLock", widthMultiplier: 1.8 },
        { label: "A", code: "KeyA" },
        { label: "S", code: "KeyS" },
        { label: "D", code: "KeyD" },
        { label: "F", code: "KeyF" },
        { label: "G", code: "KeyG" },
        { label: "H", code: "KeyH" },
        { label: "J", code: "KeyJ" },
        { label: "K", code: "KeyK" },
        { label: "L", code: "KeyL" },
        { label: ";", shiftLabel: ":", code: "Semicolon" },
        { label: "'", shiftLabel: '"', code: "Quote" },
        { label: "↵", code: "Enter", widthMultiplier: 2.2 },
    ],
    [
        { label: "⇧", code: "ShiftLeft", widthMultiplier: 2.5 },
        { label: "Z", code: "KeyZ" },
        { label: "X", code: "KeyX" },
        { label: "C", code: "KeyC" },
        { label: "V", code: "KeyV" },
        { label: "B", code: "KeyB" },
        { label: "N", code: "KeyN" },
        { label: "M", code: "KeyM" },
        { label: ",", shiftLabel: "<", code: "Comma" },
        { label: ".", shiftLabel: ">", code: "Period" },
        { label: "/", shiftLabel: "?", code: "Slash" },
        { label: "⇧", code: "ShiftRight", widthMultiplier: 2.5 },
    ],
    [
        { label: "⌃", code: "ControlLeft", widthMultiplier: 1.5 },
        { label: "⌘", code: "MetaLeft", widthMultiplier: 1.2 },
        { label: "⌥", code: "AltLeft", widthMultiplier: 1.2 },
        { label: "␣", code: "Space", widthMultiplier: 6.5 },
        { label: "⌥", code: "AltRight", widthMultiplier: 1.2 },
        { label: "⌘", code: "MetaRight", widthMultiplier: 1.2 },
        { label: "⌃", code: "ControlRight", widthMultiplier: 1.5 },
    ],
];

export const dvorakLayout: LayoutData = [
    // Row 1 (Number Row) - Same labels/codes as QWERTY for numbers/symbols
    [
        { label: "`", shiftLabel: "~", code: "Backquote" },
        { label: "1", shiftLabel: "!", code: "Digit1" },
        { label: "2", shiftLabel: "@", code: "Digit2" },
        { label: "3", shiftLabel: "#", code: "Digit3" },
        { label: "4", shiftLabel: "$", code: "Digit4" },
        { label: "5", shiftLabel: "%", code: "Digit5" },
        { label: "6", shiftLabel: "^", code: "Digit6" },
        { label: "7", shiftLabel: "&", code: "Digit7" },
        { label: "8", shiftLabel: "*", code: "Digit8" },
        { label: "9", shiftLabel: "(", code: "Digit9" },
        { label: "0", shiftLabel: ")", code: "Digit0" },
        { label: "[", shiftLabel: "{", code: "BracketLeft" }, // Dvorak specific
        { label: "]", shiftLabel: "}", code: "BracketRight" }, // Dvorak specific
        { label: "⌫", code: "Backspace", widthMultiplier: 2 },
    ],
    // Row 2 (Upper Letter Row)
    [
        { label: "↹", code: "Tab", widthMultiplier: 1.5 },
        { label: "'", shiftLabel: '"', code: "KeyQ" }, // Q -> '
        { label: ",", shiftLabel: "<", code: "KeyW" }, // W -> ,
        { label: ".", shiftLabel: ">", code: "KeyE" }, // E -> .
        { label: "P", code: "KeyR" }, // R -> P
        { label: "Y", code: "KeyT" }, // T -> Y
        { label: "F", code: "KeyY" }, // Y -> F
        { label: "G", code: "KeyU" }, // U -> G
        { label: "C", code: "KeyI" }, // I -> C
        { label: "R", code: "KeyO" }, // O -> R
        { label: "L", code: "KeyP" }, // P -> L
        { label: "/", shiftLabel: "?", code: "BracketLeft" }, // [ -> /
        { label: "=", shiftLabel: "+", code: "BracketRight" }, // ] -> =
        {
            label: "\\",
            shiftLabel: "|",
            code: "Backslash",
            widthMultiplier: 1.5,
        }, // \ -> \ (same position)
    ],
    // Row 3 (Home Row)
    [
        { label: "⇪", code: "CapsLock", widthMultiplier: 1.8 },
        { label: "A", code: "KeyA" }, // A -> A (same position)
        { label: "O", code: "KeyS" }, // S -> O
        { label: "E", code: "KeyD" }, // D -> E
        { label: "U", code: "KeyF" }, // F -> U
        { label: "I", code: "KeyG" }, // G -> I
        { label: "D", code: "KeyH" }, // H -> D
        { label: "H", code: "KeyJ" }, // J -> H
        { label: "T", code: "KeyK" }, // K -> T
        { label: "N", code: "KeyL" }, // L -> N
        { label: "S", code: "Semicolon" }, // ; -> S
        { label: "-", code: "Quote" }, // ' -> -
        { label: "↵", code: "Enter", widthMultiplier: 2.2 },
    ],
    // Row 4 (Lower Letter Row)
    [
        { label: "⇧", code: "ShiftLeft", widthMultiplier: 2.5 },
        { label: ";", shiftLabel: ":", code: "KeyZ" }, // Z -> ;
        { label: "Q", code: "KeyX" }, // X -> Q
        { label: "J", code: "KeyC" }, // C -> J
        { label: "K", code: "KeyV" }, // V -> K
        { label: "X", code: "KeyB" }, // B -> X
        { label: "B", code: "KeyN" }, // N -> B
        { label: "M", code: "KeyM" }, // M -> M (same position)
        { label: "W", code: "Comma" }, // , -> W
        { label: "V", code: "Period" }, // . -> V
        { label: "Z", code: "Slash" }, // / -> Z
        { label: "⇧", code: "ShiftRight", widthMultiplier: 2.5 },
    ],
    // Row 5 (Bottom/Space Row) - Same labels/codes as QWERTY
    [
        { label: "⌃", code: "ControlLeft", widthMultiplier: 1.5 },
        { label: "⌘", code: "MetaLeft", widthMultiplier: 1.2 },
        { label: "⌥", code: "AltLeft", widthMultiplier: 1.2 },
        { label: "␣", code: "Space", widthMultiplier: 6.5 },
        { label: "⌥", code: "AltRight", widthMultiplier: 1.2 },
        { label: "⌘", code: "MetaRight", widthMultiplier: 1.2 },
        { label: "⌃", code: "ControlRight", widthMultiplier: 1.5 },
    ],
];

export const colemakLayout: LayoutData = [
    // Row 1 (Number Row) - Same labels/codes as QWERTY
    [
        { label: "`", code: "Backquote" },
        { label: "1", code: "Digit1" },
        { label: "2", code: "Digit2" },
        { label: "3", code: "Digit3" },
        { label: "4", code: "Digit4" },
        { label: "5", code: "Digit5" },
        { label: "6", code: "Digit6" },
        { label: "7", code: "Digit7" },
        { label: "8", code: "Digit8" },
        { label: "9", code: "Digit9" },
        { label: "0", code: "Digit0" },
        { label: "-", code: "Minus" },
        { label: "=", code: "Equal" },
        { label: "⌫", code: "Backspace", widthMultiplier: 2 },
    ],
    // Row 2 (Upper Letter Row)
    [
        { label: "↹", code: "Tab", widthMultiplier: 1.5 },
        { label: "Q", code: "KeyQ" }, // Q -> Q (same)
        { label: "W", code: "KeyW" }, // W -> W (same)
        { label: "F", code: "KeyE" }, // E -> F
        { label: "P", code: "KeyR" }, // R -> P
        { label: "G", code: "KeyT" }, // T -> G
        { label: "J", code: "KeyY" }, // Y -> J
        { label: "L", code: "KeyU" }, // U -> L
        { label: "U", code: "KeyI" }, // I -> U
        { label: "Y", code: "KeyO" }, // O -> Y
        { label: ";", code: "KeyP" }, // P -> ;
        { label: "[", code: "BracketLeft" }, // [ -> [ (same)
        { label: "]", code: "BracketRight" }, // ] -> ] (same)
        { label: "\\", code: "Backslash", widthMultiplier: 1.5 }, // \ -> \ (same)
    ],
    // Row 3 (Home Row)
    [
        { label: "⇪", code: "CapsLock", widthMultiplier: 1.8 },
        { label: "A", code: "KeyA" }, // A -> A (same)
        { label: "R", code: "KeyS" }, // S -> R
        { label: "S", code: "KeyD" }, // D -> S
        { label: "T", code: "KeyF" }, // F -> T
        { label: "D", code: "KeyG" }, // G -> D
        { label: "H", code: "KeyH" }, // H -> H (same)
        { label: "N", code: "KeyJ" }, // J -> N
        { label: "E", code: "KeyK" }, // K -> E
        { label: "I", code: "KeyL" }, // L -> I
        { label: "O", code: "Semicolon" }, // ; -> O
        { label: "'", code: "Quote" }, // ' -> ' (same)
        { label: "↵", code: "Enter", widthMultiplier: 2.2 },
    ],
    // Row 4 (Lower Letter Row)
    [
        { label: "⇧", code: "ShiftLeft", widthMultiplier: 2.5 },
        { label: "Z", code: "KeyZ" }, // Z -> Z (same)
        { label: "X", code: "KeyX" }, // X -> X (same)
        { label: "C", code: "KeyC" }, // C -> C (same)
        { label: "V", code: "KeyV" }, // V -> V (same)
        { label: "B", code: "KeyB" }, // B -> B (same)
        { label: "K", code: "KeyN" }, // N -> K
        { label: "M", code: "KeyM" }, // M -> M (same)
        { label: ",", code: "Comma" }, // , -> , (same)
        { label: ".", code: "Period" }, // . -> . (same)
        { label: "/", code: "Slash" }, // / -> / (same)
        { label: "⇧", code: "ShiftRight", widthMultiplier: 2.5 },
    ],
    // Row 5 (Bottom/Space Row) - Same labels/codes as QWERTY
    [
        { label: "⌃", code: "ControlLeft", widthMultiplier: 1.5 },
        { label: "⌘", code: "MetaLeft", widthMultiplier: 1.2 },
        { label: "⌥", code: "AltLeft", widthMultiplier: 1.2 },
        { label: "␣", code: "Space", widthMultiplier: 6.5 },
        { label: "⌥", code: "AltRight", widthMultiplier: 1.2 },
        { label: "⌘", code: "MetaRight", widthMultiplier: 1.2 },
        { label: "⌃", code: "ControlRight", widthMultiplier: 1.5 },
    ],
];

export const programmersDvorakLayout: LayoutData = [
    // Row 1 (Number Row)
    [
        { label: "`", shiftLabel: "~", code: "Backquote" },
        { label: "&", shiftLabel: "1", code: "Digit1" },
        { label: "[", shiftLabel: "2", code: "Digit2" },
        { label: "{", shiftLabel: "3", code: "Digit3" },
        { label: "}", shiftLabel: "4", code: "Digit4" },
        { label: "(", shiftLabel: "5", code: "Digit5" },
        { label: "=", shiftLabel: "6", code: "Digit6" },
        { label: "*", shiftLabel: "7", code: "Digit7" },
        { label: ")", shiftLabel: "8", code: "Digit8" },
        { label: "+", shiftLabel: "9", code: "Digit9" },
        { label: "]", shiftLabel: "0", code: "Digit0" },
        { label: "!", shiftLabel: "#", code: "Minus" },
        { label: "#", shiftLabel: "%", code: "Equal" },
        { label: "⌫", code: "Backspace", widthMultiplier: 2 },
    ],
    // Row 2 (Upper Letter Row)
    [
        { label: "↹", code: "Tab", widthMultiplier: 1.5 },
        { label: ";", shiftLabel: ":", code: "KeyQ" },
        { label: ",", shiftLabel: "<", code: "KeyW" },
        { label: ".", shiftLabel: ">", code: "KeyE" },
        { label: "P", code: "KeyR" },
        { label: "Y", code: "KeyT" },
        { label: "F", code: "KeyY" },
        { label: "G", code: "KeyU" },
        { label: "C", code: "KeyI" },
        { label: "R", code: "KeyO" },
        { label: "L", code: "KeyP" },
        { label: "/", shiftLabel: "?", code: "BracketLeft" },
        { label: "=", shiftLabel: "+", code: "BracketRight" },
        {
            label: "\\",
            shiftLabel: "|",
            code: "Backslash",
            widthMultiplier: 1.5,
        },
    ],
    // Row 3 (Home Row)
    [
        { label: "⇪", code: "CapsLock", widthMultiplier: 1.8 },
        { label: "A", code: "KeyA" },
        { label: "O", code: "KeyS" },
        { label: "E", code: "KeyD" },
        { label: "U", code: "KeyF" },
        { label: "I", code: "KeyG" },
        { label: "D", code: "KeyH" },
        { label: "H", code: "KeyJ" },
        { label: "T", code: "KeyK" },
        { label: "N", code: "KeyL" },
        { label: "S", code: "Semicolon" },
        { label: "-", shiftLabel: "_", code: "Quote" },
        { label: "↵", code: "Enter", widthMultiplier: 2.2 },
    ],
    // Row 4 (Lower Letter Row)
    [
        { label: "⇧", code: "ShiftLeft", widthMultiplier: 2.5 },
        { label: "'", shiftLabel: '"', code: "KeyZ" },
        { label: "Q", code: "KeyX" },
        { label: "J", code: "KeyC" },
        { label: "K", code: "KeyV" },
        { label: "X", code: "KeyB" },
        { label: "B", code: "KeyN" },
        { label: "M", code: "KeyM" },
        { label: "W", code: "Comma" },
        { label: "V", code: "Period" },
        { label: "Z", code: "Slash" },
        { label: "⇧", code: "ShiftRight", widthMultiplier: 2.5 },
    ],
    // Row 5 (Bottom/Space Row)
    [
        { label: "⌃", code: "ControlLeft", widthMultiplier: 1.5 },
        { label: "⌘", code: "MetaLeft", widthMultiplier: 1.2 },
        { label: "⌥", code: "AltLeft", widthMultiplier: 1.2 },
        { label: "␣", code: "Space", widthMultiplier: 6.5 },
        { label: "⌥", code: "AltRight", widthMultiplier: 1.2 },
        { label: "⌘", code: "MetaRight", widthMultiplier: 1.2 },
        { label: "⌃", code: "ControlRight", widthMultiplier: 1.5 },
    ],
];

export const realProgrammersDvorakLayout: LayoutData = [
    // Row 1 (Number Row)
    [
        { label: "$", shiftLabel: "~", code: "Backquote" },
        { label: "+", shiftLabel: "1", code: "Digit1" },
        { label: "[", shiftLabel: "2", code: "Digit2" },
        { label: "{", shiftLabel: "3", code: "Digit3" },
        { label: "(", shiftLabel: "4", code: "Digit4" },
        { label: "&", shiftLabel: "5", code: "Digit5" },
        { label: "=", shiftLabel: "6", code: "Digit6" },
        { label: ")", shiftLabel: "7", code: "Digit7" },
        { label: "}", shiftLabel: "8", code: "Digit8" },
        { label: "]", shiftLabel: "9", code: "Digit9" },
        { label: "*", shiftLabel: "0", code: "Digit0" },
        { label: "!", shiftLabel: "%", code: "Minus" },
        { label: "|", shiftLabel: "`", code: "Equal" },
        { label: "⌫", code: "Backspace", widthMultiplier: 2 },
    ],
    // Row 2 (Upper Letter Row)
    [
        { label: "↹", code: "Tab", widthMultiplier: 1.5 },
        { label: ";", shiftLabel: ":", code: "KeyQ" },
        { label: ",", shiftLabel: "<", code: "KeyW" },
        { label: ".", shiftLabel: ">", code: "KeyE" },
        { label: "P", code: "KeyR" },
        { label: "Y", code: "KeyT" },
        { label: "F", code: "KeyY" },
        { label: "G", code: "KeyU" },
        { label: "C", code: "KeyI" },
        { label: "R", code: "KeyO" },
        { label: "L", code: "KeyP" },
        { label: "/", shiftLabel: "?", code: "BracketLeft" },
        { label: "@", shiftLabel: "^", code: "BracketRight" },
        {
            label: "\\",
            shiftLabel: "#",
            code: "Backslash",
            widthMultiplier: 1.5,
        },
    ],
    // Row 3 (Home Row)
    [
        { label: "⇪", code: "CapsLock", widthMultiplier: 1.8 },
        { label: "A", code: "KeyA" },
        { label: "O", code: "KeyS" },
        { label: "E", code: "KeyD" },
        { label: "U", code: "KeyF" },
        { label: "I", code: "KeyG" },
        { label: "D", code: "KeyH" },
        { label: "H", code: "KeyJ" },
        { label: "T", code: "KeyK" },
        { label: "N", code: "KeyL" },
        { label: "S", code: "Semicolon" },
        { label: "-", shiftLabel: "_", code: "Quote" },
        { label: "↵", code: "Enter", widthMultiplier: 2.2 },
    ],
    // Row 4 (Lower Letter Row)
    [
        { label: "⇧", code: "ShiftLeft", widthMultiplier: 2.5 },
        { label: "'", shiftLabel: '"', code: "KeyZ" },
        { label: "Q", code: "KeyX" },
        { label: "J", code: "KeyC" },
        { label: "K", code: "KeyV" },
        { label: "X", code: "KeyB" },
        { label: "B", code: "KeyN" },
        { label: "M", code: "KeyM" },
        { label: "W", code: "Comma" },
        { label: "V", code: "Period" },
        { label: "Z", code: "Slash" },
        { label: "⇧", code: "ShiftRight", widthMultiplier: 2.5 },
    ],
    // Row 5 (Bottom/Space Row)
    [
        { label: "⌃", code: "ControlLeft", widthMultiplier: 1.5 },
        { label: "⌘", code: "MetaLeft", widthMultiplier: 1.2 },
        { label: "⌥", code: "AltLeft", widthMultiplier: 1.2 },
        { label: "␣", code: "Space", widthMultiplier: 6.5 },
        { label: "⌥", code: "AltRight", widthMultiplier: 1.2 },
        { label: "⌘", code: "MetaRight", widthMultiplier: 1.2 },
        { label: "⌃", code: "ControlRight", widthMultiplier: 1.5 },
    ],
];

export const layouts: Record<Layouts, LayoutData> = {
    qwerty: qwertyLayout,
    dvorak: dvorakLayout,
    colemak: colemakLayout,
    programmersDvorak: programmersDvorakLayout,
    realProgrammersDvorak: realProgrammersDvorakLayout,
};

export const layoutNames: Record<Layouts, string> = {
    qwerty: "QWERTY",
    dvorak: "Dvorak",
    colemak: "Colemak",
    programmersDvorak: "Programmer's Dvorak",
    realProgrammersDvorak: "Real Programmer's Dvorak",
};

export const exampleSentences = [
    "Crazy Fredrick bought many very exquisite opal jewels.",
    "The quick brown fox jumps over a lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How quickly daft jumping zebras vex.",
    "Five quacking zephyrs jolt my wax bed.",
    "Jived fox nymph grabs quick waltz.",
    "Bright vixens jump; dozy fowl quack.",
    "Quick wafting zephyrs blow bold Jim.",
    "Waltz, bad nymph, for quick jigs pop.",
    "Jackdaws love my big sphinx of quartz.",
    "The Sphinx just waves at my black cat quiz.",
    "My girl wove six dozen plaid jackets before she quit.",
    "Six big devils from Japan quickly forget how to waltz.",
    "Big dwarves heckle my top quiz of jumbled functions.",
    "Few quips galvanized the mock jury box.",
    "Bawds jog, flick quartz, zip nymphs.",
    "Waltz, nymph, for quick jigs bid Bud.",
    "Fix problems quickly with galvanized jets.",
    "Heavy boxes perform quick waltzes and jigs.",
    "A wizard's job is to zap chumps quickly in fog.",
];

function createKeyMap(qwertyLayout: LayoutData, targetLayout: LayoutData) {
    const map = new Map<string, string>();

    qwertyLayout.forEach((row, rowIndex) => {
        row.forEach((key) => {
            const targetKey = targetLayout[rowIndex]?.find(
                (k) => k.code === key.code,
            );
            if (targetKey) {
                map.set(key.label.toLowerCase(), targetKey.label.toLowerCase());
                if (key.shiftLabel && targetKey.shiftLabel) {
                    map.set(key.shiftLabel, targetKey.shiftLabel);
                }
            }
        });
    });

    return map;
}

export const qwertyToDvorakMap = createKeyMap(qwertyLayout, dvorakLayout);
export const qwertyToColemakMap = createKeyMap(qwertyLayout, colemakLayout);
export const qwertyToProgrammersDvorakMap = createKeyMap(
    qwertyLayout,
    programmersDvorakLayout,
);
export const qwertyToRealProgrammersDvorakMap = createKeyMap(
    qwertyLayout,
    realProgrammersDvorakLayout,
);

export const zmkKeymapString = `
// ╭────────────────────────┬────────────────────────┬────────────────────────┬────────────────────────┬────────────────────────┬────────────────────────╮                                                           ╭────────────────────────┬────────────────────────┬────────────────────────┬───────────────────────┬────────────────────────┬────────────────────────╮
     &kp CAPS                 &kp N7                   &kp N5                   &kp N3                   &kp N1                   &kp N9                                                                               &kp N0                   &kp N2                   &kp N4                   &kp N6                  &kp N8                   &kp DEL
// │────────────────────────┼────────────────────────┼────────────────────────┼────────────────────────┼────────────────────────┼────────────────────────│                                                           │────────────────────────┼────────────────────────┼───────────────────────┼───────────────────────┼────────────────────────┼────────────────────────│
     &kp LBKT                 &kp Q                    &kp W                    &kp F                    &kp P                    &kp B                                                                                &kp J                    &kp L                    &kp U                    &kp Y                   &kp SEMI                 &kp RBKT
// │────────────────────────┼────────────────────────┼────────────────────────┼────────────────────────┼────────────────────────┼───────────────────────│                                                           │────────────────────────┼────────────────────────┼────────────────────────┼───────────────────────┼────────────────────────┼────────────────────────│
     &kp ESC                  &hm_l LCTRL A            &hm_l LALT R             &hm_l LGUI S             &hm_shift_l LSHIFT T     &kp G                                                                                &kp M                    &hm_shift_r RSHIFT N     &hm_r RGUI E             &hm_r RALT I            &hm_r RCTRL O            &kp SQT
// │────────────────────────┼───────────────────────┼────────────────────────┼────────────────────────┼────────────────────────┼────────────────────────│────────────────────────╮         ╭────────────────────────│────────────────────────┼────────────────────────┼────────────────────────┼───────────────────────┼────────────────────────┼────────────────────────│
     &kp BSLH                 &kp Z                    &kp X                    &kp C                    &kp D                    &kp V                    &kp MINUS                          &kp EQUAL                &kp K                    &kp H                    &kp COMMA                &kp DOT                 &kp FSLH                 &kp GRAVE
// ╰────────────────────────┴────────────────────────┼────────────────────────┼────────────────────────┼────────────────────────┼────────────────────────┤────────────────────────╯         ╰────────────────────────├────────────────────────┼───────────────────────┼────────────────────────┼───────────────────────┼────────────────────────┴────────────────────────╯
                                                       &tog NAVIGATION          &mo NAVIGATION           &kp TAB                  &kp SPACE                                                                            &kp RET                  &kp BSPC                 &mo FUNCTION            &tog FUNCTION
//                                                   ╰────────────────────────┴────────────────────────┴────────────────────────┴────────────────────────╯                                                           ╰────────────────────────┴────────────────────────┴────────────────────────┴───────────────────────╯
`;
