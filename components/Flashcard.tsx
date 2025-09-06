import React, { useState } from 'react';
import { DAXFormula } from '../types';
import { CATEGORY_THEME } from '../constants';
import Icon from './Icon';

interface FlashcardProps {
    formula: DAXFormula;
}

const Flashcard: React.FC<FlashcardProps> = ({ formula }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const theme = CATEGORY_THEME[formula.category];

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="perspective-1000 w-full max-w-2xl mx-auto" onClick={handleFlip} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleFlip()}>
            <div
                className={`relative w-full transition-transform duration-700 transform-style-preserve-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                }`}
            >
                <div className="grid">
                    {/* Front of the card */}
                    <div className={`[grid-area:1/1] backface-hidden flex flex-col items-center justify-center p-6 rounded-3xl shadow-lg shadow-slate-200/50 border ${theme.bgColor} border-current ${theme.color} min-h-[24rem]`}>
                        <div className="text-center">
                            <span className="text-6xl">{theme.icon}</span>
                            <h2 className="text-3xl font-extrabold mt-4">{formula.name}</h2>
                        </div>
                    </div>

                    {/* Back of the card */}
                    <div className={`[grid-area:1/1] backface-hidden rotate-y-180 flex flex-col p-6 rounded-3xl shadow-lg shadow-slate-200/50 bg-white border border-slate-200`}>
                        <div className="flex-grow">
                             <div className="text-center mb-4 pb-4 border-b border-slate-200">
                                <h2 className="text-2xl font-extrabold text-slate-800">
                                    <span className="text-3xl">{theme.icon}</span> {formula.name}
                                </h2>
                                <p className={`font-bold mt-1 ${theme.color} text-sm`}>{formula.category}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className={`text-sm font-bold ${theme.color}`}>Uso: ¿Para qué sirve esta fruta?</h3>
                                <p className="text-slate-600 mt-1 text-sm">{formula.usage}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className={`text-sm font-bold ${theme.color}`}>Sintaxis:</h3>
                                <pre className="text-xs bg-slate-100 p-3 rounded-xl mt-1 text-slate-700 whitespace-pre-wrap break-words"><code>{formula.syntax}</code></pre>
                            </div>
                            <div>
                                <h3 className={`text-sm font-bold ${theme.color}`}>Ejemplo de la Frutería:</h3>
                                <pre className="text-xs bg-slate-100 p-3 rounded-xl mt-1 text-slate-700 whitespace-pre-wrap break-words"><code>{formula.example}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;