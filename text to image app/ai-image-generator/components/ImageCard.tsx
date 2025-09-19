import React from 'react';
import type { GeneratedImage } from '../types';

interface ImageCardProps {
    image: GeneratedImage;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
    const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent click from bubbling up to parent elements
        e.stopPropagation();

        const link = document.createElement('a');
        link.href = image.src;

        // Create a user-friendly filename from the prompt
        const sanitizedPrompt = image.prompt.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-');
        const filename = `${sanitizedPrompt.substring(0, 50) || 'ai-generated-image'}.jpeg`;
        
        link.download = filename;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative group aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                {/* Download button at top right */}
                <button
                    onClick={handleDownload}
                    className="absolute top-4 right-4 p-2 bg-purple-600/80 text-white rounded-full hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500"
                    aria-label="Download image"
                    title="Download image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </button>
                {/* Prompt text at bottom */}
                <p className="absolute bottom-4 left-4 right-4 text-white text-sm break-words">{image.prompt}</p>
            </div>
        </div>
    );
};

export default ImageCard;
