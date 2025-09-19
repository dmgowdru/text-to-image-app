import React from 'react';

interface PromptSuggestionsProps {
    onSelectPrompt: (prompt: string) => void;
}

const suggestions = [
    "A majestic lion wearing a crown, cinematic lighting",
    "A whimsical forest filled with glowing mushrooms",
    "An astronaut playing guitar on the moon",
    "A surreal underwater city with fish swimming through buildings",
    "A cyberpunk cityscape at night, neon signs reflecting in puddles",
    "A vintage robot serving tea in a garden",
    "A dragon made of crystal soaring through a stormy sky",
    "A secret library hidden behind a waterfall",
];

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelectPrompt }) => {
    return (
        <div className="w-full max-w-2xl mx-auto mt-6 text-center">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Need inspiration? Try one of these:</h3>
            <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((prompt) => (
                    <button
                        key={prompt}
                        onClick={() => onSelectPrompt(prompt)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-full text-sm hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PromptSuggestions;
