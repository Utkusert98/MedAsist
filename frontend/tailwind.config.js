/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // Sayfaların olduğu yer
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",      // (Varsa) Pages klasörü
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Navbar'ın olduğu yer
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}