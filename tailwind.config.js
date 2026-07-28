/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#062F36',
        lake: '#14637A',
        sage: '#71996D',
        lime: '#B7D91D',
        'soft-gray': '#C8D0DD',
        bg: '#F7F9F8',
        text: '#1F2D2F',
        muted: '#5E6B6F',
        border: '#E4E9E8',
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // RwandaWays typography scale — one shared set of sizes for every
        // heading tier across the site (hero slides, page titles, section
        // titles, card/subsection titles).
        hero: ['clamp(32px, 5vw, 64px)', { lineHeight: '1.08', fontWeight: '800' }],
        h1: ['clamp(28px, 4.2vw, 52px)', { lineHeight: '1.12', fontWeight: '800' }],
        h2: ['clamp(26px, 3.6vw, 44px)', { lineHeight: '1.15', fontWeight: '800' }],
        h3: ['clamp(19px, 2.2vw, 24px)', { lineHeight: '1.3', fontWeight: '700' }],
      },
      borderRadius: {
        pill: '100px',
        card: '28px',
      },
      boxShadow: {
        card: '0 30px 60px -20px rgba(6,47,54,.35)',
        soft: '0 12px 28px rgba(183,217,29,.35)',
      },
      maxWidth: {
        content: '1400px',
      },
      keyframes: {
        heroReveal: {
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        kenburns: {
          from: { transform: 'scale(1.08) translate(0,0)' },
          to: { transform: 'scale(1.18) translate(-1.5%,-1.5%)' },
        },
        scrollUp: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
        scrollDown: {
          from: { transform: 'translateY(-50%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        heroReveal: 'heroReveal .9s ease forwards',
        kenburns: 'kenburns 9s ease-in-out forwards',
        scrollUp: 'scrollUp 38s linear infinite',
        scrollDown: 'scrollDown 38s linear infinite',
      },
    },
  },
  plugins: [],
}
