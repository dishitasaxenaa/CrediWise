// src/services/reward.service.js

function calculateInterestAdjustment(greenScore) {
  let adjustment = 0;
  let message = "";

  if (greenScore >= 750) {
    adjustment = -0.75;
    message = "Excellent sustainability behavior 🌱";
  } 
  else if (greenScore >= 650) {
    adjustment = -0.25;
    message = "Good sustainability habits 👍";
  } 
  else if (greenScore >= 500) {
    adjustment = 0;
    message = "Average sustainability behavior";
  } 
  else {
    adjustment = +0.5;
    message = "High carbon spending detected ⚠️";
  }

  return {
    interestRateChange: adjustment,
    message
  };
}

module.exports = {
  calculateInterestAdjustment
};
