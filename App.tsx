
import React, { useState, useEffect, useCallback } from 'react';
import OBR from "@owlbear-rodeo/sdk";
import type { Token, Note } from './types';
import TokenGrid from './components/TokenGrid';
import NoteModal from './components/NoteModal';
import Toolbar from './components/Toolbar';
import InitialSetup from './components/InitialSetup';
import { OwlbearService } from './services/owlbear';

const App: React.FC = () => {
    const [isReady, setIsReady] = useState(false);
    const [tokens, setTokens] = useState<Token[]>([]);
    const [notes, setNotes] = useState<Record<string, Note>>({});
    const [selectedToken, setSelectedToken] = useState<Token | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const owlbearService = new OwlbearService();

    const updateTokensAndNotes = useCallback(async () => {
        const currentTokens = await owlbearService.getTokens();
        const currentNotes = await owlbearService.getNotes();
        setTokens(currentTokens);
        setNotes(currentNotes);
    }, []);

    useEffect(() => {
        if (!OBR.isReady) {
            OBR.onReady(() => {
                setIsReady(true);
            });
        } else {
            setIsReady(true);
        }
    }, []);

    useEffect(() => {
        if (isReady) {
            updateTokensAndNotes();
            const unsubscribe = OBR.scene.items.onChange(async () => {
                await updateTokensAndNotes();
            });
            return () => unsubscribe();
        }
    }, [isReady, updateTokensAndNotes]);

    const handleTokenClick = (token: Token) => {
        setSelectedToken(token);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedToken(null);
    };

    const handleSaveNote = async (tokenId: string, content: string, title: string) => {
        const player = await OBR.player.getName();
        await owlbearService.saveNote(tokenId, content, title, player);
        await updateTokensAndNotes();
        handleCloseModal();
    };
    
    const handleAddToken = async () => {
        await owlbearService.addToken();
        await updateTokensAndNotes();
    };

    if (!isReady) {
        return <InitialSetup />;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8 font-sans">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white tracking-wider">Совместные Заметки</h1>
                <p className="text-gray-400 mt-2">Нажмите на токен, чтобы просмотреть или отредактировать заметку.</p>
            </header>
            
            <Toolbar onAddToken={handleAddToken} />

            {tokens.length > 0 ? (
                 <TokenGrid tokens={tokens} notes={notes} onTokenClick={handleTokenClick} />
            ) : (
                <div className="text-center text-gray-500 mt-16">
                    <p className="text-xl">На сцене нет токенов.</p>
                    <p>Добавьте токен на карту Owlbear Rodeo, чтобы начать.</p>
                </div>
            )}
           

            {isModalOpen && selectedToken && (
                <NoteModal
                    token={selectedToken}
                    note={notes[selectedToken.id] || { content: '', title: selectedToken.name, lastEditedBy: 'N/A' }}
                    onClose={handleCloseModal}
                    onSave={handleSaveNote}
                />
            )}
        </div>
    );
};

export default App;
