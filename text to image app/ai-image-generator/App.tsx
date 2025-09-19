
import React, { useState } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { generateImage } from './services/geminiService';
import type { GeneratedImage } from './types';

const App: React.FC = () => {
    const [images, setImages] = useState<GeneratedImage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateImage = async (prompt: string, numImages: number, enhanceClarity: boolean) => {
        setIsLoading(true);
        setError(null);
        try {
            let finalPrompt = prompt;
            if (enhanceClarity) {
                finalPrompt += ", photorealistic, high detail, 4k";
            }

            const imageUrls = await generateImage(finalPrompt, numImages);

            const newImages: GeneratedImage[] = imageUrls.map((src, index) => ({
                id: `${new Date().toISOString()}-${index}`,
                src: src,
                prompt: prompt, // Use original prompt for display
                alt: prompt,
            }));

            setImages(prevImages => [...newImages, ...prevImages]);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <main className="container mx-auto px-4 py-8">
                <Header />
                <div className="mt-8">
                    <PromptForm onSubmit={handleGenerateImage} isLoading={isLoading} />
                </div>
                <div className="mt-8">
                    {isLoading && <Loader />}
                    {error && <ErrorMessage message={error} />}
                    <ImageGallery images={images} />
                </div>
            </main>
        </div>
    );
};

export default App;
