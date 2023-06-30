/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                black: "#08090A",
                white: "#F2F7F2",
                rose: "#A7A2A9",
                gray: "#575A5E",
                green: "#4C9F70",
                red: "#EF271B",
                blue: "#00B4D8"
            },
            rotate: {
                '270': '270deg',
            }
        },
    },
    plugins: [],
}