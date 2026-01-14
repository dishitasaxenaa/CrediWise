const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const modelsToTest = [
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-1.0-pro"
];

async function testAllModels() {
    console.log("Testing available models with provided API Key...");
    
    for (const modelName of modelsToTest) {
        console.log(`\nTesting model: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello");
            const response = await result.response;
            console.log(`SUCCESS: ${modelName} returned: ${response.text()}`);
            return; // Exit after first success if you want, or just log all
        } catch (error) {
            console.log(`FAILED: ${modelName}`);
            console.log(`Error: ${error.message}`);
        }
    }
}

testAllModels();
