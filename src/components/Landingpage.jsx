import React from 'react';
import LandingLoginPage from './LandingLoginPage';
import { useNavigate } from 'react-router-dom';


const TradingViewLanding = () => {
    const navigate = useNavigate();

    const Directtologinpage = () => {
        navigate('/login');
    };
    return (
        <div className="relative min-h-screen w-full flex flex-col">
            {/* Continuous Gradient Background */}
            <div className="absolute inset-0 w-screen h-screen bg-gradient-to-r from-[#171a27] via-[#0d0f46] to-[#4B2067] z-0" />

            {/* Image on the left, at original size, overlays the gradient */}
            <div className="absolute inset-0 w-full h-full flex z-10 pointer-events-none"
                style={{
                    width: '100vw', // 2/5 of viewport width
                    left: '15vw',  // start at 1/5
                }}>
                <div className="relative w-3/5 min-w-[350px] max-w-[700px] h-full">
                    <img
                        src="/bg.png"
                        alt="Background"
                        className="h-full w-full object-cover object-left"
                        style={{
                            maxWidth: '100%',
                            height: '100%',
                        }}
                        draggable={false}
                    />
                    {/* Optional: dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-20 flex flex-col min-h-screen">
                {/* Navbar */}
                <nav className="flex items-center w-screen justify-between px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
                    {/* ...navbar content... */}
                    <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-xl">StockBandits.io</span>
                    </div>
                    <div className="hidden md:flex items-center bg-gray-800/50 rounded-full px-4 py-2 w-80">
                        <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search (Ctrl+K)"
                            className="bg-transparent text-white placeholder-gray-400 w-full outline-none"
                        />
                    </div>
                    <div className="hidden lg:flex items-center space-x-8">
                        <a href="#" className="text-white hover:text-blue-400 transition-colors">Products</a>
                        <a href="#" className="text-white hover:text-blue-400 transition-colors">Community</a>
                        <a href="#" className="text-white hover:text-blue-400 transition-colors">Markets</a>
                        <a href="#" className="text-white hover:text-blue-400 transition-colors">Brokers</a>
                        <a href="#" className="text-white hover:text-blue-400 transition-colors">More</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-white">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-xs">🌐</span>
                            </div>
                            <span className="text-sm">IN</span>
                        </div>
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <button onClick={Directtologinpage} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                            Get started
                        </button>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center ml-auto w-full md:w-3/5">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        See it. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">/</span> Seize it.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
                        Know Before You Grow.
                    </p>
                    <button onClick={Directtologinpage} className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl mb-4">
                        Get started for free
                    </button>
                    <p className="text-gray-400 text-sm">
                        Trade with Confidence, Backed by Data.
                    </p>
                </main>
            </div>
        </div>
    );
};

export default TradingViewLanding;
