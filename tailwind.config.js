/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Цвета Пятерочки
        'pyaterochka': {
          'red': '#E31E24',
          'red-dark': '#C41E3A',
          'red-light': '#FF6B6B',
          'green': '#4CAF50',
          'green-dark': '#388E3C',
          'yellow': '#FFC107',
          'orange': '#FF9800',
          'blue': '#2196F3',
          'gray': {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121'
          }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Roboto', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'pyaterochka': '0 2px 8px rgba(227, 30, 36, 0.1)',
        'pyaterochka-lg': '0 4px 16px rgba(227, 30, 36, 0.15)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      }
    },
  },
  plugins: [],
}
