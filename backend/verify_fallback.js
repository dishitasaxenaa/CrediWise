require("dotenv").config();
const { analyzeTransactionsWithGemini } = require("./src/services/ai.service");

// Mock transactions mimicking transaction.service.js output
const mockTransactions = [
    { 
        description: "Shell Petrol Pump", 
        amount: 3000, 
        type: "DEBIT", 
        category: "Fuel", 
        carbonTag: "HIGH" 
    },
    { 
        description: "Delhi Metro Recharge", 
        amount: 600, 
        type: "DEBIT", 
        category: "Travel", 
        carbonTag: "GREEN" 
    },
    { 
        description: "Withdrawal ATM", 
        amount: 500, 
        type: "DEBIT", 
        category: "Withdrawal", 
        carbonTag: "NEUTRAL" 
    },
    { 
        description: "Salary", 
        amount: 50000, 
        type: "CREDIT", 
        category: "Salary", 
        carbonTag: "NEUTRAL" 
    }
];

async function verifyFallback() {
    console.log("Verifying Fallback Logic...");
    try {
        const result = await analyzeTransactionsWithGemini(mockTransactions);
        console.log("Analysis Result:", JSON.stringify(result, null, 2));
        
        // Assertions
        if (result.green_percentage > 0 && result.carbon_percentage > 0) {
            console.log("SUCCESS: Fallback logic calculated percentages.");
        } else {
            console.log("FAILURE: Percentages are zero.");
        }
        
        if (result.top_green.length > 0) {
             console.log("SUCCESS: Top Green identified.");
        }
        
        if (result.top_carbon.length > 0) {
             console.log("SUCCESS: Top Carbon identified.");
        }

    } catch (error) {
        console.error("Verification Failed:", error);
    }
}

verifyFallback();
