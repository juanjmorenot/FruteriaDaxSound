import React, { useState } from 'react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import HarvestMode from './views/HarvestMode';
import GlossaryMode from './views/GlossaryMode';
import TimedMode from './views/TimedMode';
import QuizMode from './views/QuizMode';
import { GameMode } from './types';

const App: React.FC = () => {
    const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

    const renderMode = (mode: GameMode) => {
        switch (mode) {
            case GameMode.Harvest:
                return <HarvestMode />;
            case GameMode.Glossary:
                return <GlossaryMode />;
            case GameMode.Timed:
                return <TimedMode />;
            case GameMode.Quiz:
                return <QuizMode />;
            default:
                return null;
        }
    };
    
    const handleSelectMode = (mode: GameMode) => {
        setSelectedMode(mode);
    };

    const handleReturnToMenu = () => {
        setSelectedMode(null);
    };

    // Adjust main content area classes based on the selected mode.
    // When a mode is selected (header hidden), use full padding.
    // On the main menu (header visible), reduce top padding.
    const mainContainerClasses = `container mx-auto ${
        selectedMode === null ? 'p-4 pt-2 md:p-8 md:pt-4' : 'p-4 md:p-8'
    }`;

    return (
        // Use `min-h-screen` to allow the container to grow with its content, enabling natural scrolling.
        <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
            {/* The Header is only displayed on the main menu screen. */}
            {selectedMode === null && <Header />}
            
            <main className={mainContainerClasses}>
                {selectedMode === null ? (
                    <ModeSelector onSelectMode={handleSelectMode} />
                ) : (
                    <div>
                         <div className="mb-6 text-left w-full max-w-4xl mx-auto">
                            <button
                                onClick={handleReturnToMenu}
                                className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all transform hover:scale-105 text-sm"
                                aria-label="Volver al menú principal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver al Menú
                            </button>
                        </div>
                        {renderMode(selectedMode)}
                    </div>
                )}
            </main>
            
            {/* The flex-grow spacer pushes the footer down when content is shorter than the viewport. */}
            <div className="flex-grow" />
            <footer className="text-center py-4 text-xs text-slate-400 flex-shrink-0">
                <p>Frutería DAX - Tu forma divertida de aprender DAX</p>
            </footer>
        </div>
    );
};

export default App;