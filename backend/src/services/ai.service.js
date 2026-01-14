const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeTransactionsWithGemini(transactions) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze the following bank transactions for an environmental impact "Green Score".

    Data to Analyze:
    ${JSON.stringify(transactions.map(t => ({ description: t.desc || t.description, amount: t.amount })))}

    Tasks:
    1. Categorize each transaction into one of: 'High Carbon', 'Green', 'Neutral'.
       - 'High Carbon': fuel, air travel, fast fashion, tobacco, non-renewable utilities.
       - 'Green': public transport (metro, bus), EVs, organic/thrift stores, recycling.
       - 'Neutral': everything else (groceries, rent, medical, etc.).
    2. Assign a 'confidence' score (0.0 to 1.0) for the categorization.
    3. Identify "Cash Withdrawals" specifically.
    4. Calculate percentages based on total spend:
       - green_percentage: (Total Green Spend / Total Spend) * 100
       - carbon_percentage: (Total High Carbon Spend / Total Spend) * 100
       - withdrawal_percentage: (Total Cash Withdrawals / Total Spend) * 100
    5. Identify Top 3 "Green" and Top 3 "High Carbon" transactions. Aggregate/Group transactions by description before ranking (sum amounts for identical descriptions).

    Return ONLY a raw JSON object with this exact structure (no markdown):
    {
      "green_percentage": number,
      "carbon_percentage": number,
      "withdrawal_percentage": number,
      "analyzed_transactions": [
        { "description": string, "amount": number, "category": string, "confidence": number }
      ],
      "top_green": [ { "description": string, "amount": number } ],
      "top_carbon": [ { "description": string, "amount": number } ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text); // Assume Gemini returns valid JSON
    
  } catch (error) {
    console.error("Gemini Analysis Failed (Switching to Fallback Mode):");
    console.error("Message:", error.message);

    // Unsafe simple fallback categorization
    const classifyTransaction = (desc) => {
        const d = desc.toLowerCase();
        
        // High Carbon Keywords
        if (d.includes("petrol") || d.includes("shell") || d.includes("oil") || d.includes("fuel") || 
            d.includes("airlines") || d.includes("indigo") || d.includes("air") ||
            d.includes("h&m") || d.includes("zara") || d.includes("fashion")) {
            return "High Carbon";
        }

        // Green Keywords
        if (d.includes("ev charging") || d.includes("electric") || 
            d.includes("metro") || d.includes("bus") || d.includes("bmtc") || 
            d.includes("sustainable") || d.includes("thrift") || d.includes("organic")) {
            return "Green";
        }

        return "Neutral";
    };

    let totalSpend = 0;
    let greenSpend = 0;
    let carbonSpend = 0;
    let withdrawalSpend = 0;
    
    // Process transactions locally using keyword matching
    const analyzed = transactions.map(t => {
      const amount = parseFloat(t.amount) || 0;
      const desc = t.description || t.desc || "";
      const category = classifyTransaction(desc);
      
      // Calculate totals
      if (t.type !== "CREDIT") { // Only count spending
          totalSpend += amount;
          
          if (category === "Green") greenSpend += amount;
          if (category === "High Carbon") carbonSpend += amount;
          if (desc.toLowerCase().includes("withdrawal") || desc.toLowerCase().includes("atm")) {
              withdrawalSpend += amount;
          }
      }

      return {
          description: desc,
          amount: amount,
          category: category,
          confidence: 0.8 // Fallback confidence
      };
    });

    const green_percentage = totalSpend > 0 ? (greenSpend / totalSpend) * 100 : 0;
    const carbon_percentage = totalSpend > 0 ? (carbonSpend / totalSpend) * 100 : 0;
    const withdrawal_percentage = totalSpend > 0 ? (withdrawalSpend / totalSpend) * 100 : 0;

    // Helper to group and sort
    const groupAndSort = (items) => {
        const grouped = items.reduce((acc, curr) => {
            if (!acc[curr.description]) {
                acc[curr.description] = { ...curr, amount: 0 };
            }
            acc[curr.description].amount += curr.amount;
            return acc;
        }, {});
        
        return Object.values(grouped).sort((a, b) => b.amount - a.amount);
    };
    
    const top_green = groupAndSort(analyzed.filter(t => t.category === "Green")).slice(0, 3);
    const top_carbon = groupAndSort(analyzed.filter(t => t.category === "High Carbon")).slice(0, 3);

    return {
      green_percentage: parseFloat(green_percentage.toFixed(2)),
      carbon_percentage: parseFloat(carbon_percentage.toFixed(2)),
      withdrawal_percentage: parseFloat(withdrawal_percentage.toFixed(2)),
      analyzed_transactions: analyzed.slice(0, 50), // Limit for UI
      top_green,
      top_carbon
    };
  }
}

module.exports = { analyzeTransactionsWithGemini };
