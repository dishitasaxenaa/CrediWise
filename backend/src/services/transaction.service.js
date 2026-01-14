const fs = require('fs');
const path = require('path');

const getTransactions = (accountNumber) => {
  try {
    const dataPath = path.join(__dirname, '../data/transactions.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    // Remove potential comments (like // ...) before parsing
    const jsonStartIndex = rawData.indexOf('[');
    const jsonContent = jsonStartIndex !== -1 ? rawData.substring(jsonStartIndex) : rawData;
    const transactions = JSON.parse(jsonContent);

    // Map content to expected structure and add simulated dates
    const today = new Date();
    
    return transactions.map((t, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - Math.floor(index / 5)); // Spread dates out

        return {
            id: `txn_${index}`,
            date: date.toISOString().split("T")[0],
            amount: t.amount,
            description: t.desc || t.description,
            type: "DEBIT", // Defaulting to DEBIT as per JSON content context
            category: "Uncategorized", // AI Service will categorize this
            carbonTag: null // AI Service will assign this
        };
    });
  } catch (error) {
    console.error("Error reading transactions.json:", error);
    return [];
  }
};

module.exports = { getTransactions };
