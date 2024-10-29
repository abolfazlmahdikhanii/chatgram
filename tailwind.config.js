/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        fontFamily: {
            'sans': 'Roboto-1, sans ,-apple-system, apple color emoji, BlinkMacSystemFont, Segoe UI, Oxygen-Sans, Ubuntu,Cantarell, Helvetica Neue',
        },
        extend: {},
    },


    plugins: [require('daisyui'),animations],
    daisyui: {
        themes: ['light', 'dark'],
      },
}