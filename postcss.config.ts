import type { Config } from "postcss-load-config";
import tailwindcss from '@tailwindcss/postcss';


const config: Config = {
    plugins: [tailwindcss()],
};

export default config;
