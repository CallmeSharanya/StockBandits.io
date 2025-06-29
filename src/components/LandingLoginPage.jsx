import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const LandingLoginPage = () => {
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();
    const Dashboardredirect = () => {
        navigate('/dashboard');
    };

    return (

        <div className={`min-h-screen w-screen flex items-center justify-center bg-${darkMode ? "black" : "white"} transition-colors duration-300`}>
            {/* // "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" : "bg-gradient-to-br from-cyan-100 via-blue-200 to-cyan-50"}
         //transition-colors duration-300`}> */}
            <div className="flex w-full max-w-5xl bg-transparent rounded-lg shadow-lg overflow-hidden">
                {/* Left Side: Landing Content */}
                <div className="flex-1 bg-gradient-to-br from-cyan-400 via-blue-700 to-black p-12 flex flex-col justify-center">
                    <h1 className="text-5xl font-bold text-white mb-8 leading-tight">StockBandits.io</h1>
                    <h3 className="text-3xl font-bold text-blue mb-8 leading-tight">
                        Navigate the<br />Markets with<br />Confidence
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-10">
                        <span className="bg-blue-900/60 text-white px-4 py-2 rounded-full text-sm font-medium">Advanced Technical Analysis/Charting Tools</span>
                        <span className="bg-blue-900/60 text-white px-4 py-2 rounded-full text-sm font-medium">Community Feeds</span>
                        <span className="bg-blue-900/60 text-white px-4 py-2 rounded-full text-sm font-medium">Multi Arm Bandit powered for Your Trading Style</span>
                        {/* <span className="bg-blue-900/60 text-white px-4 py-2 rounded-full text-sm font-medium">Customer Support</span> */}
                    </div>
                    <div className="mt-8 text-white text-sm">
                        <p>
                            Game changing trading software that helped me <span className="font-bold">analysis market trends</span> easily and <span className="font-bold">make better decisions</span>
                        </p>
                        <div className="flex items-center mt-4">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <p className="font-semibold">Aaron O'Donnell</p>
                                <span className="text-xs text-blue-200">Pro Account</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex-1 bg-black text-white p-12 flex flex-col justify-center relative">
                    <div className="absolute top-6 right-6 flex items-center">
                        <span className="mr-2 text-sm">Dark Mode</span>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`w-10 h-5 flex items-center bg-gray-700 rounded-full p-1 transition-colors duration-300 ${darkMode ? "bg-blue-600" : "bg-gray-300"}`}
                        >
                            <span
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-5" : ""}`}
                            />
                        </button>
                    </div>
                    <div className="mt-10">
                        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md mb-3">
                            <svg width="20" height="20" fill="currentColor" className="text-white"><path d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.77h5.48c-.24 1.32-.98 2.44-2.09 3.19v2.65h3.38c1.98-1.83 3.13-4.53 3.13-7.61z" /><path d="M10 20c2.7 0 4.96-.9 6.61-2.45l-3.38-2.65c-.94.63-2.15 1.01-3.23 1.01-2.48 0-4.59-1.68-5.34-3.94H1.17v2.74C2.89 17.98 6.19 20 10 20z" /><path d="M4.66 12.97A5.98 5.98 0 014 10c0-.97.17-1.9.46-2.77V4.49H1.17A9.98 9.98 0 000 10c0 1.64.39 3.18 1.17 4.51l3.49-2.74z" /><path d="M10 4c1.47 0 2.8.51 3.84 1.52l2.88-2.88C15.95 1.14 13.7 0 10 0 6.19 0 2.89 2.02 1.17 4.49l3.49 2.74C5.41 5.68 7.52 4 10 4z" /><path d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.77h5.48c-.24 1.32-.98 2.44-2.09 3.19v2.65h3.38c1.98-1.83 3.13-4.53 3.13-7.61z" /></svg>
                            Sign up with Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-md mb-6">
                            <svg width="20" height="20" fill="currentColor" className="text-white"><path d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.792C0 19.506.494 20 1.104 20h9.563v-7.729H8.077V9.231h2.59V7.077c0-2.567 1.568-3.966 3.861-3.966 1.099 0 2.044.082 2.32.119v2.69h-1.591c-1.248 0-1.49.594-1.49 1.463v1.92h2.98l-.389 3.04h-2.591V20h5.077c.61 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0" /></svg>
                            Sign up with Facebook
                        </button>
                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-gray-700"></div>
                            <span className="mx-2 text-gray-400">or</span>
                            <div className="flex-grow border-t border-gray-700"></div>
                        </div>
                        <form>
                            <div className="flex gap-3 mb-4">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-gray-900 text-white px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-gray-900 text-white px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-400 mb-4">At least 8 characters, with numbers and symbols.</p>
                            <div className="flex items-center mb-4">
                                <input type="checkbox" id="remember" className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500 focus:ring-2" />
                                <label htmlFor="remember" className="text-sm text-gray-300">Remember this device</label>
                            </div>
                            <button onClick={Dashboardredirect} type="submit" className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-2 rounded-md transition-colors duration-200">
                                Create Account
                            </button>
                            <p className="text-xs text-gray-400 mt-4">
                                By logging in, you agree to follow our <a href="#" className="underline">terms of service</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingLoginPage;
