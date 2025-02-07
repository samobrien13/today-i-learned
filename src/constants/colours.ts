import tailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const tailwindColours = tailwindConfig.theme.colors as Record<
    string,
    string | Record<string, string>
>;

const keys: string[] = [];

Object.keys(tailwindColours).forEach((key) => {
    const colour = tailwindColours[key];

    if (typeof colour === "string") {
        keys.push(key);
    } else {
        Object.keys(colour).forEach((subKey) => {
            if (subKey === "DEFAULT") {
                keys.push(key);
            } else {
                keys.push(`${key}-${subKey}`);
            }
        });
    }
});

const fullConfig = resolveConfig(tailwindConfig);

const colours = fullConfig.theme.colors;

const cssVar = (name: string) => {
    if (typeof getComputedStyle === "undefined") {
        return "";
    }
    return getComputedStyle(document.documentElement).getPropertyValue(name);
};

export { keys, colours, cssVar };
