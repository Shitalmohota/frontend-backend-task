/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL FIX: The content array must point to all files using Tailwind classes.
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Required for App Router pages
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}