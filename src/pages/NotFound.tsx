import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white text-black font-sans">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-6xl font-extrabold tracking-tight mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-md">
                    We couldn't find the page you're looking for. It might have been removed, renamed, or did not exist in the first place.
                </p>
                <Link 
                    to="/home" 
                    className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                    Return Home
                </Link>
            </main>
        </div>
    );
};

export default NotFound;
