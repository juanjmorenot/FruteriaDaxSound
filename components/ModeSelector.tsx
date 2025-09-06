
import React from 'react';
import { GameMode } from '../types';

interface ModeSelectorProps {
    activeMode: GameMode;
    onSelectMode: (mode: GameMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ activeMode, onSelectMode }) => {
    const modes = Object.values(GameMode);

    const getIconForMode = (mode: GameMode) => {
        switch (mode) {
            case GameMode.Harvest: return '🍓';
            case GameMode.Glossary: return '📚';
            case GameMode.Timed: return '⏱️';
            case GameMode.Quiz: return '❓';
            default: return '';
        }
    };
    
    return (
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200">
            {modes.map((mode) => (
                <button
                    key={mode}
                    onClick={() => onSelectMode(mode)}
                    className={`
                        flex-grow md:flex-grow-0 px-4 py-2 text-sm md:text-base font-bold rounded-lg transition-all duration-300 transform 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
                        ${
                            activeMode === mode
                                ? 'bg-green-500 text-white shadow-lg scale-105'
                                : 'bg-white text-slate-700 hover:bg-amber-100 hover:-translate-y-1'
                        }
                    `}
                >
                    <span className="mr-2">{getIconForMode(mode)}</span>
                    {mode}
                </button>
            ))}
        </div>
    );
};

export default ModeSelector;
