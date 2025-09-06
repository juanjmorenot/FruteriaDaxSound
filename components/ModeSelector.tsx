import React from 'react';
import { GameMode } from '../types';

interface ModeSelectorProps {
    onSelectMode: (mode: GameMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
    const modes = Object.values(GameMode);

    const getIconForMode = (mode: GameMode) => {
        switch (mode) {
            case GameMode.Harvest: return '🌱';
            case GameMode.Glossary: return '📦';
            case GameMode.Timed: return '⏳';
            case GameMode.Quiz: return '⛏';
            default: return '';
        }
    };

    const modeDetails: Record<GameMode, { description: string; bgColor: string; hoverBg: string; shadow: string; }> = {
        [GameMode.Harvest]: { description: 'Aprende cada fórmula a tu propio ritmo.', bgColor: 'bg-red-500', hoverBg: 'hover:bg-red-600', shadow: 'shadow-red-500/30' },
        [GameMode.Glossary]: { description: 'Busca y explora todas las fórmulas en la bodega.', bgColor: 'bg-amber-500', hoverBg: 'hover:bg-amber-600', shadow: 'shadow-amber-500/30' },
        [GameMode.Timed]: { description: 'Memoriza antes de que se acabe el tiempo.', bgColor: 'bg-lime-500', hoverBg: 'hover:bg-lime-600', shadow: 'shadow-lime-500/30' },
        [GameMode.Quiz]: { description: 'Pon a prueba tus conocimientos como granjero.', bgColor: 'bg-[#7630ff]', hoverBg: 'hover:bg-[#6228d4]', shadow: 'shadow-[#7630ff]/30' },
    }
    
    return (
        <div className="flex flex-col gap-3 md:gap-4 w-full max-w-3xl mx-auto">
            {modes.map((mode) => (
                <button
                    key={mode}
                    onClick={() => onSelectMode(mode)}
                    className={`
                        group rounded-3xl transition-all duration-300 ease-in-out shadow-lg
                        hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
                        ${modeDetails[mode].bgColor}
                        ${modeDetails[mode].hoverBg}
                        ${modeDetails[mode].shadow}
                        w-full p-5 md:p-6 flex items-center gap-4 md:gap-5 text-left
                    `}
                >
                    <span className="text-3xl md:text-4xl" aria-hidden="true">{getIconForMode(mode)}</span>
                    <div className="flex-grow">
                        <h3 className={`text-lg md:text-xl font-title font-bold text-white`}>{mode}</h3>
                        <p className="text-xs md:text-sm font-medium text-white/90 mt-1 leading-tight">
                            {modeDetails[mode].description}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default ModeSelector;