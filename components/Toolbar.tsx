
import React from 'react';

interface ToolbarProps {
    onAddToken: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddToken }) => {
    return (
        <div className="mb-6 flex justify-end">
            <button
                onClick={onAddToken}
                title="Add a sample token (for testing)"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors shadow-md hover:shadow-lg flex items-center space-x-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Добавить Тестовый Токен</span>
            </button>
        </div>
    );
};

export default Toolbar;
