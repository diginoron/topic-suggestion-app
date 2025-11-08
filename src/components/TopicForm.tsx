import { useState } from "react";
import { generateTopicSuggestions } from "../services/geminiService";

export default function TopicForm() {
  const [keywords, setKeywords] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) return;

    setLoading(true);
    setError("");
    setSuggestions([]);

    try {
      const results = await generateTopicSuggestions(keywords);
      setSuggestions(results);
    } catch (err) {
      setError("خطا در ارتباط با هوش مصنوعی. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Vazir', Tahoma, Arial, sans-serif",
      direction: "rtl",
      boxSizing: "border-box",
      margin: 0,
      width: "100vw",
      overflowX: "hidden"
    }}>
      <link
        href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.0.0/dist/font-face.css"
        rel="stylesheet"
        type="text/css"
      />

      {/* باکس اصلی — ۱۰۰٪ وسط صفحه */}
      <div style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",  // این خط کلیدیه!
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        borderRadius: "32px",
        padding: "clamp(30px, 8vw, 60px) clamp(20px, 6vw, 50px)",
        boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        textAlign: "center",
        boxSizing: "border-box"
      }}>
        {/* هدر */}
        <div style={{ marginBottom: "50px" }}>
          <h1 style={{
            fontSize: "clamp(32px, 9vw, 56px)",
            fontWeight: "900",
            margin: "0",
            background: "linear-gradient(to left, #60a5fa, #c084fc, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            هوش مصنوعی موضوع پایان‌نامه
          </h1>
          <p style={{
            fontSize: "clamp(16px, 5vw, 24px)",
            color: "#e0e7ff",
            margin: "20px 0 0"
          }}>
            کلیدواژه‌هاتو بنویس و موضوعات پیشنهادی رو بگیر
          </p>
        </div>

        {/* فرم */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "60px" }}>
          <div style={{ marginBottom: "40px" }}>
            <label style={{
              display: "block",
              fontSize: "clamp(20px, 6vw, 30px)",
              fontWeight: "bold",
              color: "#e0e7ff",
              marginBottom: "20px"
            }}>
              کلیدواژه‌های شما:
            </label>
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="مثلاً: هوش مصنوعی، یادگیری عمیق، پزشکی..."
              rows={6}
              required
              style={{
                width: "100%",
                padding: "clamp(20px, 5vw, 30px)",
                fontSize: "clamp(16px, 4.5vw, 22px)",
                borderRadius: "24px",
                border: "3px solid #6366f1",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                outline: "none",
                transition: "all 0.4s",
                boxShadow: "inset 0 8px 25px rgba(0,0,0,0.3)",
                textAlign: "right",
                boxSizing: "border-box",
                resize: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#a78bfa"}
              onBlur={(e) => e.target.style.borderColor = "#6366f1"}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "clamp(18px, 5vw, 28px)",
              fontSize: "clamp(20px, 6vw, 32px)",
              fontWeight: "bold",
              color: "white",
              background: loading ? "#6366f1" : "linear-gradient(to left, #8b5cf6, #ec4899)",
              border: "none",
              borderRadius: "24px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.5s",
              boxShadow: "0 18px 45px rgba(139, 92, 246, 0.4)"
            }}
          >
            {loading ? "در حال تولید..." : "دریافت موضوعات پیشنهادی 🚀"}
          </button>
        </form>

        {/* خطا */}
        {error && (
          <div style={{
            margin: "40px 0",
            padding: "25px",
            background: "#7f1d1d",
            border: "3px solid #ef4444",
            borderRadius: "24px",
            color: "#fca5a5",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "clamp(18px, 5vw, 24px)"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* نتایج — ریسپانسیو با flex-wrap */}
        {suggestions.length > 0 && (
          <div style={{ marginTop: "60px" }}>
            <h2 style={{
              fontSize: "clamp(28px, 7vw, 44px)",
              fontWeight: "900",
              background: "linear-gradient(to left, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "50px"
            }}>
              موضوعات پیشنهادی شما! 🌟
            </h2>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              justifyContent: "center"
            }}>
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  style={{
                    flex: "1 1 300px",
                    minWidth: "260px",
                    maxWidth: "380px",
                    padding: "15px",
                    background: "#f8f9fa",
                    borderRadius: "10px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s",
                    textAlign: "right"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    width: "50px",
                    height: "50px",
                    background: i % 3 === 0 ? "#e63946" : i % 3 === 1 ? "#457b9d" : "#2a9d8f",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
                  }}>
                    {i + 1}
                  </div>

                  <p style={{
                    fontSize: "clamp(16px, 4vw, 22px)",
                    lineHeight: "1.8",
                    color: "#2d3748",
                    margin: 0,
                    padding: "20px 15px 15px 15px",
                    overflowWrap: "break-word",
                    wordWrap: "break-word"
                  }}>
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* فوتر */}
        <div style={{
          marginTop: "80px",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "clamp(16px, 4vw, 20px)",
          fontWeight: "bold"
        }}>
          ساخته شده توسط گروه دیجی نورون
        </div>
      </div>
    </div>
  );
}