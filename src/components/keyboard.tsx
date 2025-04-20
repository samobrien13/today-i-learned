import clsx from "clsx";

type KeyboardKeyProps = {
    normal?: string;
    shifted?: string;
    mod?: string;
    hold?: string;
    size?: "reg" | "lg";
    className?: string;
};

function KeyboardKey({
    normal,
    shifted,
    mod,
    hold,
    size = "reg",
    className,
}: KeyboardKeyProps) {
    return (
        <div
            className={clsx(
                "relative flex h-16 flex-col items-center justify-center rounded-md border",
                {
                    "w-28": size === "lg",
                    "w-16": size === "reg",
                },
                className,
            )}
        >
            {mod && (
                <span className="bg-muted absolute top-1 rounded px-1 text-xs text-gray-500">
                    {mod}
                </span>
            )}
            {shifted && (
                <span className="text-sm text-gray-500">{shifted}</span>
            )}
            {normal && <span className="text-lg font-bold">{normal}</span>}
            {hold && (
                <>
                    <div className="border-foreground absolute top-4 right-4 bottom-4 left-4 rounded border" />
                    <span className="text-lg font-bold">{hold}</span>
                </>
            )}
        </div>
    );
}

type KeyboardRowProps = {
    children: React.ReactNode;
};

function KeyboardRow({ children }: KeyboardRowProps) {
    return <div className="flex flex-row gap-1">{children}</div>;
}

function Spacer() {
    return <div className="w-16" />;
}

type KeyboardProps = {
    children: React.ReactNode;
};

function Keyboard({ children }: KeyboardProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-1 overflow-x-scroll md:overflow-x-visible">
            {children}
        </div>
    );
}

function Lily58() {
    return (
        <Keyboard>
            <KeyboardRow>
                <KeyboardKey normal="CAPS" />
                <KeyboardKey normal="7" shifted="&" />
                <KeyboardKey normal="5" shifted="%" />
                <KeyboardKey normal="3" shifted="#" />
                <KeyboardKey normal="1" shifted="!" />
                <KeyboardKey normal="9" shifted="(" />
                <Spacer />
                <Spacer />
                <Spacer />
                <KeyboardKey normal="0" shifted=")" />
                <KeyboardKey normal="2" shifted="@" />
                <KeyboardKey normal="4" shifted="$" />
                <KeyboardKey normal="6" shifted="^" />
                <KeyboardKey normal="8" shifted="*" />
                <KeyboardKey normal="DEL" />
            </KeyboardRow>
            <KeyboardRow>
                <KeyboardKey normal="[" shifted="{" />
                <KeyboardKey normal="Q" />
                <KeyboardKey normal="W" />
                <KeyboardKey normal="F" />
                <KeyboardKey normal="P" />
                <KeyboardKey normal="B" />
                <Spacer />
                <Spacer />
                <Spacer />
                <KeyboardKey normal="J" />
                <KeyboardKey normal="L" />
                <KeyboardKey normal="U" />
                <KeyboardKey normal="Y" />
                <KeyboardKey normal=";" shifted=":" />
                <KeyboardKey normal="]" shifted="}" />
            </KeyboardRow>
            <KeyboardRow>
                <KeyboardKey normal="ESC" />
                <KeyboardKey normal="A" mod="⌃" />
                <KeyboardKey normal="R" mod="⌥" />
                <KeyboardKey normal="S" mod="⌘" />
                <KeyboardKey normal="T" mod="⇧" />
                <KeyboardKey normal="G" />
                <Spacer />
                <Spacer />
                <Spacer />
                <KeyboardKey normal="M" mod="⇧" />
                <KeyboardKey normal="N" mod="⌘" />
                <KeyboardKey normal="E" mod="⌥" />
                <KeyboardKey normal="I" mod="⌃" />
                <KeyboardKey normal="O" />
                <KeyboardKey normal="'" shifted='"' />
            </KeyboardRow>
            <KeyboardRow>
                <KeyboardKey normal="\" shifted="|" />
                <KeyboardKey normal="Z" />
                <KeyboardKey normal="X" />
                <KeyboardKey normal="C" />
                <KeyboardKey normal="D" />
                <KeyboardKey normal="V" />
                <KeyboardKey
                    normal="-"
                    shifted="_"
                    className="-translate-y-8"
                />
                <Spacer />
                <KeyboardKey
                    normal="="
                    shifted="+"
                    className="-translate-y-8"
                />
                <KeyboardKey normal="K" />
                <KeyboardKey normal="H" />
                <KeyboardKey normal="," shifted="<" />
                <KeyboardKey normal="." shifted=">" />
                <KeyboardKey normal="/" shifted="?" />
                <KeyboardKey normal="`" shifted="~" />
            </KeyboardRow>
            <KeyboardRow>
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <KeyboardKey normal="1" />
                <KeyboardKey hold="1" />
                <KeyboardKey normal="↹" />
                <KeyboardKey normal="␣" size="lg" className="-rotate-50" />
                <Spacer />
                <KeyboardKey normal="↵" size="lg" className="rotate-50" />
                <KeyboardKey normal="⌫" />
                <KeyboardKey hold="2" />
                <KeyboardKey normal="2" />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
            </KeyboardRow>
        </Keyboard>
    );
}

export { Lily58, KeyboardKey, KeyboardRow };
