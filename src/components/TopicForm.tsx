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
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Vazir', Tahoma, Arial, sans-serif",
      direction: "rtl",
      boxSizing: "border-box",
      margin: 0,
      width: "100%",
      height: "100%"
    }}>
      <link
        href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.0.0/dist/font-face.css"
        rel="stylesheet"
        type="text/css"
      />

      {/* باکس اصلی — ۱۰۰٪ وسط صفحه + تمام صفحه + ریسپانسیو */}
      <div style={{
        width: "100%",
        maxWidth: "1400px",
        minHeight: "90vh",
        margin: "0 auto",
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        borderRadius: "clamp(20px, 5vw, 40px)",
        padding: "clamp(40px, 8vw, 80px)",
        boxShadow: "0 30px 100px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.15)",
        textAlign: "center",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(139, 92, 246, 0.5) transparent"
      }}>
        {/* هدر */}
        <div style={{ marginBottom: "clamp(40px, 8vw, 60px)", flexShrink: 0 }}>
          <h1 style={{
            fontSize: "clamp(40px, 10vw, 72px)",
            fontWeight: "900",
            margin: "0",
            background: "linear-gradient(to left, #60a5fa, #c084fc, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 10px 30px rgba(0,0,0,0.3)",
            transition: "all 0.4s"
          }}>
            هوش مصنوعی موضوع پایان‌نامه کاسپین تز
          </h1>
          <p style={{
            fontSize: "clamp(20px, 5vw, 32px)",
            color: "#e0e7ff",
            margin: "clamp(20px, 5vw, 30px) 0 0",
            fontWeight: "500"
          }}>
            کلیدواژه‌هاتو بنویس و موضوعات پیشنهادی رو بگیر
          </p>
        </div>

        {/* فرم */}
        <form onSubmit={handleSubmit} style={{ flexShrink: 0, marginBottom: "clamp(50px, 8vw, 80px)" }}>
          <div style={{ marginBottom: "clamp(40px, 6vw, 60px)" }}>
            <label style={{
              display: "block",
              fontSize: "clamp(24px, 6vw, 36px)",
              fontWeight: "bold",
              color: "#e0e7ff",
              marginBottom: "clamp(20px, 4vw, 30px)"
            }}>
              کلیدواژه‌های شما:
            </label>
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="مثلاً: هوش مصنوعی، یادگیری عمیق، پزشکی..."
              rows={8}
              required
              style={{
                width: "100%",
                padding: "clamp(25px, 5vw, 40px)",
                fontSize: "clamp(18px, 4.5vw, 26px)",
                borderRadius: "clamp(20px, 4vw, 32px)",
                border: "4px solid #6366f1",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                outline: "none",
                transition: "all 0.4s",
                boxShadow: "inset 0 12px 35px rgba(0,0,0,0.3)",
                textAlign: "right",
                boxSizing: "border-box",
                resize: "none",
                overflowWrap: "break-word"
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
              padding: "clamp(25px, 6vw, 40px)",
              fontSize: "clamp(24px, 6vw, 40px)",
              fontWeight: "bold",
              color: "white",
              background: loading ? "#6366f1" : "linear-gradient(to left, #8b5cf6, #ec4899)",
              border: "none",
              borderRadius: "clamp(20px, 4vw, 32px)",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.5s",
              boxShadow: "0 25px 60px rgba(139, 92, 246, 0.5)",
              transform: loading ? "none" : "translateY(0)"
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.transform = "translateY(-15px)")}
            onMouseOut={(e) => !loading && (e.currentTarget.style.transform = "translateY(0)")}
          >
            {loading ? "در حال تولید موضوعات..." : "دریافت موضوعات پیشنهادی 🚀"}
          </button>
        </form>

        {/* خطا */}
        {error && (
          <div style={{
            margin: "clamp(40px, 6vw, 60px) 0",
            padding: "clamp(30px, 5vw, 50px)",
            background: "#7f1d1d",
            border: "4px solid #ef4444",
            borderRadius: "clamp(20px, 4vw, 32px)",
            color: "#fca5a5",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "clamp(20px, 5vw, 28px)",
            flexShrink: 0
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* نتایج — ریسپانسیو با grid */}
        {suggestions.length > 0 && (
          <div style={{ marginTop: "clamp(60px, 8vw, 100px)", flex: 1, overflowY: "auto" }}>
            <h2 style={{
              fontSize: "clamp(36px, 8vw, 56px)",
              fontWeight: "900",
              background: "linear-gradient(to left, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "clamp(40px, 6vw, 70px)"
            }}>
              موضوعات پیشنهادی شما! 🌟
            </h2>

            {/* هشدار مهم */}
            <p style={{
              fontSize: "clamp(18px, 4vw, 22px)",
              color: "#fbbf24",
              background: "rgba(251, 191, 36, 0.2)",
              padding: "clamp(20px, 4vw, 30px)",
              borderRadius: "20px",
              border: "2px solid #fbbf24",
              margin: "0 0 clamp(50px, 8vw, 80px) 0",
              fontWeight: "bold"
            }}>
              توجه: از هوش مصنوعی تنها برای ایده گرفتن استفاده کنید. استفاده کامل از آن در انجام رساله و پایان‌نامه ممکن است حتی به از بین رفتن سوابق تحصیلی شما توسط وزارت علوم منجر شود.
            </p>

            <div style={{
              display: "grid",
              gap: "clamp(30px, 6vw, 60px)",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
            }}>
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "clamp(30px, 6vw, 60px)",
                    background: "linear-gradient(to left, #1e293b, #334155)",
                    borderRadius: "clamp(30px, 6vw, 56px)",
                    border: "4px solid transparent",
                    boxShadow: "0 25px 70px rgba(139, 92, 246, 0.3)",
                    transition: "all 0.6s",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = "#ec4899"}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = "transparent"}
                >
                  <div style={{
                    position: "absolute",
                    top: "clamp(20px, 4vw, 35px)",
                    left: "clamp(25px, 5vw, 40px)",
                    fontSize: "clamp(70px, 12vw, 100px)",
                    fontWeight: "900",
                    color: "#ec4899",
                    opacity: 0.15
                  }}>
                    #{i + 1}
                  </div>
                  <p style={{
                    fontSize: "clamp(24px, 5vw, 36px)",
                    lineHeight: "2.4",
                    color: "#e0e7ff",
                    margin: 0,
                    paddingLeft: "clamp(80px, 15vw, 140px)",
                    overflowWrap: "break-word"
                  }}>
                    {s}
                  </p>
                </div>
              ))}
            </div>

            {/* دعوت به مشاوره */}
            <div style={{
              marginTop: "clamp(80px, 10vw, 120px)",
              padding: "clamp(40px, 8vw, 60px)",
              background: "rgba(139, 92, 246, 0.1)",
              border: "3px solid #8b5cf6",
              borderRadius: "40px",
              textAlign: "center"
            }}>
              <p style={{
                fontSize: "clamp(24px, 6vw, 32px)",
                color: "#e0e7ff",
                margin: "0 0 clamp(30px, 6vw, 50px) 0",
                fontWeight: "bold"
              }}>
                برای مشاوره، آموزش و انجام پایان‌نامه‌های خود با گروه علمی کاسپین در ارتباط باشید.
              </p>
              <a
                href="https://caspianthesis.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "clamp(20px, 5vw, 30px) clamp(50px, 10vw, 80px)",
                  fontSize: "clamp(26px, 6vw, 36px)",
                  fontWeight: "bold",
                  color: "white",
                  background: "linear-gradient(to left, #8b5cf6, #ec4899)",
                  borderRadius: "30px",
                  textDecoration: "none",
                  boxShadow: "0 20px 50px rgba(139, 92, 246, 0.4)",
                  transition: "all 0.5s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                تماس با کاسپین تز 📞
              </a>
            </div>
          </div>
        )}

        {/* فوتر */}
        <div style={{
          marginTop: "clamp(80px, 10vw, 120px)",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "clamp(18px, 4vw, 24px)",
          fontWeight: "bold",
          flexShrink: 0
        }}>
          ساخته شده توسط گروه دیجی نورون
        </div>
      </div>
    </div>
  );
}