import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const MarketSentiment = () => {
    const [sentimentData, setSentimentData] = useState([]);
    const [newsSentiment, setNewsSentiment] = useState([]);
    const [socialSentiment, setSocialSentiment] = useState([]);
    const [selectedStock, setSelectedStock] = useState('AAPL');
    const [timeframe, setTimeframe] = useState('1D');

    const stocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'AMZN', 'META', 'NFLX'];

    // Simulate real-time sentiment data
    const generateSentimentData = () => {
        const data = [];
        const now = new Date();
        
        for (let i = 23; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60 * 60 * 1000);
            data.push({
                time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sentiment: 0.5 + Math.sin(i * 0.3) * 0.3 + (Math.random() - 0.5) * 0.1,
                volume: Math.random() * 1000000 + 500000,
                volatility: Math.random() * 0.1 + 0.05,
                fearGreed: Math.random() * 100,
                timestamp: time.getTime()
            });
        }
        return data;
    };

    // Simulate news sentiment analysis
    const generateNewsSentiment = () => {
        const news = [
            { title: "Apple Reports Record Q4 Earnings", sentiment: 0.85, impact: 0.8, source: "Reuters" },
            { title: "Tech Sector Faces Regulatory Challenges", sentiment: -0.3, impact: 0.6, source: "Bloomberg" },
            { title: "AI Breakthrough Boosts Semiconductor Stocks", sentiment: 0.9, impact: 0.9, source: "CNBC" },
            { title: "Market Volatility Increases Amid Economic Data", sentiment: -0.2, impact: 0.4, source: "WSJ" },
            { title: "Federal Reserve Signals Rate Cut", sentiment: 0.7, impact: 0.7, source: "Financial Times" }
        ];
        return news;
    };

    // Simulate social media sentiment
    const generateSocialSentiment = () => {
        const platforms = [
            { name: 'Twitter', sentiment: 0.65, volume: 125000, change: 0.12 },
            { name: 'Reddit', sentiment: 0.45, volume: 89000, change: -0.08 },
            { name: 'StockTwits', sentiment: 0.78, volume: 67000, change: 0.25 },
            { name: 'Discord', sentiment: 0.52, volume: 45000, change: 0.05 },
            { name: 'Telegram', sentiment: 0.38, volume: 32000, change: -0.15 }
        ];
        return platforms;
    };

    useEffect(() => {
        setSentimentData(generateSentimentData());
        setNewsSentiment(generateNewsSentiment());
        setSocialSentiment(generateSocialSentiment());
    }, []);

    const getSentimentColor = (sentiment) => {
        if (sentiment > 0.6) return '#10B981';
        if (sentiment > 0.4) return '#F59E0B';
        return '#EF4444';
    };

    const SentimentGauge = ({ value, label }) => (
        <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-gray-700 flex items-center justify-center">
                <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold"
                    style={{
                        background: `conic-gradient(${getSentimentColor(value)} ${value * 360}deg, #374151 ${value * 360}deg)`
                    }}
                >
                    {(value * 100).toFixed(0)}%
                </div>
            </div>
            <p className="text-center text-gray-300 text-sm mt-2">{label}</p>
        </div>
    );

    const NewsCard = ({ news }) => (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium text-sm">{news.title}</h4>
                <span 
                    className={`px-2 py-1 rounded text-xs font-medium ${
                        news.sentiment > 0.6 ? 'bg-green-500/20 text-green-400' :
                        news.sentiment > 0.4 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                    }`}
                >
                    {(news.sentiment * 100).toFixed(0)}%
                </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{news.source}</span>
                <span>Impact: {(news.impact * 100).toFixed(0)}%</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">Market Sentiment Analysis</h1>
                    <p className="text-xl text-gray-300">Real-time sentiment insights for smarter trading decisions</p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <select
                            value={selectedStock}
                            onChange={(e) => setSelectedStock(e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                        >
                            {stocks.map(stock => (
                                <option key={stock} value={stock}>{stock}</option>
                            ))}
                        </select>
                        <div className="flex items-center gap-2">
                            {['1H', '1D', '1W', '1M'].map(tf => (
                                <button
                                    key={tf}
                                    onClick={() => setTimeframe(tf)}
                                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                                        timeframe === tf 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-sm">Last updated: {new Date().toLocaleTimeString()}</p>
                    </div>
                </div>

                {/* Sentiment Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">Overall Sentiment</h3>
                        <div className="flex justify-center">
                            <SentimentGauge 
                                value={sentimentData[sentimentData.length - 1]?.sentiment || 0.5} 
                                label="Sentiment" 
                            />
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">Fear & Greed Index</h3>
                        <div className="flex justify-center">
                            <SentimentGauge 
                                value={(sentimentData[sentimentData.length - 1]?.fearGreed || 50) / 100} 
                                label="Fear/Greed" 
                            />
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">Market Volatility</h3>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">
                                {(sentimentData[sentimentData.length - 1]?.volatility * 100 || 5).toFixed(1)}%
                            </div>
                            <p className="text-gray-300 text-sm">Current Volatility</p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">Trading Volume</h3>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">
                                {((sentimentData[sentimentData.length - 1]?.volume || 750000) / 1000000).toFixed(1)}M
                            </div>
                            <p className="text-gray-300 text-sm">24h Volume</p>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Sentiment Timeline</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={sentimentData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="time" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" domain={[0, 1]} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    formatter={(value) => [(value * 100).toFixed(1) + '%', 'Sentiment']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="sentiment"
                                    stroke="#10B981"
                                    strokeWidth={2}
                                    dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Social Media Sentiment</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={socialSentiment}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" domain={[0, 1]} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    formatter={(value) => [(value * 100).toFixed(1) + '%', 'Sentiment']}
                                />
                                <Bar dataKey="sentiment" fill="#8B5CF6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* News Sentiment */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Latest News Sentiment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {newsSentiment.map((news, index) => (
                            <NewsCard key={index} news={news} />
                        ))}
                    </div>
                </div>

                {/* Sentiment Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Sentiment Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Positive', value: 45, color: '#10B981' },
                                        { name: 'Neutral', value: 35, color: '#F59E0B' },
                                        { name: 'Negative', value: 20, color: '#EF4444' }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                >
                                    {socialSentiment.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Market Indicators</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">VIX Index</span>
                                <span className="text-white font-semibold">18.5</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Put/Call Ratio</span>
                                <span className="text-white font-semibold">0.85</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Advance/Decline</span>
                                <span className="text-green-400 font-semibold">+1.2</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">New Highs/Lows</span>
                                <span className="text-white font-semibold">156/23</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Market Breadth</span>
                                <span className="text-green-400 font-semibold">+0.67</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketSentiment;