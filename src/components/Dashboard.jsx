import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChartBarIcon,
    HomeIcon,
    CpuChipIcon,
    BriefcaseIcon,
    CogIcon,
    ChartPieIcon,
    BellIcon,
    UserIcon,
    MagnifyingGlassIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    PlayIcon,
    PauseIcon,
    AdjustmentsHorizontalIcon,
    SparklesIcon,
    EyeIcon,
    BoltIcon,
    Bars3Icon,
    XMarkIcon,
    HeartIcon,
    CurrencyDollarIcon,
    ShieldCheckIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    ComposedChart,
    ReferenceLine,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const TradingDashboard = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('overview');
    const [selectedStock, setSelectedStock] = useState('AAPL');
    const [timeframe, setTimeframe] = useState('1D');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [notifications, setNotifications] = useState([]);

    // Mock portfolio data
    const portfolioData = {
        totalValue: 125000,
        dailyChange: 2340,
        dailyChangePercent: 1.91,
        totalReturn: 15600,
        totalReturnPercent: 14.25,
        cash: 15000,
        positions: [
            { symbol: 'AAPL', shares: 50, avgPrice: 175.20, currentPrice: 181.95, value: 9097.50, change: 337.50, changePercent: 3.85 },
            { symbol: 'GOOGL', shares: 25, avgPrice: 135.80, currentPrice: 142.85, value: 3571.25, change: 176.25, changePercent: 5.19 },
            { symbol: 'TSLA', shares: 30, avgPrice: 245.30, currentPrice: 248.50, value: 7455.00, change: 96.00, changePercent: 1.30 },
            { symbol: 'NVDA', shares: 15, avgPrice: 820.40, currentPrice: 875.20, value: 13128.00, change: 822.00, changePercent: 6.68 }
        ]
    };

    // Mock performance data
    const performanceData = [
        { date: 'Jan', value: 100000, benchmark: 100000 },
        { date: 'Feb', value: 102500, benchmark: 101200 },
        { date: 'Mar', value: 105800, benchmark: 102800 },
        { date: 'Apr', value: 108900, benchmark: 104500 },
        { date: 'May', value: 112400, benchmark: 106200 },
        { date: 'Jun', value: 115600, benchmark: 107800 },
        { date: 'Jul', value: 118900, benchmark: 109500 },
        { date: 'Aug', value: 122300, benchmark: 111200 },
        { date: 'Sep', value: 125000, benchmark: 112800 }
    ];

    // Mock correlation matrix data
    const correlationData = [
        { name: 'AAPL', AAPL: 1.00, GOOGL: 0.65, MSFT: 0.72, TSLA: 0.45, NVDA: 0.58 },
        { name: 'GOOGL', AAPL: 0.65, GOOGL: 1.00, MSFT: 0.68, TSLA: 0.52, NVDA: 0.61 },
        { name: 'MSFT', AAPL: 0.72, GOOGL: 0.68, MSFT: 1.00, TSLA: 0.48, NVDA: 0.55 },
        { name: 'TSLA', AAPL: 0.45, GOOGL: 0.52, MSFT: 0.48, TSLA: 1.00, NVDA: 0.42 },
        { name: 'NVDA', AAPL: 0.58, GOOGL: 0.61, MSFT: 0.55, TSLA: 0.42, NVDA: 1.00 }
    ];

    // Mock sector rotation data
    const sectorData = [
        { sector: 'Technology', weight: 35, change: 2.1, performance: 12.5 },
        { sector: 'Healthcare', weight: 18, change: -0.8, performance: 8.2 },
        { sector: 'Financials', weight: 15, change: 1.2, performance: 6.8 },
        { sector: 'Consumer', weight: 12, change: 0.5, performance: 9.1 },
        { sector: 'Energy', weight: 8, change: -1.5, performance: -2.3 },
        { sector: 'Others', weight: 12, change: 0.3, performance: 4.7 }
    ];

    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: HomeIcon, path: '/dashboard' },
        { id: 'mab', label: 'MAB Stocks', icon: CpuChipIcon, path: '/mab' },
        { id: 'sentiment', label: 'Market Sentiment', icon: HeartIcon, path: '/sentiment' },
        { id: 'advanced', label: 'Advanced Algorithms', icon: SparklesIcon, path: '/advanced' },
        { id: 'portfolio', label: 'Portfolio Optimizer', icon: BriefcaseIcon, path: '/portfolio' },
        { id: 'analytics', label: 'Advanced Analytics', icon: ChartPieIcon, path: '/analytics' },
        { id: 'settings', label: 'Settings', icon: CogIcon, path: '/settings' }
    ];

    const navigateToSection = (path) => {
        navigate(path);
    };

    const PortfolioOverview = () => (
        <div className="space-y-6">
            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Portfolio Value</h3>
                        <CurrencyDollarIcon className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                        ${portfolioData.totalValue.toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm">
                        <ArrowTrendingUpIcon className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-green-400">+${portfolioData.dailyChange.toLocaleString()}</span>
                        <span className="text-gray-400 ml-1">({portfolioData.dailyChangePercent}%)</span>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Total Return</h3>
                        <ChartBarIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                        ${portfolioData.totalReturn.toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm">
                        <ArrowTrendingUpIcon className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-green-400">+{portfolioData.totalReturnPercent}%</span>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Cash</h3>
                        <ShieldCheckIcon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                        ${portfolioData.cash.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                        Available for trading
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Positions</h3>
                        <BriefcaseIcon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                        {portfolioData.positions.length}
                    </div>
                    <div className="text-sm text-gray-400">
                        Active positions
                    </div>
                </div>
            </div>

            {/* Portfolio Performance Chart */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Portfolio Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                    }}
                            formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                        />
                <Line
                    type="monotone"
                            dataKey="value"
                            stroke="#10B981"
                            strokeWidth={3}
                            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                            name="Portfolio"
                        />
                <Line
                    type="monotone"
                            dataKey="benchmark"
                            stroke="#6B7280"
                    strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={{ fill: '#6B7280', strokeWidth: 2, r: 3 }}
                            name="Benchmark"
                />
            </ComposedChart>
        </ResponsiveContainer>
            </div>

            {/* Holdings Table */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Current Holdings</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left py-3 text-gray-300">Symbol</th>
                                <th className="text-right py-3 text-gray-300">Shares</th>
                                <th className="text-right py-3 text-gray-300">Avg Price</th>
                                <th className="text-right py-3 text-gray-300">Current Price</th>
                                <th className="text-right py-3 text-gray-300">Value</th>
                                <th className="text-right py-3 text-gray-300">Change</th>
                                <th className="text-right py-3 text-gray-300">% Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolioData.positions.map((position, index) => (
                                <tr key={index} className="border-b border-gray-800/50">
                                    <td className="py-3 text-white font-medium">{position.symbol}</td>
                                    <td className="py-3 text-right text-white">{position.shares}</td>
                                    <td className="py-3 text-right text-gray-300">${position.avgPrice.toFixed(2)}</td>
                                    <td className="py-3 text-right text-white">${position.currentPrice.toFixed(2)}</td>
                                    <td className="py-3 text-right text-white">${position.value.toLocaleString()}</td>
                                    <td className={`py-3 text-right ${position.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {position.change >= 0 ? '+' : ''}${position.change.toFixed(2)}
                                    </td>
                                    <td className={`py-3 text-right ${position.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {position.changePercent >= 0 ? '+' : ''}{position.changePercent.toFixed(2)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const QuickActions = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30 cursor-pointer hover:from-blue-500/30 hover:to-purple-600/30 transition-all duration-300"
                onClick={() => navigateToSection('/mab')}
            >
                <div className="flex items-center mb-4">
                    <CpuChipIcon className="w-8 h-8 text-blue-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">MAB Stock Selection</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                    Use advanced Multi-Arm Bandit algorithms to select the best stocks for your portfolio.
                </p>
                <div className="flex items-center text-blue-400 text-sm">
                    <span>Launch Algorithm</span>
                    <ArrowTrendingUpIcon className="w-4 h-4 ml-2" />
                </div>
            </div>

            <div 
                className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30 cursor-pointer hover:from-green-500/30 hover:to-emerald-600/30 transition-all duration-300"
                onClick={() => navigateToSection('/sentiment')}
            >
                <div className="flex items-center mb-4">
                    <HeartIcon className="w-8 h-8 text-green-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Market Sentiment</h3>
                        </div>
                <p className="text-gray-300 text-sm mb-4">
                    Analyze real-time market sentiment from news, social media, and technical indicators.
                </p>
                <div className="flex items-center text-green-400 text-sm">
                    <span>View Sentiment</span>
                    <EyeIcon className="w-4 h-4 ml-2" />
                </div>
            </div>

            <div 
                className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 cursor-pointer hover:from-purple-500/30 hover:to-pink-600/30 transition-all duration-300"
                onClick={() => navigateToSection('/advanced')}
            >
                <div className="flex items-center mb-4">
                    <SparklesIcon className="w-8 h-8 text-purple-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Advanced Algorithms</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                    Explore next-generation algorithms including Contextual MAB and Neural Bandits.
                </p>
                <div className="flex items-center text-purple-400 text-sm">
                    <span>Explore AI</span>
                    <BoltIcon className="w-4 h-4 ml-2" />
                </div>
            </div>

            <div 
                className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-6 border border-yellow-500/30 cursor-pointer hover:from-yellow-500/30 hover:to-orange-600/30 transition-all duration-300"
                onClick={() => navigateToSection('/portfolio')}
            >
                <div className="flex items-center mb-4">
                    <BriefcaseIcon className="w-8 h-8 text-yellow-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Portfolio Optimizer</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                    Optimize your portfolio using Modern Portfolio Theory and risk management.
                </p>
                <div className="flex items-center text-yellow-400 text-sm">
                    <span>Optimize Now</span>
                    <AdjustmentsHorizontalIcon className="w-4 h-4 ml-2" />
                </div>
            </div>

            <div 
                className="bg-gradient-to-br from-red-500/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30 cursor-pointer hover:from-red-500/30 hover:to-pink-600/30 transition-all duration-300"
                onClick={() => navigateToSection('/analytics')}
            >
                <div className="flex items-center mb-4">
                    <ChartPieIcon className="w-8 h-8 text-red-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Advanced Analytics</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                    Deep dive into Sharpe ratios, drawdowns, correlations, and sector analysis.
                </p>
                <div className="flex items-center text-red-400 text-sm">
                    <span>View Analytics</span>
                    <ChartBarIcon className="w-4 h-4 ml-2" />
                </div>
            </div>

            <div 
                className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur-lg rounded-xl p-6 border border-gray-500/30 cursor-pointer hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300"
                onClick={() => navigateToSection('/settings')}
            >
                <div className="flex items-center mb-4">
                    <CogIcon className="w-8 h-8 text-gray-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Settings</h3>
            </div>
                <p className="text-gray-300 text-sm mb-4">
                    Customize your trading preferences, alerts, and account settings.
                </p>
                <div className="flex items-center text-gray-400 text-sm">
                    <span>Configure</span>
                    <CogIcon className="w-4 h-4 ml-2" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full bg-black/20 backdrop-blur-lg border-r border-white/10 transition-all duration-300 z-50 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-8">
                        {!sidebarCollapsed && (
                            <h1 className="text-xl font-bold text-white">StockBandits.io</h1>
                        )}
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <Bars3Icon className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => navigateToSection(item.path)}
                                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                                    activeSection === item.id
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {!sidebarCollapsed && <span>{item.label}</span>}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
                {/* Header */}
                <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-2xl font-bold text-white">Trading Dashboard</h2>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                                <GlobeAltIcon className="w-4 h-4" />
                                <span>Live Market Data</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors relative">
                                <BellIcon className="w-5 h-5 text-white" />
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                )}
                            </button>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <UserIcon className="w-5 h-5 text-white" />
                                </div>
                                {!sidebarCollapsed && <span className="text-white">John Doe</span>}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">
                    <div className="space-y-8">
                        {/* Welcome Section */}
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, John!</h1>
                            <p className="text-xl text-gray-300">Your portfolio is performing well today</p>
                        </div>

                        {/* Portfolio Overview */}
                        <PortfolioOverview />

                        {/* Quick Actions */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                            <QuickActions />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TradingDashboard;
