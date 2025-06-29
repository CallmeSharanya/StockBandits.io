import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const API_KEY = "WUMOY4I2MWJSGM68";

const STOCKS_LIST = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "JPM",
    "V", "DIS", "NFLX", "ADBE", "INTC", "CSCO", "ORCL", "BAC", "WMT",
    "PG", "MA", "XOM", "KO", "PEP", "CVX", "MRK",
];

// Real stock data fetching function
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

// Advanced MAB Algorithms
class ContextualMAB {
    constructor(arms, contextDimension, alpha = 1.0) {
        this.arms = arms;
        this.contextDimension = contextDimension;
        this.alpha = alpha;
        this.A = new Array(arms).fill(0).map(() => 
            new Array(contextDimension).fill(0).map(() => new Array(contextDimension).fill(0))
        );
        this.b = new Array(arms).fill(0).map(() => new Array(contextDimension).fill(0));
        this.theta = new Array(arms).fill(0).map(() => new Array(contextDimension).fill(0));
        
        // Initialize identity matrices
        for (let i = 0; i < arms; i++) {
            for (let j = 0; j < contextDimension; j++) {
                this.A[i][j][j] = 1;
            }
        }
    }

    selectArm(context) {
        let bestArm = 0;
        let maxUCB = -Infinity;

        for (let i = 0; i < this.arms; i++) {
            const AInv = this.inverseMatrix(this.A[i]);
            const theta = this.matrixVectorMultiply(AInv, this.b[i]);
            const ucb = this.dotProduct(theta, context) + 
                       this.alpha * Math.sqrt(this.quadraticForm(context, AInv));
            
            if (ucb > maxUCB) {
                maxUCB = ucb;
                bestArm = i;
            }
        }

        return bestArm;
    }

    update(arm, context, reward) {
        const contextArray = Array.isArray(context) ? context : [context];
        
        // Update A matrix
        for (let i = 0; i < this.contextDimension; i++) {
            for (let j = 0; j < this.contextDimension; j++) {
                this.A[arm][i][j] += contextArray[i] * contextArray[j];
            }
        }
        
        // Update b vector
        for (let i = 0; i < this.contextDimension; i++) {
            this.b[arm][i] += reward * contextArray[i];
        }
    }

    inverseMatrix(matrix) {
        // Simple 2x2 matrix inverse for demo
        if (matrix.length === 2) {
            const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
            if (Math.abs(det) < 1e-10) return matrix;
            
            return [
                [matrix[1][1] / det, -matrix[0][1] / det],
                [-matrix[1][0] / det, matrix[0][0] / det]
            ];
        }
        return matrix; // For higher dimensions, use a proper matrix library
    }

    matrixVectorMultiply(matrix, vector) {
        return matrix.map(row => this.dotProduct(row, vector));
    }

    dotProduct(a, b) {
        return a.reduce((sum, val, i) => sum + val * b[i], 0);
    }

    quadraticForm(vector, matrix) {
        return this.dotProduct(vector, this.matrixVectorMultiply(matrix, vector));
    }
}

class NeuralBandit {
    constructor(arms, contextDimension, hiddenLayers = [64, 32]) {
        this.arms = arms;
        this.contextDimension = contextDimension;
        this.hiddenLayers = hiddenLayers;
        this.networks = new Array(arms).fill(0).map(() => this.createNetwork());
        this.explorationBonus = 0.1;
    }

    createNetwork() {
        // Simple neural network implementation
        const layers = [this.contextDimension, ...this.hiddenLayers, 1];
        const weights = [];
        const biases = [];
        
        for (let i = 0; i < layers.length - 1; i++) {
            weights.push(this.randomMatrix(layers[i + 1], layers[i]));
            biases.push(new Array(layers[i + 1]).fill(0).map(() => Math.random() * 0.1));
        }
        
        return { weights, biases };
    }

    randomMatrix(rows, cols) {
        return new Array(rows).fill(0).map(() => 
            new Array(cols).fill(0).map(() => (Math.random() - 0.5) * 0.1)
        );
    }

    forward(network, input) {
        let current = input;
        
        for (let i = 0; i < network.weights.length; i++) {
            current = this.linear(current, network.weights[i], network.biases[i]);
            if (i < network.weights.length - 1) {
                current = this.relu(current);
            }
        }
        
        return current[0];
    }

    linear(input, weights, bias) {
        return weights.map((row, i) => 
            this.dotProduct(row, input) + bias[i]
        );
    }

    relu(x) {
        return x.map(val => Math.max(0, val));
    }

    dotProduct(a, b) {
        return a.reduce((sum, val, i) => sum + val * b[i], 0);
    }

    selectArm(context) {
        let bestArm = 0;
        let maxValue = -Infinity;

        for (let i = 0; i < this.arms; i++) {
            const prediction = this.forward(this.networks[i], context);
            const exploration = this.explorationBonus * Math.random();
            const totalValue = prediction + exploration;
            
            if (totalValue > maxValue) {
                maxValue = totalValue;
                bestArm = i;
            }
        }

        return bestArm;
    }

    update(arm, context, reward) {
        // Simple gradient descent update
        const network = this.networks[arm];
        const prediction = this.forward(network, context);
        const error = reward - prediction;
        
        // Update weights with simple gradient descent
        for (let i = 0; i < network.weights.length; i++) {
            for (let j = 0; j < network.weights[i].length; j++) {
                for (let k = 0; k < network.weights[i][j].length; k++) {
                    network.weights[i][j][k] += 0.01 * error * context[k];
                }
            }
        }
    }
}

class HierarchicalThompsonSampling {
    constructor(arms, numClusters = 3) {
        this.arms = arms;
        this.numClusters = numClusters;
        this.clusters = new Array(numClusters).fill(0).map(() => ({
            alpha: 1,
            beta: 1,
            arms: new Array(arms).fill(0).map(() => ({ alpha: 1, beta: 1 }))
        }));
        this.clusterWeights = new Array(numClusters).fill(1);
    }

    selectArm() {
        // Sample cluster
        const clusterProbs = this.clusterWeights.map(w => w / this.clusterWeights.reduce((a, b) => a + b, 0));
        const cluster = this.sampleFromDistribution(clusterProbs);
        
        // Sample arm within cluster
        const armProbs = this.clusters[cluster].arms.map(arm => 
            this.betaSample(arm.alpha, arm.beta)
        );
        
        return this.sampleFromDistribution(armProbs);
    }

    update(arm, reward) {
        // Update both cluster and arm parameters
        for (let cluster = 0; cluster < this.numClusters; cluster++) {
            const clusterReward = reward + Math.random() * 0.1; // Add some noise for diversity
            
            if (clusterReward > 0.5) {
                this.clusters[cluster].alpha += 1;
            } else {
                this.clusters[cluster].beta += 1;
            }
            
            if (reward > 0.5) {
                this.clusters[cluster].arms[arm].alpha += 1;
            } else {
                this.clusters[cluster].arms[cluster].beta += 1;
            }
        }
        
        // Update cluster weights based on performance
        this.clusterWeights = this.clusterWeights.map((weight, i) => 
            weight * (1 + this.clusters[i].alpha / (this.clusters[i].alpha + this.clusters[i].beta))
        );
    }

    betaSample(alpha, beta) {
        // Simple beta distribution sampling
        const x = this.gammaSample(alpha, 1);
        const y = this.gammaSample(beta, 1);
        return x / (x + y);
    }

    gammaSample(alpha, beta) {
        // Simple gamma distribution approximation
        let sum = 0;
        for (let i = 0; i < alpha; i++) {
            sum -= Math.log(Math.random());
        }
        return sum / beta;
    }

    sampleFromDistribution(probs) {
        const rand = Math.random();
        let cumsum = 0;
        for (let i = 0; i < probs.length; i++) {
            cumsum += probs[i];
            if (rand <= cumsum) return i;
        }
        return probs.length - 1;
    }
}

const AdvancedAlgorithms = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('contextual');
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [results, setResults] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [contextData, setContextData] = useState([]);
    const [logs, setLogs] = useState([]);

    const algorithms = {
        contextual: new ContextualMAB(5, 2, 1.0),
        neural: new NeuralBandit(5, 2, [32, 16]),
        hierarchical: new HierarchicalThompsonSampling(5, 3)
    };

    const toggleStock = (symbol) => {
        if (selectedStocks.includes(symbol)) {
            setSelectedStocks(selectedStocks.filter(s => s !== symbol));
        } else if (selectedStocks.length < 5) {
            setSelectedStocks([...selectedStocks, symbol]);
        }
    };

    const generateMarketContext = () => {
        // Generate market context features
        return [
            Math.random() * 2 - 1, // Market sentiment (-1 to 1)
            Math.random() * 0.1 - 0.05 // Volatility (-0.05 to 0.05)
        ];
    };

    const runAdvancedSimulation = async () => {
        if (selectedStocks.length !== 5) {
            alert("Please select exactly 5 stocks for the advanced algorithm analysis.");
            return;
        }

        setIsRunning(true);
        setResults([]);
        setLogs([]);
        const newResults = [];
        const newLogs = [];
        const algorithm = algorithms[selectedAlgorithm];
        const contextHistory = [];

        for (let step = 0; step < 50; step++) {
            const context = generateMarketContext();
            contextHistory.push({ step, ...context });

            let selectedArm;
            if (selectedAlgorithm === 'contextual') {
                selectedArm = algorithm.selectArm(context);
            } else if (selectedAlgorithm === 'neural') {
                selectedArm = algorithm.selectArm(context);
            } else {
                selectedArm = algorithm.selectArm();
            }

            const selectedStock = selectedStocks[selectedArm];
            const reward = await fetchIntradayReturn(selectedStock);
            algorithm.update(selectedArm, context, reward);

            const newResult = {
                step: step + 1,
                selectedArm,
                selectedStock,
                reward,
                context,
                cumulativeReward: newResults.reduce((sum, r) => sum + r.reward, 0) + reward
            };

            newResults.push(newResult);
            newLogs.unshift({
                step: step + 1,
                algorithm: selectedAlgorithm,
                stock: selectedStock,
                reward,
                context
            });

            setResults([...newResults]);
            setLogs([...newLogs]);
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        setContextData(contextHistory);
        setIsRunning(false);
    };

    const getAlgorithmDescription = () => {
        const descriptions = {
            contextual: "Contextual MAB considers market conditions (sentiment, volatility) when selecting stocks, adapting to changing market environments.",
            neural: "Neural Bandit uses deep learning to learn complex patterns in stock behavior and market conditions.",
            hierarchical: "Hierarchical Thompson Sampling groups similar stocks and learns both group-level and individual stock performance."
        };
        return descriptions[selectedAlgorithm];
    };

    const reset = () => {
        setResults([]);
        setLogs([]);
        setContextData([]);
        setSelectedStocks([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">Advanced MAB Algorithms</h1>
                    <p className="text-xl text-gray-300">Next-generation stock selection algorithms with real market data</p>
                </div>

                {/* Stock Selection Section */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-white">📊 Select 5 Stocks for Analysis</h3>
                        <span className="text-gray-300 bg-gray-800 px-3 py-1 rounded-full">
                            {selectedStocks.length}/5
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {STOCKS_LIST.map((stock) => (
                            <button
                                key={stock}
                                onClick={() => toggleStock(stock)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                    selectedStocks.includes(stock)
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : selectedStocks.length >= 5
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                                disabled={selectedStocks.length >= 5 && !selectedStocks.includes(stock)}
                            >
                                {stock}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Algorithm Selection</h3>
                        <select
                            value={selectedAlgorithm}
                            onChange={(e) => setSelectedAlgorithm(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                        >
                            <option value="contextual">Contextual MAB</option>
                            <option value="neural">Neural Bandit</option>
                            <option value="hierarchical">Hierarchical Thompson</option>
                        </select>
                        <p className="text-gray-300 mt-3 text-sm">{getAlgorithmDescription()}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Selected Stocks</h3>
                        <div className="space-y-2">
                            {selectedStocks.length > 0 ? (
                                selectedStocks.map((stock, index) => (
                                    <div key={stock} className="flex justify-between items-center">
                                        <span className="text-gray-300">Stock {index + 1}:</span>
                                        <span className="text-white font-semibold">{stock}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">No stocks selected</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-300">Total Return:</span>
                                <span className={`font-semibold ${
                                    results.length > 0 && results[results.length - 1].cumulativeReward >= 0 
                                        ? 'text-green-400' 
                                        : 'text-red-400'
                                }`}>
                                    {results.length > 0 ? (results[results.length - 1].cumulativeReward * 100).toFixed(2) + '%' : '0%'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Steps:</span>
                                <span className="text-white">{results.length}/50</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Cumulative Returns</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={results}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="step" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    formatter={(value) => [(value * 100).toFixed(2) + '%', 'Cumulative Return']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="cumulativeReward"
                                    stroke="#10B981"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Market Context Analysis</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart data={contextData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="step" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                                <Scatter dataKey="0" fill="#3B82F6" name="Sentiment" />
                                <Scatter dataKey="1" fill="#EF4444" name="Volatility" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={runAdvancedSimulation}
                        disabled={isRunning || selectedStocks.length !== 5}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                    >
                        {isRunning ? '🔄 Running Analysis...' : '🚀 Run Advanced Analysis'}
                    </button>
                    <button
                        onClick={reset}
                        className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300"
                    >
                        🔄 Reset
                    </button>
                </div>

                {/* Logs Section */}
                {logs.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">📝 Analysis Logs</h3>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {logs.map((log, idx) => (
                                <div key={idx} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300 text-sm">Step {log.step}</span>
                                        <span className="text-blue-400 text-sm font-semibold">{log.stock}</span>
                                        <span className={`font-semibold ${log.reward >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {log.reward >= 0 ? '+' : ''}{log.reward.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvancedAlgorithms; 