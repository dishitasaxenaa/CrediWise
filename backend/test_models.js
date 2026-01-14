const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function log(msg) {
    fs.appendFileSync("test_error.log", msg + "\n");
    console.log(msg);
}

async function tryModel(modelName) {
    log(`Testing ${modelName}...`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        log(`SUCCESS: ${modelName} worked! Response: ${result.response.text().substring(0, 50)}...`);
        return true;
    } catch (e) {
        log(`FAILURE: ${modelName} failed. Error: ${e.message}`);
        return false;
    }
}

async function listModels() {
    fs.writeFileSync("test_error.log", "Starting Model Test\n");
    
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-1.5-flash-latest", "gemini-pro", "gemini-1.0-pro"];
    
    for (const m of models) {
        if (await tryModel(m)) break; 
    }
}

listModels();
