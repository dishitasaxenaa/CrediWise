require("dotenv").config();
const { analyzeTransactionsWithGemini } = require("./src/services/ai.service");

const mockTransactions = [
    { description: "Shell Petrol Pump", amount: 3000 },
    { description: "Delhi Metro Recharge", amount: 600 },
    { description: "ZARA Store", amount: 4500 }
];

async function testAI() {
    console.log("Testing AI Service...");
    try {
        const result = await analyzeTransactionsWithGemini(mockTransactions);
        console.log("AI Result:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("AI Service Validation Failed:");
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
        if (error.response) {
             console.error("Response:", JSON.stringify(error.response, null, 2));
        }
    }
}

testAI();
