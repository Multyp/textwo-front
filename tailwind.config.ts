import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    theme: {
      extend: {
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
        colors: {
          background: '#1f1f1f',
          mainTitle: '#fff',
          subtitle: '#ccc',
          text: '#ccc',
          modalContextTitle: '#6b46c1',
          primaryButton: '#6b46c1',
          'primaryButtonHover': '#b692c3',
          secondaryButton: '#f39c12',
          secondaryButtonHover: '#ffc04d',
          infoButton: '#3498db',
          infoButtonHover: '#70b9e8',
          redirectButton: '#27ae60',
          redirectButtonHover: '#3EBD81',
          errorButton: '#e74c3c',
          errorButtonHover: '#F38B7C',
          outlinedButtonBorder: '#6b46c1',
          outlinedButtonBg: 'transparent',
          outlinedButtonBorderHover: '#6b46c1',
          outlinedButtonBgHover: '#6b46c1',
          outlinedButtonHover: '#6b46c1',
          outlinedButtonTextHover: '#fff',
        },
      },
    },
  },
  plugins: [],
};
export default config;
