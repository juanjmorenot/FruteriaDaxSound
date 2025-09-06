import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
    numberOfPieces?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ numberOfPieces = 250 }) => {
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
        const colors = ['#f97316', '#fb923c', '#fdba74', '#4ade80', '#a3e635', '#f43f5e', '#6366f1'];

        const createParticles = () => {
            const pieces = numberOfPieces;
            for (let i = 0; i < pieces; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height * -1.5, // Start further above the screen
                    w: Math.random() * 12 + 6,
                    h: Math.random() * 10 + 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speed: Math.random() * 4 + 4, // Increased speed
                    speedX: Math.random() * 4 - 2, // Added horizontal speed
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 5 - 2.5 // Increased rotation speed
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach((p, index) => {
                ctx.save();
                ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();

                p.y += p.speed; // Fall down
                p.x += p.speedX; // Move sideways
                p.rotation += p.rotationSpeed;
                
                // Remove particle if it's off-screen
                if (p.y > height || p.x < -p.w || p.x > width + p.w) {
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
             canvas.width = width;
             canvas.height = height;
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