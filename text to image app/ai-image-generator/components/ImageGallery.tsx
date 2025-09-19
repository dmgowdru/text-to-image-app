
import React from 'react';
import ImageCard from './ImageCard';
import type { GeneratedImage } from '../types';

interface ImageGalleryProps {
    images: GeneratedImage[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    return (
        <>
            {images.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-400 text-xl">Your generated images will appear here.</p>
                    <p className="text-gray-500 mt-2">Start by typing a prompt above and clicking generate!</p>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
                {images.map((image) => (
                    <ImageCard key={image.id} image={image} />
                ))}
            </div>
        </>
    );
};

export default ImageGallery;
