const fs = require("fs");
const path = require("path");

// Transaction templates
const TRANSACTION_TYPES = [
  { desc: "Shell Petrol Pump", min: 500, max: 4000 },
  { desc: "Indian Oil Petrol Pump", min: 500, max: 4000 },
  { desc: "Delhi Metro Recharge", min: 100, max: 800 },
  { desc: "BMTC Bus Pass", min: 100, max: 500 },
  { desc: "ZARA Store", min: 2000, max: 8000 },
  { desc: "H&M Store", min: 1500, max: 7000 },
  { desc: "EV Charging Station", min: 300, max: 1500 },
  { desc: "Amazon Supermarket", min: 500, max: 6000 },
  { desc: "Electricity Bill", min: 800, max: 3000 },
  { desc: "Water Bill", min: 300, max: 1200 },
  { desc: "ATM Cash Withdrawal", min: 1000, max: 10000 },
  { desc: "IndiGo Airlines", min: 4000, max: 15000 },
  { desc: "Uber Ride", min: 150, max: 1200 },
  { desc: "Ola Electric Ride", min: 150, max: 1000 },
  { desc: "Second Hand Furniture OLX", min: 500, max: 5000 }
];

// Helper
function randomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate transactions
function generateTransactions(count = 1000) {
  const transactions = [];

  for (let i = 0; i < count; i++) {
    const t =
      TRANSACTION_TYPES[
        Math.floor(Math.random() * TRANSACTION_TYPES.length)
      ];

    transactions.push({
      desc: t.desc,
      amount: randomAmount(t.min, t.max)
    });
  }

  return transactions;
}

// Write to file
const data = generateTransactions(1000);

const filePath = path.join(
  __dirname,
  "../data/transactions.json"
);

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log("✅ 1000 transactions generated successfully");
