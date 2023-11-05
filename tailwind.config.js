/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            'sans': 'Roboto-1, sans ,-apple-system, apple color emoji, BlinkMacSystemFont, Segoe UI, Oxygen-Sans, Ubuntu,Cantarell, Helvetica Neue',
        },
        extend: {},
    },


    plugins: [require('daisyui')],
}