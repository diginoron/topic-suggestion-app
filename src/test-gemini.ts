import { GoogleGenerativeAI } from "@google/generative-ai";

// کلید API شما (از .env یا مستقیم)
const API_KEY = "AIzaSyAnGrbUPJVQb6Z6JtDWf2vXancjlxow7-E";

if (!API_KEY) {
  console.error("کلید API تنظیم نشده است!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function testGemini() {
  try {
    const prompt = "فقط بگو: 'سلام! هوش مصنوعی کار می‌کند!'";
    console.log("در حال ارسال درخواست به Gemini...");

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ پاسخ Gemini:");
    console.log(text);
  } catch (error: any) {
    console.error("❌ خطا در ارتباط با Gemini:");
    console.error(error.message);
  }
}

testGemini();