
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="py-6 md:py-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                AI Image Generator
            </h1>
            <p className="mt-2 text-lg text-gray-400">
                Bring your imagination to life with Gemini
            </p>
        </header>
    );
};

export default Header;
