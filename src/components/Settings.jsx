import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeftIcon,
    BellIcon,
    ShieldCheckIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    CogIcon,
    UserIcon,
    KeyIcon,
    GlobeAltIcon,
    DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [notifications, setNotifications] = useState({
        priceAlerts: true,
        newsAlerts: true,
        portfolioUpdates: true,
        marketOpen: false,
        marketClose: false
    });
    const [riskPreferences, setRiskPreferences] = useState({
        maxDrawdown: 10,
        targetReturn: 15,
        riskTolerance: 'moderate'
    });

    const tabs = [
        { id: 'profile', label: 'Profile', icon: UserIcon },
        { id: 'notifications', label: 'Notifications', icon: BellIcon },
        { id: 'risk', label: 'Risk Management', icon: ShieldCheckIcon },
        { id: 'trading', label: 'Trading Preferences', icon: ChartBarIcon },
        { id: 'security', label: 'Security', icon: KeyIcon }
    ];

    const handleNotificationChange = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleRiskChange = (key, value) => {
        setRiskPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            {/* Header */}
            <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <ArrowLeftIcon className="w-5 h-5 text-white" />
                        </button>
                        <h1 className="text-2xl font-bold text-white">Settings</h1>
                    </div>
                </div>
            </header>

            <main className="p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                                <nav className="space-y-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                                                activeTab === tab.id
                                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            <tab.icon className="w-5 h-5 mr-3" />
                                            <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-3">
                            {activeTab === 'profile' && (
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                    <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    defaultValue="John Doe"
                                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    defaultValue="john.doe@example.com"
                                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Timezone
                                            </label>
                                            <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                                                <option>UTC-5 (Eastern Time)</option>
                                                <option>UTC-8 (Pacific Time)</option>
                                                <option>UTC+0 (GMT)</option>
                                                <option>UTC+5:30 (IST)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Currency
                                            </label>
                                            <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                                                <option>USD ($)</option>
                                                <option>EUR (€)</option>
                                                <option>GBP (£)</option>
                                                <option>INR (₹)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                    <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
                                    <div className="space-y-4">
                                        {Object.entries(notifications).map(([key, value]) => (
                                            <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                                <div>
                                                    <h3 className="text-white font-medium capitalize">
                                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm">
                                                        Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleNotificationChange(key)}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                        value ? 'bg-blue-500' : 'bg-gray-600'
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                            value ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'risk' && (
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                    <h2 className="text-xl font-semibold text-white mb-6">Risk Management</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Maximum Drawdown Limit: {riskPreferences.maxDrawdown}%
                                            </label>
                                            <input
                                                type="range"
                                                min="5"
                                                max="25"
                                                value={riskPreferences.maxDrawdown}
                                                onChange={(e) => handleRiskChange('maxDrawdown', parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Target Annual Return: {riskPreferences.targetReturn}%
                                            </label>
                                            <input
                                                type="range"
                                                min="5"
                                                max="30"
                                                value={riskPreferences.targetReturn}
                                                onChange={(e) => handleRiskChange('targetReturn', parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Risk Tolerance
                                            </label>
                                            <select
                                                value={riskPreferences.riskTolerance}
                                                onChange={(e) => handleRiskChange('riskTolerance', e.target.value)}
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            >
                                                <option value="conservative">Conservative</option>
                                                <option value="moderate">Moderate</option>
                                                <option value="aggressive">Aggressive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'trading' && (
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                    <h2 className="text-xl font-semibold text-white mb-6">Trading Preferences</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Default Position Size (% of portfolio)
                                            </label>
                                            <input
                                                type="number"
                                                defaultValue="5"
                                                min="1"
                                                max="20"
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Stop Loss (%)
                                            </label>
                                            <input
                                                type="number"
                                                defaultValue="10"
                                                min="1"
                                                max="50"
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Take Profit (%)
                                            </label>
                                            <input
                                                type="number"
                                                defaultValue="20"
                                                min="5"
                                                max="100"
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                    <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Confirm New Password
                                            </label>
                                            <input
                                                type="password"
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                            <div>
                                                <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                                                <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                                            </div>
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                                                Enable 2FA
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings; 