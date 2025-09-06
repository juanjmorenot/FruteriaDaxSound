
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-6 text-center">
                <h1 className="text-4xl font-extrabold text-green-600 tracking-tight">
                    <span role="img" aria-label="fruit basket">🧺</span> Frutería DAX
                </h1>
                <p className="text-slate-500 mt-1">¡Cosecha conocimiento, fórmula a fórmula!</p>
            </div>
        </header>
    );
};

export default Header;
