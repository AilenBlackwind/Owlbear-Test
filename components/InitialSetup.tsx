
import React from 'react';

const InitialSetup: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-6"></div>
        <h1 className="text-3xl font-bold mb-2">Подключение к Owlbear Rodeo...</h1>
        <p className="text-gray-400">Пожалуйста, убедитесь, что расширение запущено внутри Owlbear Rodeo.</p>
      </div>
    </div>
  );
};

export default InitialSetup;
