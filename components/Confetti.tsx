import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
    numberOfPieces?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ numberOfPieces = 200 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: any[] = [];
        const fruitEmojis = ['🍓', '🍊', '🫐', '🍐', '🍇', '🍒', '🍋', '🥝', '🍍', '🍉', '🍑', '🥭', '🍏'];

        const createParticles = () => {
            const pieces = numberOfPieces;
            for (let i = 0; i < pieces; i++) {
                particles.push({
                    x: Math.random() * width, // Start from random x positions across the top
                    y: Math.random() * -height * 0.5 - 50, // Start at various heights above the screen
                    size: Math.random() * 20 + 20, // Emoji font size
                    emoji: fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)],
                    speedX: (Math.random() - 0.5) * 4, // Gentle horizontal drift
                    speedY: Math.random() * 5 + 2, // Initial downward velocity
                    gravity: 0.15, // Softer gravity for a more floaty effect
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 10
                });
            }
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach((p, index) => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                
                ctx.font = `${p.size}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.emoji, 0, 0);
                
                ctx.restore();

                // Apply physics
                p.speedY += p.gravity;
                
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;
                
                // Remove particle if it's off-screen
                if (p.y > height + p.size) {
                    particles.splice(index, 1);
                }
            });
            
            if (particles.length > 0) {
                animationFrameId.current = requestAnimationFrame(draw);
            }
        };

        createParticles();
        draw();

        const handleResize = () => {
             width = window.innerWidth;
             height = window.innerHeight;
             if (canvas) {
                canvas.width = width;
                canvas.height = height;
             }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener('resize', handleResize);
        }

    }, [numberOfPieces]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />;
};

export default Confetti;
