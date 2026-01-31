import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';

const SplashPage: React.FC = () => {
    const navigate = useNavigate();

    const handleEnter = () => {
        navigate('/home');
    };

    return (
        <div
            className="w-screen h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center relative"
            style={{ backgroundImage: "url('/Images/Splash1.jpg')" }}
        >
            <div className="flex flex-col items-center gap-5 z-10">
                <button
                    className="bg-transparent border-none text-white font-sans text-2xl font-medium cursor-pointer tracking-widest uppercase transition-opacity duration-300 hover:opacity-70"
                    onClick={handleEnter}
                >
                    ENTER
                </button>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl transition-opacity duration-300 flex items-center justify-center hover:opacity-70"
                >
                    <FaInstagram />
                </a>
            </div>
        </div>
    );
};

export default SplashPage;
