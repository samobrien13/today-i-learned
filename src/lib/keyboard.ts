export interface KeyData {
    label: string;
    code: string; // Corresponds to KeyboardEvent.code
    widthMultiplier?: number;
}

export type LayoutData = KeyData[][];

export type Layouts = "qwerty" | "dvorak" | "colemak";

export const qwertyLayout: LayoutData = [
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
        { label: "Backspace", code: "Backspace", widthMultiplier: 2 },
    ],
    [
        { label: "Tab", code: "Tab", widthMultiplier: 1.5 },
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
        { label: "[", code: "BracketLeft" },
        { label: "]", code: "BracketRight" },
        { label: "\\", code: "Backslash", widthMultiplier: 1.5 },
    ],
    [
        { label: "Caps Lock", code: "CapsLock", widthMultiplier: 1.8 },
        { label: "A", code: "KeyA" },
        { label: "S", code: "KeyS" },
        { label: "D", code: "KeyD" },
        { label: "F", code: "KeyF" },
        { label: "G", code: "KeyG" },
        { label: "H", code: "KeyH" },
        { label: "J", code: "KeyJ" },
        { label: "K", code: "KeyK" },
        { label: "L", code: "KeyL" },
        { label: ";", code: "Semicolon" },
        { label: "'", code: "Quote" },
        { label: "Enter", code: "Enter", widthMultiplier: 2.2 },
    ],
    [
        { label: "Shift", code: "ShiftLeft", widthMultiplier: 2.5 },
        { label: "Z", code: "KeyZ" },
        { label: "X", code: "KeyX" },
        { label: "C", code: "KeyC" },
        { label: "V", code: "KeyV" },
        { label: "B", code: "KeyB" },
        { label: "N", code: "KeyN" },
        { label: "M", code: "KeyM" },
        { label: ",", code: "Comma" },
        { label: ".", code: "Period" },
        { label: "/", code: "Slash" },
        { label: "Shift", code: "ShiftRight", widthMultiplier: 2.5 },
    ],
    [
        { label: "Ctrl", code: "ControlLeft", widthMultiplier: 1.5 },
        { label: "Win", code: "MetaLeft", widthMultiplier: 1.2 },
        { label: "Alt", code: "AltLeft", widthMultiplier: 1.2 },
        { label: "Space", code: "Space", widthMultiplier: 6.5 },
        { label: "Alt", code: "AltRight", widthMultiplier: 1.2 },
        { label: "Win", code: "MetaRight", widthMultiplier: 1.2 },
        // { label: 'Menu', code: 'ContextMenu' }, // Often missing or different code
        { label: "Ctrl", code: "ControlRight", widthMultiplier: 1.5 },
    ],
];

export const dvorakLayout: LayoutData = [
    // Row 1 (Number Row) - Same labels/codes as QWERTY for numbers/symbols
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
        { label: "[", code: "BracketLeft" }, // Dvorak specific
        { label: "]", code: "BracketRight" }, // Dvorak specific
        { label: "Backspace", code: "Backspace", widthMultiplier: 2 },
    ],
    // Row 2 (Upper Letter Row)
    [
        { label: "Tab", code: "Tab", widthMultiplier: 1.5 },
        { label: "'", code: "KeyQ" }, // Q -> '
        { label: ",", code: "KeyW" }, // W -> ,
        { label: ".", code: "KeyE" }, // E -> .
        { label: "P", code: "KeyR" }, // R -> P
        { label: "Y", code: "KeyT" }, // T -> Y
        { label: "F", code: "KeyY" }, // Y -> F
        { label: "G", code: "KeyU" }, // U -> G
        { label: "C", code: "KeyI" }, // I -> C
        { label: "R", code: "KeyO" }, // O -> R
        { label: "L", code: "KeyP" }, // P -> L
        { label: "/", code: "BracketLeft" }, // [ -> /
        { label: "=", code: "BracketRight" }, // ] -> =
        { label: "\\", code: "Backslash", widthMultiplier: 1.5 }, // \ -> \ (same position)
    ],
    // Row 3 (Home Row)
    [
        { label: "Caps Lock", code: "CapsLock", widthMultiplier: 1.8 },
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
        { label: "Enter", code: "Enter", widthMultiplier: 2.2 },
    ],
    // Row 4 (Lower Letter Row)
    [
        { label: "Shift", code: "ShiftLeft", widthMultiplier: 2.5 },
        { label: ";", code: "KeyZ" }, // Z -> ;
        { label: "Q", code: "KeyX" }, // X -> Q
        { label: "J", code: "KeyC" }, // C -> J
        { label: "K", code: "KeyV" }, // V -> K
        { label: "X", code: "KeyB" }, // B -> X
        { label: "B", code: "KeyN" }, // N -> B
        { label: "M", code: "KeyM" }, // M -> M (same position)
        { label: "W", code: "Comma" }, // , -> W
        { label: "V", code: "Period" }, // . -> V
        { label: "Z", code: "Slash" }, // / -> Z
        { label: "Shift", code: "ShiftRight", widthMultiplier: 2.5 },
    ],
    // Row 5 (Bottom/Space Row) - Same labels/codes as QWERTY
    [
        { label: "Ctrl", code: "ControlLeft", widthMultiplier: 1.5 },
        { label: "Win", code: "MetaLeft", widthMultiplier: 1.2 },
        { label: "Alt", code: "AltLeft", widthMultiplier: 1.2 },
        { label: "Space", code: "Space", widthMultiplier: 6.5 },
        { label: "Alt", code: "AltRight", widthMultiplier: 1.2 },
        { label: "Win", code: "MetaRight", widthMultiplier: 1.2 },
        // { label: 'Menu', code: 'ContextMenu' }, // Optional
        { label: "Ctrl", code: "ControlRight", widthMultiplier: 1.5 },
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
        { label: "Backspace", code: "Backspace", widthMultiplier: 2 },
    ],
    // Row 2 (Upper Letter Row)
    [
        { label: "Tab", code: "Tab", widthMultiplier: 1.5 },
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
        // Colemak often maps CapsLock to Backspace, but the code remains CapsLock
        // unless physically rewired. Label can be 'Backspace' or 'Caps Lock'.
        { label: "Caps Lock", code: "CapsLock", widthMultiplier: 1.8 },
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
        { label: "Enter", code: "Enter", widthMultiplier: 2.2 },
    ],
    // Row 4 (Lower Letter Row)
    [
        { label: "Shift", code: "ShiftLeft", widthMultiplier: 2.5 },
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
        { label: "Shift", code: "ShiftRight", widthMultiplier: 2.5 },
    ],
    // Row 5 (Bottom/Space Row) - Same labels/codes as QWERTY
    [
        { label: "Ctrl", code: "ControlLeft", widthMultiplier: 1.5 },
        { label: "Win", code: "MetaLeft", widthMultiplier: 1.2 },
        { label: "Alt", code: "AltLeft", widthMultiplier: 1.2 },
        { label: "Space", code: "Space", widthMultiplier: 6.5 },
        { label: "Alt", code: "AltRight", widthMultiplier: 1.2 },
        { label: "Win", code: "MetaRight", widthMultiplier: 1.2 },
        // { label: 'Menu', code: 'ContextMenu' }, // Optional
        { label: "Ctrl", code: "ControlRight", widthMultiplier: 1.5 },
    ],
];

export const layouts: Record<Layouts, LayoutData> = {
    qwerty: qwertyLayout,
    dvorak: dvorakLayout,
    colemak: colemakLayout,
};
