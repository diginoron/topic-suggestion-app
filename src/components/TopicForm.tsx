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
      boxSizing: "border-box"
    }}>
      <link
        href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.0.0/dist/font-face.css"
        rel="stylesheet"
        type="text/css"
      />

      {/* باکس اصلی — جمع و جور + تمام صفحه + ریسپانسیو */}
      <div style={{
        width: "95vw",
        maxWidth: "1100px",
        minHeight: "90vh",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        borderRadius: "36px",
        padding: "50px 50px",
        boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.2)",
        textAlign: "center",
        boxSizing: "border-box",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* هدر — جمع‌تر */}
        <div style={{ marginBottom: "40px", flexShrink: 0 }}>
          <h1 style={{
            fontSize: "56px",
            fontWeight: "900",
            margin: "0",
            background: "linear-gradient(to left, #60a5fa, #c084fc, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            هوش مصنوعی موضوع پایان‌نامه
          </h1>
          <p style={{ fontSize: "24px", color: "#e0e7ff", margin: "18px 0 0" }}>
            کلیدواژه‌هاتو بنویس و موضوعات پیشنهادی رو بگیر
          </p>
        </div>

        {/* فرم — جمع‌تر */}
        <form onSubmit={handleSubmit} style={{ flexShrink: 0, marginBottom: "50px" }}>
          <div style={{ marginBottom: "50px" }}>
            <label style={{
              display: "block",
              fontSize: "30px",
              fontWeight: "bold",
              color: "#e0e7ff",
              marginBottom: "25px"
            }}>
              کلیدواژه‌های شما:
            </label>
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="مثلاً: هوش مصنوعی، یادگیری عمیق، پزشکی..."
              rows={7}
              required
              style={{
                width: "100%",
                padding: "30px",
                fontSize: "22px",
                borderRadius: "28px",
                border: "4px solid #6366f1",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                outline: "none",
                transition: "all 0.4s",
                boxShadow: "inset 0 10px 30px rgba(0,0,0,0.3)",
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
              padding: "28px",
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
              background: loading ? "#6366f1" : "linear-gradient(to left, #8b5cf6, #ec4899)",
              border: "none",
              borderRadius: "28px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.5s",
              boxShadow: "0 20px 50px rgba(139, 92, 246, 0.4)"
            }}
          >
            {loading ? "در حال تولید..." : "دریافت موضوعات پیشنهادی 🚀"}
          </button>
        </form>

        {/* خطا */}
        {error && (
          <div style={{
            margin: "50px 0",
            padding: "35px",
            background: "#7f1d1d",
            border: "4px solid #ef4444",
            borderRadius: "28px",
            color: "#fca5a5",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
            flexShrink: 0
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* نتایج — جمع‌تر + اسکرول */}
        {suggestions.length > 0 && (
          <div style={{ marginTop: "30px", flex: 1, overflowY: "auto", padding: "10px 0" }}>
            <h2 style={{
              fontSize: "44px",
              fontWeight: "900",
              background: "linear-gradient(to left, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "50px"
            }}>
              موضوعات پیشنهادی شما! 🌟
            </h2>

            <div style={{ display: "grid", gap: "40px" }}>
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "40px",
                    background: "linear-gradient(to left, #1e293b, #334155)",
                    borderRadius: "40px",
                    border: "4px solid transparent",
                    boxShadow: "0 20px 50px rgba(139, 92, 246, 0.25)",
                    transition: "all 0.5s",
                    position: "relative"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = "#ec4899"}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = "transparent"}
                >
                  <div style={{
                    position: "absolute",
                    top: "25px",
                    left: "30px",
                    fontSize: "70px",
                    fontWeight: "900",
                    color: "#ec4899",
                    opacity: 0.15
                  }}>
                    #{i + 1}
                  </div>
                  <p style={{
                    fontSize: "28px",
                    lineHeight: "2.2",
                    color: "#e0e7ff",
                    margin: 0,
                    paddingLeft: "100px"
                  }}>
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* فوتر — جمع‌تر */}
        <div style={{
          marginTop: "60px",
          paddingTop: "40px",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "20px",
          fontWeight: "bold",
          flexShrink: 0
        }}>
          ساخته شده توسط گروه دیجی نورون
        </div>
      </div>
    </div>
  );
}