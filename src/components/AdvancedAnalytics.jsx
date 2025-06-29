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
    GlobeAltIcon,
    ArrowLeftIcon
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
    Cell,
    ScatterChart,
    Scatter
} from 'recharts';

const AdvancedAnalytics = () => {
    const navigate = useNavigate();
    const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
    const [selectedMetric, setSelectedMetric] = useState('sharpe');

    // Mock Sharpe ratio data
    const sharpeData = [
        { date: 'Jan', portfolio: 1.85, benchmark: 1.20, riskFree: 0.05 },
        { date: 'Feb', portfolio: 1.92, benchmark: 1.18, riskFree: 0.05 },
        { date: 'Mar', portfolio: 1.78, benchmark: 1.15, riskFree: 0.05 },
        { date: 'Apr', portfolio: 1.95, benchmark: 1.22, riskFree: 0.05 },
        { date: 'May', portfolio: 2.01, benchmark: 1.25, riskFree: 0.05 },
        { date: 'Jun', portfolio: 1.88, benchmark: 1.19, riskFree: 0.05 },
        { date: 'Jul', portfolio: 2.05, benchmark: 1.28, riskFree: 0.05 },
        { date: 'Aug', portfolio: 1.96, benchmark: 1.24, riskFree: 0.05 },
        { date: 'Sep', portfolio: 2.12, benchmark: 1.30, riskFree: 0.05 }
    ];

    // Mock drawdown data
    const drawdownData = [
        { date: 'Jan', portfolio: 0, benchmark: 0 },
        { date: 'Feb', portfolio: -2.5, benchmark: -3.2 },
        { date: 'Mar', portfolio: -1.8, benchmark: -4.1 },
        { date: 'Apr', portfolio: 0, benchmark: -2.8 },
        { date: 'May', portfolio: 0, benchmark: -1.5 },
        { date: 'Jun', portfolio: -3.2, benchmark: -5.2 },
        { date: 'Jul', portfolio: -1.5, benchmark: -3.8 },
        { date: 'Aug', portfolio: 0, benchmark: -2.1 },
        { date: 'Sep', portfolio: 0, benchmark: -1.2 }
    ];

    // Mock correlation matrix
    const correlationMatrix = [
        { name: 'AAPL', AAPL: 1.00, GOOGL: 0.65, MSFT: 0.72, TSLA: 0.45, NVDA: 0.58, AMZN: 0.61, META: 0.54, NFLX: 0.48 },
        { name: 'GOOGL', AAPL: 0.65, GOOGL: 1.00, MSFT: 0.68, TSLA: 0.52, NVDA: 0.61, AMZN: 0.58, META: 0.62, NFLX: 0.45 },
        { name: 'MSFT', AAPL: 0.72, GOOGL: 0.68, MSFT: 1.00, TSLA: 0.48, NVDA: 0.55, AMZN: 0.64, META: 0.59, NFLX: 0.52 },
        { name: 'TSLA', AAPL: 0.45, GOOGL: 0.52, MSFT: 0.48, TSLA: 1.00, NVDA: 0.42, AMZN: 0.38, META: 0.41, NFLX: 0.35 },
        { name: 'NVDA', AAPL: 0.58, GOOGL: 0.61, MSFT: 0.55, TSLA: 0.42, NVDA: 1.00, AMZN: 0.56, META: 0.58, NFLX: 0.48 },
        { name: 'AMZN', AAPL: 0.61, GOOGL: 0.58, MSFT: 0.64, TSLA: 0.38, NVDA: 0.56, AMZN: 1.00, META: 0.65, NFLX: 0.52 },
        { name: 'META', AAPL: 0.54, GOOGL: 0.62, MSFT: 0.59, TSLA: 0.41, NVDA: 0.58, AMZN: 0.65, META: 1.00, NFLX: 0.58 },
        { name: 'NFLX', AAPL: 0.48, GOOGL: 0.45, MSFT: 0.52, TSLA: 0.35, NVDA: 0.48, AMZN: 0.52, META: 0.58, NFLX: 1.00 }
    ];

    // Mock sector rotation data
    const sectorRotationData = [
        { sector: 'Technology', weight: 35, change: 2.1, performance: 12.5, momentum: 0.85 },
        { sector: 'Healthcare', weight: 18, change: -0.8, performance: 8.2, momentum: 0.45 },
        { sector: 'Financials', weight: 15, change: 1.2, performance: 6.8, momentum: 0.62 },
        { sector: 'Consumer Discretionary', weight: 12, change: 0.5, performance: 9.1, momentum: 0.73 },
        { sector: 'Energy', weight: 8, change: -1.5, performance: -2.3, momentum: -0.25 },
        { sector: 'Consumer Staples', weight: 6, change: 0.3, performance: 4.7, momentum: 0.38 },
        { sector: 'Industrials', weight: 4, change: 0.8, performance: 7.2, momentum: 0.68 },
        { sector: 'Others', weight: 2, change: 0.2, performance: 3.1, momentum: 0.28 }
    ];

    // Mock risk metrics
    const riskMetrics = {
        sharpeRatio: 2.12,
        sortinoRatio: 2.85,
        calmarRatio: 1.95,
        maxDrawdown: -3.2,
        var95: -2.1,
        cvar95: -3.8,
        beta: 0.92,
        alpha: 0.045,
        informationRatio: 1.25,
        treynorRatio: 0.18
    };

    const getCorrelationColor = (value) => {
        if (value >= 0.7) return '#EF4444'; // High positive correlation
        if (value >= 0.3) return '#F59E0B'; // Moderate positive correlation
        if (value >= -0.3) return '#10B981'; // Low correlation
        if (value >= -0.7) return '#3B82F6'; // Moderate negative correlation
        return '#8B5CF6'; // High negative correlation
    };

    const getSectorColor = (performance) => {
        if (performance > 10) return '#10B981';
        if (performance > 5) return '#F59E0B';
        if (performance > 0) return '#3B82F6';
        return '#EF4444';
    };

    const CorrelationMatrix = () => (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Correlation Matrix</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="text-left py-2 text-gray-300">Stock</th>
                            {correlationMatrix[0] && Object.keys(correlationMatrix[0]).filter(key => key !== 'name').map(stock => (
                                <th key={stock} className="text-center py-2 text-gray-300">{stock}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {correlationMatrix.map((row, index) => (
                            <tr key={index}>
                                <td className="py-2 text-white font-medium">{row.name}</td>
                                {Object.keys(row).filter(key => key !== 'name').map(stock => (
                                    <td key={stock} className="text-center py-2">
                                        <div 
                                            className="w-8 h-8 rounded mx-auto flex items-center justify-center text-xs font-medium"
                                            style={{
                                                backgroundColor: getCorrelationColor(row[stock]),
                                                color: row[stock] >= 0.3 || row[stock] <= -0.3 ? 'white' : 'black'
                                            }}
                                        >
                                            {row[stock].toFixed(2)}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const RiskMetrics = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Risk-Adjusted Returns</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Sharpe Ratio</span>
                        <span className="text-green-400 font-semibold">{riskMetrics.sharpeRatio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Sortino Ratio</span>
                        <span className="text-green-400 font-semibold">{riskMetrics.sortinoRatio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Calmar Ratio</span>
                        <span className="text-green-400 font-semibold">{riskMetrics.calmarRatio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Information Ratio</span>
                        <span className="text-green-400 font-semibold">{riskMetrics.informationRatio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Treynor Ratio</span>
                        <span className="text-green-400 font-semibold">{riskMetrics.treynorRatio.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Risk Metrics</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Maximum Drawdown</span>
                        <span className="text-red-400 font-semibold">{riskMetrics.maxDrawdown.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Value at Risk (95%)</span>
                        <span className="text-yellow-400 font-semibold">{riskMetrics.var95.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Conditional VaR (95%)</span>
                        <span className="text-red-400 font-semibold">{riskMetrics.cvar95.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Beta</span>
                        <span className="text-blue-400 font-semibold">{riskMetrics.beta.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Alpha</span>
                        <span className="text-green-400 font-semibold">{(riskMetrics.alpha * 100).toFixed(2)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const SectorRotation = () => (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Sector Rotation Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sectorRotationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="sector" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Bar dataKey="performance" fill="#8B5CF6" />
                    </BarChart>
                </ResponsiveContainer>

                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Sector Details</h4>
                    {sectorRotationData.map((sector, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div>
                                <div className="text-white font-medium">{sector.sector}</div>
                                <div className="text-sm text-gray-400">{sector.weight}% allocation</div>
                            </div>
                            <div className="text-right">
                                <div className={`font-semibold ${getSectorColor(sector.performance)}`}>
                                    {sector.performance > 0 ? '+' : ''}{sector.performance.toFixed(1)}%
                                </div>
                                <div className="text-sm text-gray-400">
                                    {sector.change > 0 ? '+' : ''}{sector.change.toFixed(1)}% change
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

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
                        <h1 className="text-2xl font-bold text-white">Advanced Analytics</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <select
                            value={selectedTimeframe}
                            onChange={(e) => setSelectedTimeframe(e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        >
                            <option value="1M">1 Month</option>
                            <option value="3M">3 Months</option>
                            <option value="6M">6 Months</option>
                            <option value="1Y">1 Year</option>
                            <option value="2Y">2 Years</option>
                        </select>
                    </div>
                </div>
            </header>

            <main className="p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Metrics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-white mb-2">Sharpe Ratio</h3>
                            <div className="text-3xl font-bold text-green-400">{riskMetrics.sharpeRatio.toFixed(2)}</div>
                            <p className="text-gray-300 text-sm">Risk-adjusted return</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-white mb-2">Max Drawdown</h3>
                            <div className="text-3xl font-bold text-red-400">{riskMetrics.maxDrawdown.toFixed(1)}%</div>
                            <p className="text-gray-300 text-sm">Largest peak-to-trough</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-white mb-2">Beta</h3>
                            <div className="text-3xl font-bold text-blue-400">{riskMetrics.beta.toFixed(2)}</div>
                            <p className="text-gray-300 text-sm">Market sensitivity</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-white mb-2">Alpha</h3>
                            <div className="text-3xl font-bold text-green-400">{(riskMetrics.alpha * 100).toFixed(2)}%</div>
                            <p className="text-gray-300 text-sm">Excess return</p>
                        </div>
                    </div>

                    {/* Sharpe Ratio Chart */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Sharpe Ratio Tracking</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <ComposedChart data={sharpeData}>
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
                                />
                                <Line
                                    type="monotone"
                                    dataKey="portfolio"
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
                                <ReferenceLine y={0} stroke="#EF4444" strokeDasharray="3 3" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Drawdown Analysis */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Maximum Drawdown Analysis</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={drawdownData}>
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
                                    formatter={(value) => [value + '%', 'Drawdown']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="portfolio"
                                    stroke="#EF4444"
                                    fill="url(#drawdownGradient)"
                                    strokeWidth={2}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="benchmark"
                                    stroke="#6B7280"
                                    fill="url(#benchmarkGradient)"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                />
                                <defs>
                                    <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6B7280" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6B7280" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Risk Metrics */}
                    <RiskMetrics />

                    {/* Correlation Matrix */}
                    <CorrelationMatrix />

                    {/* Sector Rotation */}
                    <SectorRotation />
                </div>
            </main>
        </div>
    );
};

export default AdvancedAnalytics; 