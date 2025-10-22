
import React from 'react';
import type { Token, Note } from '../types';

interface TokenCardProps {
    token: Token;
    note?: Note;
    onClick: () => void;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, note, onClick }) => {
    const hasNote = note && (note.content || (note.title && note.title !== token.name));

    return (
        <div
            className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            onClick={onClick}
        >
            <img src={token.imageUrl} alt={token.name} className="w-full h-32 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-2 w-full">
                <h3 className="text-white text-sm font-semibold truncate">{note?.title || token.name}</h3>
            </div>
            {hasNote && (
                <div className="absolute top-2 right-2 bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold" title="Есть заметка">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            )}
             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-colors duration-300"></div>
        </div>
    );
};

export default TokenCard;
