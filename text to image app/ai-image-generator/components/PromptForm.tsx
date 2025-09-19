
import React, { useState } from 'react';
import PromptSuggestions from './PromptSuggestions';

interface PromptFormProps {
    onSubmit: (prompt: string, numImages: number, enhanceClarity: boolean) => void;
    isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading }) => {
    const [prompt, setPrompt] = useState<string>('');
    const [numImages, setNumImages] = useState<number>(1);
    const [enhanceClarity, setEnhanceClarity] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
            onSubmit(prompt, numImages, enhanceClarity);
        }
    };
    
    const handleSelectSuggestion = (suggestion: string) => {
        setPrompt(suggestion);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-lg focus-within:ring-2 focus-within:ring-purple-500 transition-shadow">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A futuristic city skyline at sunset"
                        className="flex-grow w-full bg-transparent text-white placeholder-gray-500 px-3 py-2 border-none focus:outline-none focus:ring-0"
                        disabled={isLoading}
                        aria-label="Image generation prompt"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            'Generate'
                        )}
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
                    <div className="flex items-center gap-2">
                        <label htmlFor="num-images" className="text-gray-300 font-medium text-sm">Images:</label>
                        <select
                            id="num-images"
                            value={numImages}
                            onChange={(e) => setNumImages(Number(e.target.value))}
                            disabled={isLoading}
                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="enhance-clarity" className="text-gray-300 font-medium text-sm mr-3">Enhanced Clarity:</label>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={enhanceClarity}
                            onClick={() => setEnhanceClarity(!enhanceClarity)}
                            disabled={isLoading}
                            className={`${
                                enhanceClarity ? 'bg-purple-600' : 'bg-gray-700'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
                        >
                            <span
                                className={`${
                                    enhanceClarity ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                        </button>
                    </div>
                </div>

            </form>
            <PromptSuggestions onSelectPrompt={handleSelectSuggestion} />
        </div>
    );
};

export default PromptForm;
