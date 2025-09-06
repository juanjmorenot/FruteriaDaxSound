import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center py-4 md:py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-500 tracking-tighter">
                Frutería DAX
            </h1>
            <p className="text-slate-500 text-xs md:text-sm -mt-1">¡Cosecha conocimiento, fórmula a fórmula!</p>
        </header>
    );
};

export default Header;