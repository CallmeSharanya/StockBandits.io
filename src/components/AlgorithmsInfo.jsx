// src/components/AlgorithmsInfo.jsx
import React from 'react';

/**
 * A single static page that documents the algorithms
 * used inside the MABStocks application.
 * No props, no state – just read‑only text.
 */
const AlgorithmsInfo = () => (
  <div className="p-8 prose lg:prose-xl mx-auto">
    <h1>MABStocks – Algorithms Overview</h1>
    <p>
      This page summarises the three core Multi‑Armed Bandit algorithms
      used in <strong>MABStocks</strong> and shows exactly where each one
      is implemented in the repository.
    </p>

    {/* Epsilon‑Greedy ---------------------------------------------------- */}
    <h2>1&nbsp;·&nbsp;Epsilon‑Greedy <small>(“Conservative”)</small></h2>
    <ul>
      <li><strong>Where:</strong> <code>src/logic/epsilonGreedy.js</code></li>
      <li><strong>Called from:</strong> <code>MABpage.jsx</code></li>
      <li>
        <strong>Idea:</strong> With probability&nbsp;ε choose a random stock
        (explore); otherwise pick the stock with the highest average reward
        (exploit).
      </li>
      <li><strong>Time / round:</strong> <code>O(K)</code></li>
      <li><strong>Space:</strong> <code>O(K)</code></li>
    </ul>

    {/* UCB1 ------------------------------------------------------------- */}
    <h2>2&nbsp;·&nbsp;UCB1 <small>(“Long‑Term”)</small></h2>
    <ul>
      <li><strong>Where:</strong> <code>src/logic/ucb.js</code></li>
      <li><strong>Called from:</strong> <code>MABpage.jsx</code></li>
      <li>
        <strong>Idea:</strong> Pick the stock with the largest upper‑confidence
        bound&nbsp;
        <code>avg&nbsp;+&nbsp;√(2 ln t&nbsp;/ n)</code>.
      </li>
      <li><strong>Time / round:</strong> <code>O(K)</code></li>
      <li><strong>Space:</strong> <code>O(K)</code></li>
    </ul>

    {/* Thompson Sampling ------------------------------------------------ */}
    <h2>3&nbsp;·&nbsp;Thompson Sampling <small>(“Daily”)</small></h2>
    <ul>
      <li><strong>Where:</strong> <code>src/logic/thompson.js</code></li>
      <li><strong>Called from:</strong> <code>MABpage.jsx</code></li>
      <li>
        <strong>Idea:</strong> Maintain a Beta(α, β) for every stock, sample
        <code> θ</code> from each distribution, choose the stock with the
        highest <code>θ</code>.
      </li>
      <li><strong>Time / round:</strong> <code>O(K)</code></li>
      <li><strong>Space:</strong> <code>O(K)</code></li>
    </ul>

    <h2>Reward Function</h2>
    <p>
      All three strategies use the intraday percentage return, implemented in
      <code>src/utils/reward.js</code>, as the reward signal.
    </p>
  </div>
);

export default AlgorithmsInfo;
