import OpenAI from "openai";

const API_KEY = import.meta.env.VITE_API_KEY;
if (!API_KEY) {
  throw new Error("VITE_API_KEY is missing in .env file");
}

const client = new OpenAI({
  apiKey: API_KEY,
  baseURL: "https://api.avalai.ir/v1",
  dangerouslyAllowBrowser: true,  // ← این خط را اضافه کنید
});

export async function generateTopicSuggestions(keywords: string): Promise<string[]> {
  const prompt = `
    کاربر کلمات کلیدی زیر را وارد کرده است:
    "${keywords}"

    لطفاً ۵ موضوع جذاب، خلاقانه و کاربردی بر اساس این کلمات کلیدی پیشنهاد دهید.
    هر موضوع باید یک جمله کامل و واضح باشد.
    فقط موضوعات را به صورت لیست شماره‌دار برگردانید، بدون توضیح اضافی.
  `;

  try {
    const completion = await client.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: "You are an expert topic generator." },
        { role: "user", content: prompt },
      ],
    });

    const text = completion.choices[0]?.message?.content || "";
    return text
      .split("\n")
      .map(line => line.replace(/^\d+\.\s*/, "").trim())
      .filter(line => line.length > 0);
  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error("خطا در ارتباط با هوش مصنوعی. لطفاً دوباره تلاش کنید.");
  }
}