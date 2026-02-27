/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neonPink: '#ff007f',
                cyan: '#00f3ff',
                matrixGreen: '#00ff41',
                darkBg: '#000000',
                panelBg: 'rgba(255, 255, 255, 0.05)',
                panelBorder: 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                jetbrains: ['JetBrains Mono', 'monospace'],
                fira: ['Fira Code', 'monospace']
            },
            boxShadow: {
                neonStatic: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px var(--neon-pink), 0 0 40px var(--neon-pink)',
                neonHover: '0 0 10px #fff, 0 0 20px #fff, 0 0 40px var(--neon-pink), 0 0 80px var(--neon-pink)',
                cyanGlow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px var(--cyan), 0 0 40px var(--cyan)',
                matrixGlow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px var(--matrix-green), 0 0 40px var(--matrix-green)'
            },
            keyframes: {
                flicker: {
                    '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1', textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px var(--cyan), 0 0 40px var(--cyan)' },
                    '20%, 24%, 55%': { opacity: '0.5', textShadow: 'none' }
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px var(--neon-pink), 0 0 40px var(--neon-pink)' },
                    '50%': { boxShadow: '0 0 2px #fff, 0 0 5px #fff, 0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink)' },
                }
            },
            animation: {
                flicker: 'flicker 3s infinite alternate',
                pulseGlow: 'pulseGlow 2s infinite alternate',
            }
        },
    },
    plugins: [],
}
