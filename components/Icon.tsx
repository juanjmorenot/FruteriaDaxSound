
import React from 'react';

interface IconProps {
    name: 'flip' | 'next' | 'prev' | 'search';
    className?: string;
}

const icons: Record<IconProps['name'], JSX.Element> = {
    flip: <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 20L20 4" />,
    next: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />,
    prev: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
};

const Icon: React.FC<IconProps> = ({ name, className = 'w-5 h-5' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {icons[name]}
        </svg>
    );
};

export default Icon;
