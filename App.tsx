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

    return (
        <div className="min-h-screen bg-neutral-50 text-stone-700 flex flex-col">
            {selectedMode === null && <Header />}
            <main className={`container mx-auto p-4 md:p-8 flex-grow flex flex-col ${selectedMode ? 'justify-start' : 'justify-center'}`}>
                {selectedMode === null ? (
                    <ModeSelector onSelectMode={handleSelectMode} />
                ) : (
                    <div>
                         <div className="mb-6 text-left w-full max-w-4xl mx-auto">
                            <button
                                onClick={handleReturnToMenu}
                                className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-stone-300 rounded-full shadow-sm text-stone-600 font-bold hover:bg-orange-50/80 transition transform hover:scale-105 text-sm"
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
             {selectedMode === null && (
                <footer className="text-center py-4 text-xs text-stone-500">
                    <p>Frutería DAX - Tu forma divertida de aprender DAX</p>
                </footer>
            )}
        </div>
    );
};

export default App;