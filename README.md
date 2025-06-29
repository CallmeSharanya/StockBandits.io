#  Multi-Arm Bandit Stock Selection Platform

Optimize your investments with our state-of-the-art web application. It employs advanced Multi-Arm Bandit (MAB) algorithms for dynamic stock selection and strategic portfolio optimization. Built on React and integrating live market data from the Alpha Vantage API, it's designed for the modern investor.

##  Features

###  Core MAB Algorithms
- **UCB (Upper Confidence Bound)** - Optimized for long-term investment strategies
- **Thompson Sampling** - Designed for daily trading and short-term gains
- **Epsilon-Greedy** - Balanced approach with exploration-exploitation trade-off

###  Advanced Algorithms
- **Contextual MAB** - Considers market sentiment and volatility for adaptive stock selection
- **Neural Bandit** - Deep learning-powered pattern recognition in stock behavior
- **Hierarchical Thompson Sampling** - Multi-level analysis grouping similar stocks

###  Real-Time Market Analysis
- **Live Stock Data** - Real-time intraday data from Alpha Vantage API
- **Market Sentiment Analysis** - News and social media sentiment integration
- **Portfolio Optimization** - Modern Portfolio Theory with risk management
- **Advanced Analytics** - Sharpe ratio, drawdown analysis, correlation matrices

###  Professional UI/UX
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Theme** - Modern, professional interface with gradient backgrounds
- **Interactive Charts** - Real-time visualization using Recharts
- **Dashboard Navigation** - Intuitive sidebar navigation with quick actions

##  Architecture

```
MultiArmBandit/
├── frontend/
│   └── MultiArmBandit/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Dashboard.jsx          # Main dashboard hub
│       │   │   ├── MABpage.jsx            # Core MAB algorithms
│       │   │   ├── AdvancedAlgorithms.jsx # Advanced MAB implementations
│       │   │   ├── MarketSentiment.jsx    # Sentiment analysis
│       │   │   ├── PortfolioOptimizer.jsx # Portfolio optimization
│       │   │   ├── AdvancedAnalytics.jsx  # Performance analytics
│       │   │   ├── Settings.jsx           # User preferences
│       │   │   └── LandingLoginPage.jsx   # Authentication
│       │   ├── App.jsx                    # Main application router
│       │   └── App.css                    # Styling and animations
│       ├── package.json                   # Dependencies
│       └── vite.config.js                 # Build configuration
└── README.md
```

##  Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Alpha Vantage API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MultiArmBandit.git
   cd MultiArmBandit
   ```

2. **Install dependencies**
   ```bash
   cd frontend/MultiArmBandit
   npm install
   ```

3. **Configure API Key**
   - Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
   - Update the API key in the components (currently set to demo key)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

##  Usage Guide

### 1. Dashboard Navigation
- **MAB Stocks** - Core Multi-Arm Bandit algorithms
- **Sentiment Analysis** - Market sentiment and news analysis
- **Advanced Algorithms** - Next-generation MAB implementations
- **Portfolio Optimizer** - Risk-managed portfolio construction
- **Analytics** - Performance metrics and analysis
- **Settings** - User preferences and configuration

### 2. Basic MAB Analysis
1. Select exactly 10 stocks from the available options
2. Choose your trading strategy:
   - **Long-Term Investment** (UCB)
   - **Daily Trading** (Thompson Sampling)
   - **Conservative Investing** (Epsilon-Greedy)
3. Click "Run Step" to execute the algorithm
4. View real-time results and performance metrics
5. Analyze historical data for selected stocks

### 3. Advanced Algorithm Analysis
1. Select exactly 5 stocks for advanced analysis
2. Choose an advanced algorithm:
   - **Contextual MAB** - Market-aware selection
   - **Neural Bandit** - Deep learning approach
   - **Hierarchical Thompson** - Multi-level analysis
3. Run the analysis to see real-time learning
4. Monitor cumulative returns and market context

### 4. Portfolio Optimization
- Configure risk tolerance and investment goals
- Set portfolio constraints and preferences
- Generate optimized portfolio allocations
- View risk-return analysis and diversification metrics

##  Technical Details

### Frontend Technologies
- **React 19.1.0** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library for React
- **React Router** - Client-side routing

### Key Dependencies
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.2",
  "recharts": "^2.15.3",
  "tailwindcss": "^4.1.10",
  "@heroicons/react": "^2.2.0"
}
```

### API Integration
- **Alpha Vantage API** - Real-time stock market data
- **Intraday Data** - 5-minute interval price data
- **Historical Data** - Daily, weekly, and monthly time series
- **Error Handling** - Graceful fallbacks for API limitations

### Algorithm Implementations

#### Core MAB Algorithms
```javascript
// UCB1 Algorithm
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
```

#### Advanced Algorithms
- **Contextual MAB**: Linear bandits with context features
- **Neural Bandit**: Deep neural networks for reward prediction
- **Hierarchical Thompson**: Multi-level Bayesian inference

##  Performance Features

### Real-Time Analysis
- **Live Data Fetching** - Real-time stock price updates
- **Dynamic Context** - Market sentiment and volatility analysis
- **Adaptive Learning** - Algorithms learn from market changes
- **Performance Tracking** - Cumulative returns and risk metrics

### Visualization
- **Interactive Charts** - Line charts, scatter plots, bar charts
- **Real-Time Updates** - Live data visualization
- **Responsive Design** - Optimized for all screen sizes
- **Professional Styling** - Modern UI with smooth animations

### Risk Management
- **Portfolio Diversification** - Modern Portfolio Theory implementation
- **Risk Metrics** - Sharpe ratio, maximum drawdown, VaR
- **Correlation Analysis** - Stock correlation matrices
- **Sector Rotation** - Industry-level analysis


*This project is for educational and research purposes. Please consult with financial advisors before making investment decisions.* 
