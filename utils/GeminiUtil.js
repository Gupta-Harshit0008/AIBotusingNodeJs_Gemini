const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'})
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

exports.run= async(prompt)=> {
    const result = await model.generateContent([prompt]);
    return result.response.text()
    }