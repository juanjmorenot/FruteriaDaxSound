import React, { useState, useMemo } from 'react';
import { DAX_FORMULAS, CATEGORY_THEME } from '../constants';
import { DAXCategory } from '../types';
import Icon from '../components/Icon';

const FormulaListItem: React.FC<{ formula: (typeof DAX_FORMULAS)[0] }> = ({ formula }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const theme = CATEGORY_THEME[formula.category];

    return (
        <div className="border-b border-stone-200">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-orange-50/50 transition"
            >
                <div className="flex items-center">
                    <span className="text-2xl mr-4">{theme.icon}</span>
                    <div>
                        <h3 className="font-bold text-base text-stone-800">{formula.name}</h3>
                        <span className={`text-xs font-semibold ${theme.color}`}>{formula.category}</span>
                    </div>
                </div>
                <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
            </button>
            {isExpanded && (
                <div className="p-4 bg-white">
                    <div className="mb-2">
                        <h4 className="font-bold text-stone-600 text-sm">Uso:</h4>
                        <p className="text-stone-500 text-xs mt-1">{formula.usage}</p>
                    </div>
                    <div className="mb-2">
                        <h4 className="font-bold text-stone-600 text-sm">Sintaxis:</h4>
                        <pre className="text-xs bg-neutral-100 p-3 rounded-xl mt-1 whitespace-pre-wrap break-words"><code>{formula.syntax}</code></pre>
                    </div>
                    <div>
                        <h4 className="font-bold text-stone-600 text-sm">Ejemplo:</h4>
                        <pre className="text-xs bg-neutral-100 p-3 rounded-xl mt-1 whitespace-pre-wrap break-words"><code>{formula.example}</code></pre>
                    </div>
                </div>
            )}
        </div>
    );
};


const GlossaryMode: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<DAXCategory | 'All'>('All');

    const filteredFormulas = useMemo(() => {
        return DAX_FORMULAS.filter(formula => {
            const matchesCategory = selectedCategory === 'All' || formula.category === selectedCategory;
            const matchesSearch = formula.name.toLowerCase().includes(searchTerm.toLowerCase()) || formula.usage.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white/70 backdrop-blur-sm rounded-3xl shadow-md border border-stone-200">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Buscar fórmula por nombre o uso..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon name="search" className="text-stone-400" />
                    </div>
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as DAXCategory | 'All')}
                    className="w-full md:w-64 px-4 py-3 border border-stone-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white text-sm"
                >
                    <option value="All">Todas las categorías</option>
                    {Object.values(DAXCategory).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200/80">
                {filteredFormulas.length > 0 ? (
                    filteredFormulas.map(formula => <FormulaListItem key={formula.name} formula={formula} />)
                ) : (
                    <p className="p-8 text-center text-stone-500 text-sm">No se encontraron frutas con esos criterios. ¡Intenta otra búsqueda!</p>
                )}
            </div>
        </div>
    );
};

export default GlossaryMode;