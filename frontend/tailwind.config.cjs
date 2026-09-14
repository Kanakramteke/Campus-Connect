module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CampusConnect brand colors
        primary: '#1e40af', // indigo-800
        accent: '#10b981'   // emerald-500
      }
    }
  },
  plugins: []
}
