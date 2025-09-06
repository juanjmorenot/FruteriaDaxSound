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
                    <div className={`[grid-area:1/1] backface-hidden flex flex-col items-center justify-center p-6 rounded-[2rem] shadow-xl shadow-orange-500/20 border ${theme.bgColor} border-current ${theme.color} min-h-[24rem]`}>
                        <div className="text-center">
                            <span className="text-6xl">{theme.icon}</span>
                            <h2 className="text-3xl font-extrabold mt-4">{formula.name}</h2>
                        </div>
                    </div>

                    {/* Back of the card */}
                    <div className={`[grid-area:1/1] backface-hidden rotate-y-180 flex flex-col p-6 rounded-[2rem] shadow-xl shadow-stone-500/10 bg-white border border-stone-200`}>
                        <div className="flex-grow">
                             <div className="text-center mb-4 pb-4 border-b border-stone-200">
                                <h2 className="text-2xl font-extrabold text-stone-800">
                                    <span className="text-3xl">{theme.icon}</span> {formula.name}
                                </h2>
                                <p className={`font-bold mt-1 ${theme.color} text-sm`}>{formula.category}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className={`text-base font-bold ${theme.color}`}>Uso: ¿Para qué sirve esta "fruta"?</h3>
                                <p className="text-stone-600 mt-1">{formula.usage}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className={`text-base font-bold ${theme.color}`}>Sintaxis:</h3>
                                <pre className="text-xs bg-neutral-100 p-4 rounded-xl mt-1 text-stone-700 whitespace-pre-wrap break-words"><code>{formula.syntax}</code></pre>
                            </div>
                            <div>
                                <h3 className={`text-base font-bold ${theme.color}`}>Ejemplo de la Frutería:</h3>
                                <pre className="text-xs bg-neutral-100 p-4 rounded-xl mt-1 text-stone-700 whitespace-pre-wrap break-words"><code>{formula.example}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;