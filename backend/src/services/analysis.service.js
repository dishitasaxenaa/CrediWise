const { calculateStreaks, assignBadges } = require("./gamification.service");
const { analyzeTransactionsWithGemini } = require("./ai.service");
const { calculateScore } = require("./score.service");

const calculateAnalysis = async (transactions) => {
  // 1. AI Analysis & Categorization
  // This now returns { green_percentage, carbon_percentage, withdrawal_percentage, analyzed_transactions, top_green, top_carbon }
  const aiResult = await analyzeTransactionsWithGemini(transactions);
  
  // 2. Gamification Data
  // calculateStreaks and assignBadges now expect the structure from analyzed_transactions
  const streak = calculateStreaks(aiResult.analyzed_transactions || []);
  const badges = assignBadges(aiResult.analyzed_transactions || []);
  const consistencyBonus = streak * 10;

  // 3. Score Calculation
  const scoreResult = calculateScore({
    green_percentage: aiResult.green_percentage,
    carbon_percentage: aiResult.carbon_percentage,
    withdrawal_percentage: aiResult.withdrawal_percentage,
    consistency_bonus: consistencyBonus
  });

  // 4. Rewards/Interest Impact
  let interestImpact = "+0.5%"; // Default for < 500
  const finalScore = scoreResult.score;
  
  if (finalScore >= 800) interestImpact = "-1.00% (Platinum)";
  else if (finalScore >= 700) interestImpact = "-0.50% (Gold)";
  else if (finalScore >= 600) interestImpact = "-0.25% (Silver)";
  else if (finalScore >= 500) interestImpact = "Neutral (Standard)";
  else interestImpact = "+0.50% (Risk Premium)";

  // 5. Tips Generation
  const tips = [];
  if (aiResult.carbon_percentage > 30) tips.push(`Reduce High Carbon spend (currently ${aiResult.carbon_percentage}%) to improve score.`);
  if (aiResult.withdrawal_percentage > 20) tips.push("Avoid cash withdrawals to track improvements better.");
  if (aiResult.green_percentage < 10) tips.push("Switch to sustainable brands to boost your Green Score.");
  if (streak > 0) tips.push(`Great job! You are on a ${streak}-month Green Streak!`);

  return {
    score: scoreResult.score,
    breakdown: scoreResult.breakdown,
    metrics: {
      greenPercent: aiResult.green_percentage,
      carbonPercent: aiResult.carbon_percentage,
      withdrawalPercent: aiResult.withdrawal_percentage
    },
    gamification: {
      streak,
      badges
    },
    explainability: {
      topGreen: aiResult.top_green,
      topCarbon: aiResult.top_carbon,
      analyzedTransactions: aiResult.analyzed_transactions
    },
    rewards: {
      interestRateImpact: interestImpact
    },
    tips
  };
};

module.exports = { calculateAnalysis };
