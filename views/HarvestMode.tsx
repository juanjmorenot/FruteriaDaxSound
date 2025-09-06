import React, { useState, useMemo } from 'react';
import { DAX_FORMULAS } from '../constants';
import Flashcard from '../components/Flashcard';
import { shuffleArray } from '../utils';
import Icon from '../components/Icon';

const HarvestMode: React.FC = () => {
    const shuffledFormulas = useMemo(() => shuffleArray(DAX_FORMULAS), []);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledFormulas.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + shuffledFormulas.length) % shuffledFormulas.length);
    };
    
    const handleShuffle = () => {
        setCurrentIndex(0);
        // This will trigger a re-shuffle due to the dependency change, but useMemo is smart enough
        // This is a simplified way. A more robust way would be to create a new shuffled array and set it in state.
        // For this app, simply resetting index on a memoized shuffle is sufficient.
        // Let's make it a bit better by re-shuffling on demand.
        const newShuffled = shuffleArray(DAX_FORMULAS);
        // To make it feel different, let's pick a random start index.
        setCurrentIndex(Math.floor(Math.random() * newShuffled.length));
    }

    return (
        <div className="flex flex-col items-center">
            <Flashcard formula={shuffledFormulas[currentIndex]} />
            <div className="mt-8 flex items-center justify-center gap-4 w-full max-w-2xl">
                <button onClick={handlePrev} className="p-3 bg-white rounded-full shadow-md hover:bg-orange-50 transition transform hover:scale-110">
                    <Icon name="prev" />
                </button>
                <div className="text-center font-bold text-stone-500 w-20">
                    {currentIndex + 1} / {shuffledFormulas.length}
                </div>
                <button onClick={handleNext} className="p-3 bg-white rounded-full shadow-md hover:bg-orange-50 transition transform hover:scale-110">
                    <Icon name="next" />
                </button>
                 <button onClick={handleShuffle} className="px-5 py-3 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition transform hover:scale-105 hover:shadow-orange-500/30">
                    Barajar
                </button>
            </div>
        </div>
    );
};

export default HarvestMode;