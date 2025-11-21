import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                maroon: {
                    50: '#fdf4f4',
                    100: '#fbe8e8',
                    200: '#f6d5d5',
                    300: '#eeb3b3',
                    400: '#e38989',
                    500: '#d35f5f',
                    600: '#b84040',
                    700: '#8b1a1a',
                    800: '#6b1515',
                    900: '#4a0f0f',
                    950: '#2d0909',
                },
                gold: {
                    50: '#fffef7',
                    100: '#fffaeb',
                    200: '#fff4c7',
                    300: '#ffe99f',
                    400: '#ffd966',
                    500: '#ffc933',
                    600: '#d4a017',
                    700: '#b8860b',
                    800: '#8b6914',
                    900: '#6b5416',
                },
                cream: {
                    50: '#fefdfb',
                    100: '#fdfbf7',
                    200: '#fbf7ef',
                    300: '#f8f3e7',
                    400: '#f5efdf',
                    500: '#f2ebd7',
                    600: '#e8ddc5',
                    700: '#d4c9b1',
                },
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
