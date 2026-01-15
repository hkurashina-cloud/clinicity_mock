/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FF4B91',
                secondary: '#9F4BFF',
            },
            backgroundImage: {
                'accent-gradient': 'linear-gradient(to right, #FF4B91, #9F4BFF)',
            }
        },
    },
    plugins: [],
}
