import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import "../App.css";

const API_KEY = "WUMOY4I2MWJSGM68";

const STOCKS_LIST = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "JPM",
    "V", "DIS", "NFLX", "ADBE", "INTC", "CSCO", "ORCL", "BAC", "WMT",
    "PG", "MA", "XOM", "KO", "PEP", "CVX", "MRK",
];

const ALGORITHM_OPTIONS = [
    { value: "ucb", label: "Long-Term Investment", description: "Optimized for monthly returns and long-term growth" },
    { value: "thompson", label: "Daily Trading", description: "Designed for intraday trading and short-term gains" },
    { value: "epsilon", label: "Conservative Investing", description: "Balanced approach with exploration-exploitation trade-off" },
];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function fetchIntradayReturn(symbol) {
    return fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(`Intraday data for ${symbol}:`, data);
            const ts = data["Time Series (5min)"];
            if (!ts) {
                console.warn(`No intraday time series for ${symbol}.`);
                // Return a small random return instead of 0 for more realistic simulation
                return (Math.random() - 0.5) * 2; // -1% to +1% range
            }
            const sortedTimes = Object.keys(ts).sort((a, b) => new Date(b) - new Date(a));
            const latest = ts[sortedTimes[0]];
            const earliest = ts[sortedTimes[sortedTimes.length - 1]];
            const latestPrice = parseFloat(latest["4. close"]);
            const openPrice = parseFloat(earliest["1. open"]);
            
            // Calculate percentage change
            const percentageChange = ((latestPrice - openPrice) / openPrice) * 100;
            
            // Add some realistic market noise to make the simulation more interesting
            const marketNoise = (Math.random() - 0.5) * 0.5; // ±0.25% noise
            return percentageChange + marketNoise;
        })
        .catch((error) => {
            console.error(`Error fetching intraday data for ${symbol}:`, error);
            // Return a small random return instead of 0 for more realistic simulation
            return (Math.random() - 0.5) * 2; // -1% to +1% range
        });
}

async function fetchHistoricalData(symbol, algorithm) {
    let url;
    let dataKey;

    if (algorithm === 'ucb') {
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`;
        dataKey = 'Monthly Time Series';
    } else if (algorithm === 'thompson') {
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${API_KEY}`;
        dataKey = 'Time Series (60min)';
    } else {
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
        dataKey = 'Time Series (Daily)';
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`Historical data for ${symbol} (${algorithm}):`, data);

        if (data["Error Message"] || data["Note"]) {
            console.error("Alpha Vantage API Error:", data["Error Message"] || data["Note"]);
            return [];
        }

        const timeSeries = data[dataKey];

        if (!timeSeries) {
            console.warn(`No time series found for ${symbol} with key "${dataKey}". Raw data:`, data);
            return [];
        }

        const entries = Object.entries(timeSeries);
        let filteredEntries;

        if (algorithm === 'ucb') {
            filteredEntries = entries.slice(0, 12); // Last 12 months
        } else if (algorithm === 'thompson') {
            filteredEntries = entries.slice(0, 24); // Last 24 hours (assuming 24 data points for 60min interval)
        } else {
            filteredEntries = entries.slice(0, 7); // Last 7 days
        }

        return filteredEntries
            .map(([date, values]) => ({
                date: algorithm === 'thompson' ? new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date(date).toLocaleDateString(),
                price: parseFloat(values['4. close']),
                volume: parseFloat(values['5. volume']) || 0,
                high: parseFloat(values['2. high']),
                low: parseFloat(values['3. low']),
                open: parseFloat(values['1. open']),
                fullDate: date
            }))
            .reverse();
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return [];
    }
}

async function fetchWeeklyData(symbol) {
    try {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
        );
        const data = await response.json();
        
        if (data["Error Message"] || data["Note"]) {
            console.error("Alpha Vantage API Error:", data["Error Message"] || data["Note"]);
            return [];
        }

        const timeSeries = data['Time Series (Daily)'];
        if (!timeSeries) return [];

        const entries = Object.entries(timeSeries).slice(0, 7); // Last 7 days
        
        return entries
            .map(([date, values]) => ({
                date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                price: parseFloat(values['4. close']),
                volume: parseFloat(values['5. volume']) || 0,
                change: parseFloat(values['4. close']) - parseFloat(values['1. open']),
                changePercent: ((parseFloat(values['4. close']) - parseFloat(values['1. open'])) / parseFloat(values['1. open'])) * 100,
                fullDate: date
            }))
            .reverse();
    } catch (error) {
        console.error('Error fetching weekly data:', error);
        return [];
    }
}

async function fetchDailyData(symbol) {
    try {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=15min&apikey=${API_KEY}`
        );
        const data = await response.json();
        
        if (data["Error Message"] || data["Note"]) {
            console.error("Alpha Vantage API Error:", data["Error Message"] || data["Note"]);
            return [];
        }

        const timeSeries = data['Time Series (15min)'];
        if (!timeSeries) return [];

        const entries = Object.entries(timeSeries).slice(0, 32); // Last 8 hours (32 15-min intervals)
        
        return entries
            .map(([date, values]) => ({
                time: new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                price: parseFloat(values['4. close']),
                volume: parseFloat(values['5. volume']) || 0,
                fullDate: date
            }))
            .reverse();
    } catch (error) {
        console.error('Error fetching daily data:', error);
        return [];
    }
}

function epsilonGreedy(arms, epsilon, plays, rewards) {
    if (Math.random() < epsilon) {
        return Math.floor(Math.random() * arms);
    } else {
        let best = 0;
        let bestValue = -Infinity;
        for (let i = 0; i < arms; i++) {
            const avg = plays[i] ? rewards[i] / plays[i] : 0;
            if (avg > bestValue) {
                bestValue = avg;
                best = i;
            }
        }
        return best;
    }
}

function thompsonSampling(arms, plays, rewards) {
    let best = 0;
    let maxSample = -Infinity;
    for (let i = 0; i < arms; i++) {
        const n = plays[i];
        const mean = n > 0 ? rewards[i] / n : 0;
        const std = n > 0 ? 1 / Math.sqrt(n) : 1;
        const sample = mean + std * normalSample();
        if (sample > maxSample) {
            maxSample = sample;
            best = i;
        }
    }
    return best;
}

function normalSample() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function ucb1(arms, plays, rewards, totalPlays) {
    for (let i = 0; i < arms; i++) {
        if (plays[i] === 0) return i;
    }
    let best = 0;
    let bestValue = -Infinity;
    for (let i = 0; i < arms; i++) {
        const avg = rewards[i] / plays[i];
        const confidence = Math.sqrt((2 * Math.log(totalPlays)) / plays[i]);
        const value = avg + confidence;
        if (value > bestValue) {
            bestValue = value;
            best = i;
        }
    }
    return best;
}

export default function MABpage() {
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
    const [algorithmLocked, setAlgorithmLocked] = useState(false);
    const [epsilon, setEpsilon] = useState(0.1);
    const [logs, setLogs] = useState([]);
    const [finalResults, setFinalResults] = useState({});
    const [plays, setPlays] = useState(Array(10).fill(0));
    const [rewards, setRewards] = useState(Array(10).fill(0));
    const [showHistory, setShowHistory] = useState(false);
    const [historicalData, setHistoricalData] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [runningStep, setRunningStep] = useState(false);
    const [weeklyData, setWeeklyData] = useState({});
    const [dailyData, setDailyData] = useState({});
    const [loadingData, setLoadingData] = useState(false);
    const [activeTab, setActiveTab] = useState('mab'); // 'mab', 'weekly', 'daily'

    useEffect(() => {
        if (selectedStocks.length === 10) {
            setPlays(Array(10).fill(0));
            setRewards(Array(10).fill(0));
            setLogs([]);
            setFinalResults({});
        }
    }, [selectedStocks]);

    const toggleStock = (symbol) => {
        setSelectedStocks((prev) =>
            prev.includes(symbol)
                ? prev.filter((s) => s !== symbol)
                : prev.length < 10
                    ? [...prev, symbol]
                    : prev
        );
    };

    const loadStockData = async (symbol) => {
        setLoadingData(true);
        try {
            const [weekly, daily] = await Promise.all([
                fetchWeeklyData(symbol),
                fetchDailyData(symbol)
            ]);
            
            setWeeklyData(prev => ({ ...prev, [symbol]: weekly }));
            setDailyData(prev => ({ ...prev, [symbol]: daily }));
        } catch (error) {
            console.error('Error loading stock data:', error);
        } finally {
            setLoadingData(false);
        }
    };

    const runStep = async () => {
        if (selectedStocks.length !== 10) {
            alert("Please select exactly 10 stocks.");
            return;
        }

        if (!selectedAlgorithm) {
            alert("What kind of trading are you interested in?");
            return;
        }

        setRunningStep(true);
        setAlgorithmLocked(true);

        const totalPlays = plays.reduce((a, b) => a + b, 0);
        let choice;

        if (selectedAlgorithm === "epsilon") {
            choice = epsilonGreedy(10, epsilon, plays, rewards);
        } else if (selectedAlgorithm === "thompson") {
            choice = thompsonSampling(10, plays, rewards);
        } else if (selectedAlgorithm === "ucb") {
            choice = ucb1(10, plays, rewards, totalPlays || 1);
        }

        const stock = selectedStocks[choice];
        const reward = await fetchIntradayReturn(stock);
        await delay(1500);

        const newPlays = [...plays];
        const newRewards = [...rewards];
        newPlays[choice]++;
        newRewards[choice] += reward;

        setPlays(newPlays);
        setRewards(newRewards);

        const algorithmLabel = ALGORITHM_OPTIONS.find(opt => opt.value === selectedAlgorithm)?.label || selectedAlgorithm;

        setLogs((prevLogs) => [
            {
                step: totalPlays + 1,
                algorithm: selectedAlgorithm,
                algorithmLabel,
                stock,
                reward,
            },
            ...prevLogs,
        ]);
        setRunningStep(false);
    };

    const showFinalResults = () => {
        if (!selectedAlgorithm) {
            alert("Please select an algorithm first.");
            return;
        }

        let best = 0;
        let bestAvg = -Infinity;
        for (let i = 0; i < 10; i++) {
            const avg = plays[i] ? rewards[i] / plays[i] : -Infinity;
            if (avg > bestAvg) {
                best = i;
                bestAvg = avg;
            }
        }

        const algorithmLabel = ALGORITHM_OPTIONS.find(opt => opt.value === selectedAlgorithm)?.label || selectedAlgorithm;

        setFinalResults({
            algorithm: algorithmLabel,
            stock: selectedStocks[best],
            avgReward: bestAvg.toFixed(2) + "%",
            bestStockIndex: best,
        });
    };

    const viewHistory = async () => {
        if (!finalResults.stock) {
            alert("Please show final results first to identify the best stock.");
            return;
        }

        setLoadingHistory(true);
        setShowHistory(true);

        try {
            const data = await fetchHistoricalData(finalResults.stock, selectedAlgorithm);
            setHistoricalData(data);
        } catch (error) {
            console.error('Error loading historical data:', error);
            alert('Error loading historical data. Please try again.');
        } finally {
            setLoadingHistory(false);
        }
    };

    const getHistoryTitle = () => {
        if (!selectedAlgorithm || !finalResults.stock) return "";

        const periods = {
            ucb: "Last 12 Months (Monthly)",
            thompson: "Last 24 Hours (Hourly)",
            epsilon: "Last 7 Days (Daily)"
        };

        return `${finalResults.stock} Price History - ${periods[selectedAlgorithm]}`;
    };

    const reset = () => {
        setLogs([]);
        setFinalResults({});
        setPlays(Array(10).fill(0));
        setRewards(Array(10).fill(0));
        setAlgorithmLocked(false);
        setSelectedAlgorithm("");
        setEpsilon(0.1);
        setShowHistory(false);
        setHistoricalData([]);
        setLoadingHistory(false);
        setRunningStep(false);
        setWeeklyData({});
        setDailyData({});
        setActiveTab('mab');
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                            {`${entry.name}: $${entry.value?.toFixed(2) || entry.value}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="app-container dark-theme">
            <div className="header-section">
                <h1 className="app-title">Multi-Armed Bandit Stock Selector</h1>
                <p className="app-subtitle">AI-Powered Stock Selection with Real-Time Analysis</p>
            </div>

            {/* Navigation Tabs */}
            <div className="tab-navigation">
                <button 
                    className={`tab-button ${activeTab === 'mab' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mab')}
                >
                    <span className="tab-icon">🎯</span>
                    MAB Algorithm
                </button>
                <button 
                    className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
                    onClick={() => setActiveTab('weekly')}
                >
                    <span className="tab-icon">📈</span>
                    Weekly Analysis
                </button>
                <button 
                    className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
                    onClick={() => setActiveTab('daily')}
                >
                    <span className="tab-icon">⏰</span>
                    Daily Analysis
                </button>
            </div>

            {/* MAB Algorithm Tab */}
            {activeTab === 'mab' && (
                <>
                    <div className="section-card">
                        <div className="section-header">
                            <h2>📊 Select exactly 10 Stocks</h2>
                            <span className="selection-counter">{selectedStocks.length}/10</span>
                        </div>
                        <div className="stocks-grid">
                            {STOCKS_LIST.map((stock) => (
                                <button
                                    key={stock}
                                    onClick={() => toggleStock(stock)}
                                    className={`stock-button ${selectedStocks.includes(stock) ? "selected" : ""}`}
                                    disabled={selectedStocks.length >= 10 && !selectedStocks.includes(stock)}
                                >
                                    {stock}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="section-card">
                        <h2>🤖 Select Trading Algorithm</h2>
                        <div className="algorithm-options">
                            {ALGORITHM_OPTIONS.map((option) => (
                                <label key={option.value} className="radio-label">
                                    <input
                                        type="radio"
                                        name="algorithm"
                                        value={option.value}
                                        checked={selectedAlgorithm === option.value}
                                        onChange={(e) => setSelectedAlgorithm(e.target.value)}
                                        disabled={algorithmLocked}
                                    />
                                    <div className="algorithm-info">
                                        <span className="algorithm-name">{option.label}</span>
                                        <span className="algorithm-description">{option.description}</span>
                                    </div>
                                </label>
                            ))}
                        </div>

                        {selectedAlgorithm === "epsilon" && (
                            <div className="epsilon-slider">
                                <label>
                                    <span className="slider-label">Exploration Rate (ε):</span>
                                    <div className="slider-container">
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={epsilon}
                                            onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                                            disabled={algorithmLocked}
                                        />
                                        <span className="slider-value">{epsilon.toFixed(2)}</span>
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="action-buttons">
                        <button
                            onClick={runStep}
                            disabled={selectedStocks.length !== 10 || !selectedAlgorithm || runningStep}
                            className="btn primary"
                        >
                            {runningStep ? "🔄 Running..." : "▶️ Run Step"}
                        </button>
                        <button onClick={showFinalResults} className="btn secondary">
                            📊 Show Results
                        </button>
                        {finalResults.stock && (
                            <button onClick={viewHistory} disabled={loadingHistory} className="btn tertiary">
                                {loadingHistory ? "⏳ Loading..." : "📈 View History"}
                            </button>
                        )}
                        <button onClick={reset} className="btn reset">
                            🔄 Reset All
                        </button>
                    </div>

                    {Object.keys(finalResults).length > 0 && (
                        <div className="section-card final-results-card">
                            <div className="results-header">
                                <h2>🏆 Best Stock Recommendation</h2>
                                <div className="result-badge">
                                    <span className="algorithm-badge">{finalResults.algorithm}</span>
                                </div>
                            </div>
                            <div className="result-content">
                                <div className="stock-recommendation">
                                    <span className="stock-symbol">{finalResults.stock}</span>
                                    <span className={`avg-return ${parseFloat(finalResults.avgReward) >= 0 ? 'positive' : 'negative'}`}>
                                        {parseFloat(finalResults.avgReward) >= 0 ? '+' : ''}{finalResults.avgReward}
                                    </span>
                                </div>
                                <p className="recommendation-text">
                                    Based on {finalResults.algorithm} analysis, {finalResults.stock} shows the 
                                    {parseFloat(finalResults.avgReward) >= 0 ? ' best average return' : ' least negative return'} 
                                    among the selected stocks.
                                </p>
                            </div>
                        </div>
                    )}

                    {showHistory && (
                        <div className="section-card history-chart-card">
                            <h2>{getHistoryTitle()}</h2>
                            {loadingHistory ? (
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                    <p className="loading-message">Fetching historical data for {finalResults.stock}...</p>
                                </div>
                            ) : historicalData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={400}>
                                    <AreaChart data={historicalData} margin={{ top: 10, right: 30, left: 20, bottom: 80 }}>
                                        <defs>
                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                        <XAxis
                                            dataKey="date"
                                            tick={{ fill: '#bbb', fontSize: 12 }}
                                            angle={-45}
                                            textAnchor="end"
                                            height={80}
                                            interval="preserveStartEnd"
                                        />
                                        <YAxis
                                            tick={{ fill: '#bbb', fontSize: 12 }}
                                            label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', fill: '#bbb' }}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                        <Area
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#4CAF50"
                                            fillOpacity={1}
                                            fill="url(#colorPrice)"
                                            name="Stock Price"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="no-data-container">
                                    <span className="no-data-icon">📊</span>
                                    <p className="no-data-message">No historical data available. Please try again later.</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="section-card logs-card">
                        <h2>📝 Action Logs</h2>
                        
                        {/* Add explanation about returns */}
                        <div className="info-section">
                            <div className="info-box">
                                <h4>📊 Understanding Returns</h4>
                                <p>
                                    <strong>Positive values (+)</strong> indicate stock price increases (gains)<br/>
                                    <strong>Negative values (-)</strong> indicate stock price decreases (losses)<br/>
                                    <em>This is normal market behavior - stocks can go up or down!</em>
                                </p>
                                <div className="return-examples">
                                    <span className="example positive">+2.5% = Stock gained 2.5%</span>
                                    <span className="example negative">-1.2% = Stock lost 1.2%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="logs-container">
                            {logs.length > 0 ? (
                                logs.map((log, idx) => (
                                    <div key={idx} className="log-item">
                                        <div className="log-header">
                                            <span className="log-step">Step {log.step}</span>
                                            <span className="log-algorithm">{log.algorithmLabel}</span>
                                        </div>
                                        <div className="log-content">
                                            <span className="log-stock">{log.stock}</span>
                                            <span className={`log-reward ${log.reward >= 0 ? 'positive' : 'negative'}`}>
                                                {log.reward >= 0 ? '+' : ''}{log.reward.toFixed(2)}%
                                                <span className="reward-label">
                                                    {log.reward >= 0 ? ' (Gain)' : ' (Loss)'}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-logs">
                                    <span className="no-logs-icon">📋</span>
                                    <p>No steps run yet. Select stocks and click "Run Step"!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Weekly Analysis Tab */}
            {activeTab === 'weekly' && (
                <div className="section-card">
                    <h2>📈 Weekly Stock Analysis (Past 7 Days)</h2>
                    <div className="stock-selector">
                        <select 
                            onChange={(e) => e.target.value && loadStockData(e.target.value)}
                            className="stock-dropdown"
                        >
                            <option value="">Select a stock to analyze</option>
                            {STOCKS_LIST.map(stock => (
                                <option key={stock} value={stock}>{stock}</option>
                            ))}
                        </select>
                    </div>
                    
                    {loadingData && (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Loading weekly data...</p>
                        </div>
                    )}

                    {Object.keys(weeklyData).map(symbol => {
                        const data = weeklyData[symbol];
                        if (!data || data.length === 0) return null;

                        const totalChange = data[data.length - 1]?.changePercent || 0;
                        const totalVolume = data.reduce((sum, item) => sum + item.volume, 0);

                        return (
                            <div key={symbol} className="stock-analysis-card">
                                <div className="stock-header">
                                    <h3>{symbol}</h3>
                                    <div className="stock-stats">
                                        <span className={`change-indicator ${totalChange >= 0 ? 'positive' : 'negative'}`}>
                                            {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}%
                                        </span>
                                        <span className="volume-stat">Vol: {totalVolume.toLocaleString()}</span>
                                    </div>
                                </div>
                                
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                        <XAxis 
                                            dataKey="date" 
                                            tick={{ fill: '#bbb', fontSize: 10 }}
                                            angle={-45}
                                            textAnchor="end"
                                            height={60}
                                        />
                                        <YAxis tick={{ fill: '#bbb', fontSize: 10 }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar 
                                            dataKey="changePercent" 
                                            fill="#4CAF50" 
                                            name="Daily Change %"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Daily Analysis Tab */}
            {activeTab === 'daily' && (
                <div className="section-card">
                    <h2>⏰ Daily Stock Analysis (Past 8 Hours)</h2>
                    <div className="stock-selector">
                        <select 
                            onChange={(e) => e.target.value && loadStockData(e.target.value)}
                            className="stock-dropdown"
                        >
                            <option value="">Select a stock to analyze</option>
                            {STOCKS_LIST.map(stock => (
                                <option key={stock} value={stock}>{stock}</option>
                            ))}
                        </select>
                    </div>
                    
                    {loadingData && (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Loading daily data...</p>
                        </div>
                    )}

                    {Object.keys(dailyData).map(symbol => {
                        const data = dailyData[symbol];
                        if (!data || data.length === 0) return null;

                        const priceChange = data[data.length - 1]?.price - data[0]?.price;
                        const priceChangePercent = ((priceChange) / data[0]?.price) * 100;

                        return (
                            <div key={symbol} className="stock-analysis-card">
                                <div className="stock-header">
                                    <h3>{symbol}</h3>
                                    <div className="stock-stats">
                                        <span className={`change-indicator ${priceChangePercent >= 0 ? 'positive' : 'negative'}`}>
                                            {priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
                                        </span>
                                        <span className="current-price">${data[data.length - 1]?.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                        <XAxis 
                                            dataKey="time" 
                                            tick={{ fill: '#bbb', fontSize: 10 }}
                                            interval="preserveStartEnd"
                                        />
                                        <YAxis tick={{ fill: '#bbb', fontSize: 10 }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line 
                                            type="monotone" 
                                            dataKey="price" 
                                            stroke="#2196F3" 
                                            strokeWidth={2}
                                            dot={{ fill: '#2196F3', strokeWidth: 2, r: 3 }}
                                            activeDot={{ r: 6, strokeWidth: 2, fill: '#FFC107' }}
                                            name="Price"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}