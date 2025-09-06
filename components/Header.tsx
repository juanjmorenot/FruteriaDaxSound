import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-stone-200 transition-all duration-300">
            <div className="container mx-auto px-4 text-center transition-all duration-300 py-6">
                <h1 className="font-bold text-[#A1D849] tracking-tight transition-all duration-300 text-[1.8rem] md:text-[2.25rem] leading-tight">
                    Frutería DAX
                </h1>
                <p className="text-stone-500 text-sm -mt-1">¡Cosecha conocimiento, fórmula a fórmula!</p>
            </div>
        </header>
    );
};

export default Header;