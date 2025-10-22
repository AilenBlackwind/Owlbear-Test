
import React, { useState, useEffect } from 'react';
import type { Token, Note } from '../types';

interface NoteModalProps {
    token: Token;
    note: Note;
    onClose: () => void;
    onSave: (tokenId: string, content: string, title: string) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ token, note, onClose, onSave }) => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        setContent(note.content || '');
        setTitle(note.title || token.name);
    }, [note, token.name]);

    const handleSave = () => {
        onSave(token.id, content, title);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 animate-fade-in-up">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                            <img src={token.imageUrl} alt={token.name} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-600"/>
                            <div>
                               <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Название заметки"
                                    className="text-2xl font-bold text-white bg-transparent border-b-2 border-gray-700 focus:border-cyan-500 outline-none w-full"
                                />
                                <p className="text-sm text-gray-400 mt-1">
                                    Последнее изменение: {note.lastEditedBy || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-4">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Введите вашу заметку здесь..."
                            className="w-full h-64 p-3 bg-gray-900 text-gray-300 rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none resize-none"
                        />
                    </div>
                </div>

                <div className="bg-gray-700/50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-gray-600 text-white font-semibold hover:bg-gray-500 transition-colors"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-md bg-cyan-600 text-white font-semibold hover:bg-cyan-500 transition-colors shadow-md hover:shadow-lg"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;
