import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DAX_FORMULAS, CATEGORY_THEME } from '../constants';
import { shuffleArray } from '../utils';

const TIME_LIMIT = 20; // 20 seconds
const SESSION_LENGTH = 10;

const TimedMode: React.FC = () => {
    const [sessionFormulas, setSessionFormulas] = useState<(typeof DAX_FORMULAS)[0][]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [isActive, setIsActive] = useState(false);

    // Fix: Initialize useRef with an initial value and update type to allow `undefined`.
    const requestRef = useRef<number | undefined>(undefined);
    // Fix: Initialize useRef with an initial value and update type to allow `undefined`.
    const startTimeRef = useRef<number | undefined>(undefined);

    const startNewSession = useCallback(() => {
        setSessionFormulas(shuffleArray(DAX_FORMULAS).slice(0, SESSION_LENGTH));
        setCurrentIndex(0);
        setTimeLeft(TIME_LIMIT);
        setIsActive(true);
    }, []);

    const animate = useCallback((time: DOMHighResTimeStamp) => {
        if (startTimeRef.current === undefined) {
            startTimeRef.current = time;
        }

        const elapsed = time - startTimeRef.current;
        const newTimeLeft = (TIME_LIMIT * 1000 - elapsed) / 1000;

        if (newTimeLeft > 0) {
            setTimeLeft(newTimeLeft);
            requestRef.current = requestAnimationFrame(animate);
        } else {
            setTimeLeft(0);
            if (currentIndex < SESSION_LENGTH - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setIsActive(false);
            }
        }
    }, [currentIndex]);

    useEffect(() => {
        if (isActive) {
            startTimeRef.current = undefined;
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isActive, currentIndex, animate]);
    
    if (!isActive) {
        return (
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl shadow-orange-500/10 max-w-lg mx-auto border border-stone-200/80">
                 <h2 className="text-2xl font-bold text-orange-500 mb-4 flex justify-center items-center gap-3">
                    <span className="text-3xl">⏱️</span>
                    <span>Modo: Jugo Contra el Reloj</span>
                 </h2>
                <p className="text-stone-600 mb-6 text-sm">
                    Memoriza toda la información de la fórmula antes de que se acabe el tiempo. ¡Completarás una racha de {SESSION_LENGTH} frutas!
                </p>
                <button
                    onClick={startNewSession}
                    className="px-8 py-3 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition transform hover:scale-105 hover:shadow-orange-500/30 text-sm"
                >
                    ¡Comenzar a exprimir!
                </button>
            </div>
        );
    }
    
    if (sessionFormulas.length === 0) return null;

    const formula = sessionFormulas[currentIndex];
    const theme = CATEGORY_THEME[formula.category];
    const progressPercentage = Math.max(0, (timeLeft / TIME_LIMIT) * 100);

    const getProgressBarColor = (percentage: number): string => {
        if (percentage > 75) {
            return 'bg-teal-500';
        }
        if (percentage > 25) {
            return 'bg-amber-400';
        }
        return 'bg-rose-500';
    };

    const progressBarColor = getProgressBarColor(progressPercentage);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="relative p-6 bg-white rounded-3xl shadow-xl shadow-orange-500/10 border border-stone-200/80">
                <div className="text-center mb-4 pb-4 border-b border-stone-200">
                    <p className="font-bold text-base text-stone-500">Fruta {currentIndex + 1} de {SESSION_LENGTH}</p>
                    <p className="text-2xl font-extrabold">{formula.name} <span className="text-3xl">{theme.icon}</span></p>
                    <p className={`font-bold mt-1 ${theme.color} text-sm`}>{formula.category}</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className={`font-bold ${theme.color} text-sm`}>Uso:</h3>
                        <p className="text-stone-600 text-xs">{formula.usage}</p>
                    </div>
                     <div>
                        <h3 className={`font-bold ${theme.color} text-sm`}>Sintaxis:</h3>
                        <pre className="text-xs bg-neutral-100 p-3 rounded-xl whitespace-pre-wrap break-words"><code>{formula.syntax}</code></pre>
                    </div>
                     <div>
                        <h3 className={`font-bold ${theme.color} text-sm`}>Ejemplo:</h3>
                        <pre className="text-xs bg-neutral-100 p-3 rounded-xl whitespace-pre-wrap break-words"><code>{formula.example}</code></pre>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                            className={`${progressBarColor} h-4 rounded-full transition-all duration-200 ease-linear`}
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimedMode;