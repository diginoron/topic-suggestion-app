import { useState } from "react";
import { generateTopicSuggestions } from "../services/geminiService";

export default function TopicForm() {
  console.log("✅ TopicForm لود شد! آماده برای استفاده.");  // لاگ ۱

  const [keywords, setKeywords] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) return;

    console.log("🔍 درخواست ارسال شد با کلمات کلیدی:", keywords);  // لاگ ۲

    setLoading(true);
    setError("");
    setSuggestions([]);

    try {
      const results = await generateTopicSuggestions(keywords);
      console.log("🎉 پاسخ دریافت شد:", results);  // لاگ ۳
      setSuggestions(results);
    } catch (err) {
      console.error("❌ خطا در API:", err);  // لاگ ۴
      setError("خطا در ارتباط با هوش مصنوعی. لطفاً کلید API را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>پیشنهاد موضوع با هوش مصنوعی</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="کلمات کلیدی خود را وارد کنید (مثلاً: آموزش، برنامه‌نویسی، کودکان)"
          rows={4}
          style={{ width: "100%", padding: "1rem", marginBottom: "1rem", fontSize: "1rem" }}
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: loading ? "#ccc" : "#4285f4",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "در حال تولید..." : "دریافت پیشنهادات"}
        </button>
      </form>

      {error && <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>{error}</p>}

      {suggestions.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ textAlign: "center" }}>پیشنهادات موضوعی:</h2>
          <ol style={{ lineHeight: "1.8", paddingLeft: "2rem" }}>
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}