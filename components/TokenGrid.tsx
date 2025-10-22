
import React from 'react';
import type { Token, Note } from '../types';
import TokenCard from './TokenCard';

interface TokenGridProps {
    tokens: Token[];
    notes: Record<string, Note>;
    onTokenClick: (token: Token) => void;
}

const TokenGrid: React.FC<TokenGridProps> = ({ tokens, notes, onTokenClick }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {tokens.map((token) => (
                <TokenCard 
                    key={token.id} 
                    token={token}
                    note={notes[token.id]}
                    onClick={() => onTokenClick(token)} 
                />
            ))}
        </div>
    );
};

export default TokenGrid;
