import React, { useState, useEffect } from 'react';
import { DAX_FORMULAS } from '../constants';
import Flashcard from '../components/Flashcard';
import { shuffleArray } from '../utils';
import Icon from '../components/Icon';

const HarvestMode: React.FC = () => {
    const [shuffledFormulas, setShuffledFormulas] = useState(() => shuffleArray(DAX_FORMULAS));
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // On mobile, scroll to the bottom of the page to focus on the card and controls,
        // hiding the "Return to Menu" button which becomes accessible on scroll up.
        if (window.innerWidth < 768) {
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 100); // Timeout to ensure the page has rendered and scroll height is calculated.
        }
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledFormulas.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + shuffledFormulas.length) % shuffledFormulas.length);
    };
    
    const handleShuffle = () => {
        // Create a new shuffled array and reset the index
        setShuffledFormulas(shuffleArray(DAX_FORMULAS));
        setCurrentIndex(0);
    };

    return (
        // On mobile, use a flex column layout that fills most of the viewport height.
        // This pushes the controls to the bottom and makes the view scrollable, hiding the
        // "Return to Menu" button initially. On desktop, it reverts to a simpler layout.
        <div className="flex flex-col min-h-[calc(100vh-12rem)] md:min-h-0 md:items-center">
            <div className="flex-grow flex items-center w-full">
                <Flashcard formula={shuffledFormulas[currentIndex]} />
            </div>
            <div className="mt-8 mb-4 flex items-center justify-center gap-4 w-full max-w-2xl flex-shrink-0">
                <button onClick={handlePrev} className="p-3 bg-white rounded-full shadow-md hover:bg-orange-50 transition transform hover:scale-110" aria-label="Anterior">
                    <Icon name="prev" />
                </button>
                <div className="text-center font-bold text-stone-500 w-20 text-sm">
                    {currentIndex + 1} / {shuffledFormulas.length}
                </div>
                <button onClick={handleNext} className="p-3 bg-white rounded-full shadow-md hover:bg-orange-50 transition transform hover:scale-110" aria-label="Siguiente">
                    <Icon name="next" />
                </button>
                 <button onClick={handleShuffle} className="px-5 py-3 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition transform hover:scale-105 hover:shadow-orange-500/30 text-sm">
                    Barajar
                </button>
            </div>
        </div>
    );
};

export default HarvestMode;
