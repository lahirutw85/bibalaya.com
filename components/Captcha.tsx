import React, { useRef, useEffect, useCallback } from 'react';


interface CaptchaProps {
    onCaptchaChange: (code: string) => void;
}

export const Captcha: React.FC<CaptchaProps> = ({ onCaptchaChange }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateRandomChar = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'; // No I, l, 1, O, 0 to avoid confusion
        return chars.charAt(Math.floor(Math.random() * chars.length));
    };

    const drawCaptcha = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // specific dimensions
        const width = 200;
        const height = 70;
        canvas.width = width;
        canvas.height = height;

        // Clear background
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f3f4f6'; // light gray bg
        ctx.fillRect(0, 0, width, height);

        let captchaCode = '';

        // Add visual noise (lines)
        for (let i = 0; i < 7; i++) {
            ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
            ctx.lineWidth = Math.random() * 2;
            ctx.beginPath();
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.lineTo(Math.random() * width, Math.random() * height);
            ctx.stroke();
        }

        // Add noise (dots)
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Draw characters
        for (let i = 0; i < 6; i++) {
            const char = generateRandomChar();
            captchaCode += char;

            ctx.save();
            // Random position
            const x = 25 + i * 25;
            const y = 40 + Math.random() * 10;

            // Random rotation
            const angle = (Math.random() - 0.5) * 0.4;

            ctx.translate(x, y);
            ctx.rotate(angle);

            ctx.font = `bold ${24 + Math.random() * 10}px Arial`;
            ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 0.8)`; // Dark randomness
            ctx.fillText(char, 0, 0);
            ctx.restore();
        }

        onCaptchaChange(captchaCode);
    }, [onCaptchaChange]);

    useEffect(() => {
        drawCaptcha();
    }, [drawCaptcha]);

    return (
        <div className="flex items-center space-x-3">
            <canvas
                ref={canvasRef}
                className="rounded border border-gray-300 shadow-sm cursor-pointer"
                onClick={drawCaptcha}
                title="Click to refresh image"
            />
            <button
                type="button"
                onClick={drawCaptcha}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition-colors"
                title="Refresh CAPTCHA"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>
        </div>
    );
};
