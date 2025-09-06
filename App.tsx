
import React, { useState } from 'react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import HarvestMode from './views/HarvestMode';
import GlossaryMode from './views/GlossaryMode';
import TimedMode from './views/TimedMode';
import QuizMode from './views/QuizMode';
import { GameMode } from './types';

const App: React.FC = () => {
    const [mode, setMode] = useState<GameMode>(GameMode.Harvest);

    const renderMode = () => {
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
                return <HarvestMode />;
        }
    };

    return (
        <div className="min-h-screen bg-amber-50 text-slate-800">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <ModeSelector activeMode={mode} onSelectMode={setMode} />
                <div className="mt-8">
                    {renderMode()}
                </div>
            </main>
             <footer className="text-center py-4 text-sm text-slate-500">
                <p>Frutería DAX - Tu forma divertida de aprender DAX</p>
            </footer>
        </div>
    );
};

export default App;
