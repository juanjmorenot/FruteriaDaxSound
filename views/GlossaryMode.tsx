import React, { useState, useMemo } from 'react';
import { DAX_FORMULAS, CATEGORY_THEME } from '../constants';
import { DAXCategory } from '../types';
import Icon from '../components/Icon';

const FormulaListItem: React.FC<{ formula: (typeof DAX_FORMULAS)[0] }> = ({ formula }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const theme = CATEGORY_THEME[formula.category];

    return (
        <div className="border-b border-slate-200">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-amber-50 transition"
            >
                <div className="flex items-center">
                    <span className="text-2xl mr-4">{theme.icon}</span>
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">{formula.name}</h3>
                        <span className={`text-sm font-semibold ${theme.color}`}>{formula.category}</span>
                    </div>
                </div>
                <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
            </button>
            {isExpanded && (
                <div className="p-4 bg-white">
                    <div className="mb-2">
                        <h4 className="font-bold text-slate-600">Uso:</h4>
                        <p className="text-slate-500 text-sm mt-1">{formula.usage}</p>
                    </div>
                    <div className="mb-2">
                        <h4 className="font-bold text-slate-600">Sintaxis:</h4>
                        <pre className="text-sm bg-slate-100 p-2 rounded mt-1 whitespace-pre-wrap break-words"><code>{formula.syntax}</code></pre>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-600">Ejemplo:</h4>
                        <pre className="text-sm bg-slate-100 p-2 rounded mt-1 whitespace-pre-wrap break-words"><code>{formula.example}</code></pre>
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
            <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Buscar fórmula por nombre o uso..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="search" className="text-slate-400" />
                    </div>
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as DAXCategory | 'All')}
                    className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                    <option value="All">Todas las categorías</option>
                    {Object.values(DAXCategory).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
                {filteredFormulas.length > 0 ? (
                    filteredFormulas.map(formula => <FormulaListItem key={formula.name} formula={formula} />)
                ) : (
                    <p className="p-8 text-center text-slate-500">No se encontraron frutas con esos criterios. ¡Intenta otra búsqueda!</p>
                )}
            </div>
        </div>
    );
};

export default GlossaryMode;