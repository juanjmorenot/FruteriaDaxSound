import React from 'react';
import { GameMode } from '../types';

interface ModeSelectorProps {
    onSelectMode: (mode: GameMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
    const modes = Object.values(GameMode);

    const getIconForMode = (mode: GameMode) => {
        switch (mode) {
            case GameMode.Harvest: return '🍓';
            case GameMode.Glossary: return '📦';
            case GameMode.Timed: return '⏱️';
            case GameMode.Quiz: return '👨‍🌾';
            default: return '';
        }
    };

    const modeDetails: Record<GameMode, { description: string; bgColor: string; fontWeight: string; }> = {
        [GameMode.Harvest]: { description: 'Aprende cada fórmula a tu propio ritmo.', bgColor: 'bg-amber-500 hover:bg-amber-600', fontWeight: 'font-bold' },
        [GameMode.Glossary]: { description: 'Busca y explora todas las fórmulas en la bodega.', bgColor: 'bg-orange-500 hover:bg-orange-600', fontWeight: 'font-bold' },
        [GameMode.Timed]: { description: 'Memoriza antes de que se acabe el tiempo.', bgColor: 'bg-rose-500 hover:bg-rose-600', fontWeight: 'font-bold' },
        [GameMode.Quiz]: { description: 'Pon a prueba tus conocimientos como granjero.', bgColor: 'bg-indigo-500 hover:bg-indigo-600', fontWeight: 'font-bold' },
    }
    
    return (
        <div className="flex flex-col gap-3 md:gap-4 w-full max-w-3xl mx-auto">
            {modes.map((mode) => (
                <button
                    key={mode}
                    onClick={() => onSelectMode(mode)}
                    className={`
                        rounded-3xl transition-all duration-300 ease-in-out shadow-lg text-white
                        ${modeDetails[mode].bgColor}
                        hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
                        w-full p-5 md:p-6 flex items-center gap-4 md:gap-5 text-left
                    `}
                >
                    <span className="text-3xl md:text-4xl" aria-hidden="true">{getIconForMode(mode)}</span>
                    <div className="flex-grow">
                        <h3 className={`text-lg md:text-xl font-title ${modeDetails[mode].fontWeight}`}>{mode}</h3>
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