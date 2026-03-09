import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        accent: 'var(--accent)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        noto: ['var(--font-noto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
