import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';

// Advanced MAB Algorithms
class PortfolioOptimizerClass {
    constructor(stocks) {
        this.stocks = stocks;
        this.returns = {};
        this.covarianceMatrix = [];
        this.optimalWeights = [];
    }

    // Calculate expected returns using historical data
    calculateExpectedReturns(historicalData) {
        this.stocks.forEach(stock => {
            if (historicalData[stock] && historicalData[stock].length > 0) {
                const returns = [];
                for (let i = 1; i < historicalData[stock].length; i++) {
                    const currentPrice = historicalData[stock][i].price;
                    const previousPrice = historicalData[stock][i-1].price;
                    returns.push((currentPrice - previousPrice) / previousPrice);
                }
                this.returns[stock] = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
            }
        });
    }

    // Calculate covariance matrix
    calculateCovarianceMatrix(historicalData) {
        const n = this.stocks.length;
        this.covarianceMatrix = Array(n).fill().map(() => Array(n).fill(0));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const stock1 = this.stocks[i];
                const stock2 = this.stocks[j];
                
                if (historicalData[stock1] && historicalData[stock2]) {
                    const returns1 = this.getReturns(historicalData[stock1]);
                    const returns2 = this.getReturns(historicalData[stock2]);
                    
                    if (returns1.length === returns2.length && returns1.length > 0) {
                        const mean1 = returns1.reduce((sum, ret) => sum + ret, 0) / returns1.length;
                        const mean2 = returns2.reduce((sum, ret) => sum + ret, 0) / returns2.length;
                        
                        let covariance = 0;
                        for (let k = 0; k < returns1.length; k++) {
                            covariance += (returns1[k] - mean1) * (returns2[k] - mean2);
                        }
                        this.covarianceMatrix[i][j] = covariance / returns1.length;
                    }
                }
            }
        }
    }

    getReturns(data) {
        const returns = [];
        for (let i = 1; i < data.length; i++) {
            const currentPrice = data[i].price;
            const previousPrice = data[i-1].price;
            returns.push((currentPrice - previousPrice) / previousPrice);
        }
        return returns;
    }

    // Markowitz Portfolio Optimization
    optimizePortfolio(targetReturn = null) {
        const n = this.stocks.length;
        const weights = new Array(n).fill(1/n); // Equal weight starting point
        
        // Simple gradient descent optimization
        const learningRate = 0.01;
        const iterations = 1000;
        
        for (let iter = 0; iter < iterations; iter++) {
            const gradients = this.calculateGradients(weights, targetReturn);
            
            for (let i = 0; i < n; i++) {
                weights[i] -= learningRate * gradients[i];
            }
            
            // Normalize weights to sum to 1
            const sum = weights.reduce((s, w) => s + w, 0);
            for (let i = 0; i < n; i++) {
                weights[i] = Math.max(0, weights[i] / sum); // No short selling
            }
        }
        
        this.optimalWeights = weights;
        return weights;
    }

    calculateGradients(weights, targetReturn) {
        const n = this.stocks.length;
        const gradients = new Array(n).fill(0);
        
        // Calculate portfolio variance
        let portfolioVariance = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                portfolioVariance += weights[i] * weights[j] * this.covarianceMatrix[i][j];
            }
        }
        
        // Calculate gradients
        for (let i = 0; i < n; i++) {
            let gradient = 0;
            for (let j = 0; j < n; j++) {
                gradient += weights[j] * this.covarianceMatrix[i][j];
            }
            gradients[i] = 2 * gradient; // Derivative of variance
        }
        
        return gradients;
    }

    // Calculate portfolio metrics
    calculatePortfolioMetrics(weights) {
        const expectedReturn = weights.reduce((sum, weight, i) => 
            sum + weight * this.returns[this.stocks[i]], 0);
        
        let variance = 0;
        for (let i = 0; i < weights.length; i++) {
            for (let j = 0; j < weights.length; j++) {
                variance += weights[i] * weights[j] * this.covarianceMatrix[i][j];
            }
        }
        
        const volatility = Math.sqrt(variance);
        const sharpeRatio = expectedReturn / volatility;
        
        return {
            expectedReturn,
            volatility,
            sharpeRatio,
            weights
        };
    }
}

const PortfolioOptimizer = () => {
    const [selectedStocks, setSelectedStocks] = useState(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA']);
    const [optimizer, setOptimizer] = useState(null);
    const [portfolioMetrics, setPortfolioMetrics] = useState(null);
    const [historicalData, setHistoricalData] = useState({});
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [riskTolerance, setRiskTolerance] = useState(0.5);
    const [targetReturn, setTargetReturn] = useState(0.15);

    const availableStocks = [
        'AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'AMZN', 'META', 'NFLX',
        'ADBE', 'INTC', 'CSCO', 'ORCL', 'BAC', 'WMT', 'PG', 'MA'
    ];

    // Simulate historical data
    const generateHistoricalData = () => {
        const data = {};
        selectedStocks.forEach(stock => {
            const prices = [];
            let currentPrice = 100 + Math.random() * 200;
            
            for (let i = 0; i < 252; i++) { // One year of trading days
                const dailyReturn = (Math.random() - 0.5) * 0.04; // ±2% daily return
                currentPrice *= (1 + dailyReturn);
                prices.push({
                    date: new Date(Date.now() - (252 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                    price: currentPrice,
                    volume: Math.random() * 1000000 + 500000
                });
            }
            data[stock] = prices;
        });
        return data;
    };

    useEffect(() => {
        const data = generateHistoricalData();
        setHistoricalData(data);
        
        const newOptimizer = new PortfolioOptimizerClass(selectedStocks);
        newOptimizer.calculateExpectedReturns(data);
        newOptimizer.calculateCovarianceMatrix(data);
        setOptimizer(newOptimizer);
    }, [selectedStocks]);

    const runOptimization = () => {
        if (!optimizer) return;
        
        setIsOptimizing(true);
        setTimeout(() => {
            const weights = optimizer.optimizePortfolio(targetReturn);
            const metrics = optimizer.calculatePortfolioMetrics(weights);
            setPortfolioMetrics(metrics);
            setIsOptimizing(false);
        }, 1000);
    };

    const addStock = (stock) => {
        if (!selectedStocks.includes(stock) && selectedStocks.length < 10) {
            setSelectedStocks([...selectedStocks, stock]);
        }
    };

    const removeStock = (stock) => {
        setSelectedStocks(selectedStocks.filter(s => s !== stock));
    };

    const getRiskColor = (volatility) => {
        if (volatility < 0.15) return '#10B981';
        if (volatility < 0.25) return '#F59E0B';
        return '#EF4444';
    };

    const getReturnColor = (return_) => {
        if (return_ > 0.15) return '#10B981';
        if (return_ > 0.08) return '#F59E0B';
        return '#EF4444';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">Portfolio Optimizer</h1>
                    <p className="text-xl text-gray-300">Advanced portfolio optimization using Modern Portfolio Theory</p>
                </div>

                {/* Stock Selection */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Selected Stocks</h3>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {selectedStocks.map(stock => (
                                <div key={stock} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-2">
                                    <span className="text-white">{stock}</span>
                                    <button
                                        onClick={() => removeStock(stock)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-400 text-sm">{selectedStocks.length}/10 stocks selected</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Add Stocks</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {availableStocks.filter(stock => !selectedStocks.includes(stock)).map(stock => (
                                <button
                                    key={stock}
                                    onClick={() => addStock(stock)}
                                    className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-2 text-sm transition-colors"
                                >
                                    {stock}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Optimization Parameters */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">Risk Tolerance</h3>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={riskTolerance}
                            onChange={(e) => setRiskTolerance(parseFloat(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-300 mt-2">
                            <span>Conservative</span>
                            <span>Aggressive</span>
                        </div>
                        <p className="text-white mt-2">Current: {(riskTolerance * 100).toFixed(0)}%</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">Target Return</h3>
                        <input
                            type="range"
                            min="0.05"
                            max="0.25"
                            step="0.01"
                            value={targetReturn}
                            onChange={(e) => setTargetReturn(parseFloat(e.target.value))}
                            className="w-full"
                        />
                        <p className="text-white mt-2">{(targetReturn * 100).toFixed(1)}% annually</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">Optimization</h3>
                        <button
                            onClick={runOptimization}
                            disabled={isOptimizing || selectedStocks.length < 2}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                        >
                            {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
                        </button>
                    </div>
                </div>

                {/* Results */}
                {portfolioMetrics && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-4">Portfolio Metrics</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Expected Return:</span>
                                    <span className={`font-semibold ${getReturnColor(portfolioMetrics.expectedReturn)}`}>
                                        {(portfolioMetrics.expectedReturn * 100).toFixed(2)}%
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Volatility:</span>
                                    <span className={`font-semibold ${getRiskColor(portfolioMetrics.volatility)}`}>
                                        {(portfolioMetrics.volatility * 100).toFixed(2)}%
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Sharpe Ratio:</span>
                                    <span className="text-white font-semibold">
                                        {portfolioMetrics.sharpeRatio.toFixed(3)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-4">Optimal Weights</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={portfolioMetrics.weights.map((weight, index) => ({
                                            name: selectedStocks[index],
                                            value: weight * 100
                                        }))}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={60}
                                        dataKey="value"
                                    >
                                        {portfolioMetrics.weights.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 60%)`} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: '1px solid #374151',
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                        formatter={(value) => [value.toFixed(1) + '%', 'Weight']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Historical Performance */}
                {Object.keys(historicalData).length > 0 && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Historical Performance</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={historicalData[selectedStocks[0]]?.slice(-30) || []}>
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
                                    formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                                />
                                {selectedStocks.slice(0, 3).map((stock, index) => (
                                    <Line
                                        key={stock}
                                        type="monotone"
                                        dataKey="price"
                                        data={historicalData[stock]?.slice(-30) || []}
                                        stroke={`hsl(${index * 120}, 70%, 60%)`}
                                        strokeWidth={2}
                                        dot={false}
                                        name={stock}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortfolioOptimizer; 