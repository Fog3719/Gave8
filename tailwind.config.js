/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,pug}",
    "./src/templates/**/*.pug"
    
  ],
  theme: {
    extend: {
      fontFamily: {
        'knewave': ['knewave', 'sans-serif']
      },
      maxWidth: {
        'custom-1200': '1200px', 
        'custom-1600': '1600px',// 定义自定义宽度
      },
    },
  },
  plugins: [],
}

