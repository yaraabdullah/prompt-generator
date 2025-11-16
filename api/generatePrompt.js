const fetch = global.fetch || require("node-fetch");

function buildSystemPrompt(language, domain, answers) {
  const isArabic = language === "ar";

  const domainLabelMap = {
    healthcare: isArabic ? "الرعاية الصحية" : "healthcare",
    smartCities: isArabic ? "المدن الذكية" : "smart cities",
    business: isArabic ? "الأعمال" : "business",
    education: isArabic ? "التعليم" : "education",
    nonProfit: isArabic ? "العمل التطوعي / غير الربحي" : "non‑profit / volunteering",
  };

  const domainLabel = domainLabelMap[domain] || domain;

  const baseInstructionsEn = `
You are helping a non-technical user generate ONE clear prompt to use inside Lovable (an AI website builder).

GOAL:
- Write a single, well-structured prompt that they can paste into Lovable to generate a complete website for their idea.

REQUIREMENTS:
- Write the whole prompt in clear, simple English.
- Speak directly to Lovable as the AI website builder.
- Mention the domain: "${domainLabel}".
- Summarize the user's idea, target audience, goals, and requested features based on the notes.
- Ask Lovable to:
  - Propose a suitable modern layout and navigation.
  - Create the main pages and sections.
  - Use simple, readable copy and placeholder images/icons.
  - Support both desktop and mobile.
- Keep the prompt reasonably short and focused (about 2–4 short paragraphs + bullet lists if needed).
- Do NOT include any explanation around the prompt. Only output the final prompt that the user should paste into Lovable. No intro text, no quotes, no markdown, no commentary.

User notes (free text, may be incomplete or noisy):
`;

  const baseInstructionsAr = `
أنت تساعد مستخدماً غير تقني على إنشاء أمر واحد واضح لاستخدامه داخل منصة Lovable (منصة لإنشاء المواقع بالذكاء الاصطناعي).

الهدف:
- كتابة أمر واحد منسّق وواضح يمكن للمستخدم نسخه ولصقه داخل Lovable لإنشاء موقع كامل لفكرته.

المتطلبات:
- اكتب الأمر بالكامل باللغة العربية الفصحى البسيطة.
- تحدّث مباشرةً إلى Lovable كأنه منصّة إنشاء موقع.
- اذكر المجال: "${domainLabel}".
- لخّص فكرة المستخدم، الجمهور المستهدف، الأهداف، والخصائص المطلوبة اعتماداً على الملاحظات.
- اطلب من Lovable أن يقوم بـ:
  - اقتراح تصميم حديث وبسيط مع قوائم واضحة.
  - إنشاء الصفحات والأقسام الرئيسية المناسبة.
  - استخدام نصوص بسيطة وصور/أيقونات افتراضية.
  - دعم العرض على الجوال والكمبيوتر.
- اجعل الأمر قصيراً ومركّزاً (حوالي ٢–٤ فقرات قصيرة مع نقاط إذا لزم).
- لا تكتب أي شرح حول الأمر. فقط أخرج نص الأمر النهائي الذي سيلصقه المستخدم داخل Lovable. بدون مقدمة، بدون اقتباسات، بدون تعليقات.

ملاحظات المستخدم (قد تكون غير كاملة أو مختصرة):
`;

  const lines = [];
  for (const [key, value] of Object.entries(answers || {})) {
    if (typeof value === "string" && value.trim()) {
      lines.push(`- ${key}: ${value.trim()}`);
    }
  }

  const notesBlock = lines.join("\n") || (isArabic ? "- لم يقدّم المستخدم تفاصيل كافية." : "- The user did not provide many details.");

  return (isArabic ? baseInstructionsAr : baseInstructionsEn) + "\n" + notesBlock;
}

async function callGemini(systemPrompt, apiKey) {
  // Use the widely available text model "gemini-pro" on the v1beta API.
  // This model supports generateContent and avoids 404s from newer preview model names.
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  };

  const res = await fetch(`${endpoint}?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";

  return text.trim();
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.statusCode = 500;
    res.json({ error: "Missing GEMINI_API_KEY environment variable" });
    return;
  }

  try {
    const { language = "en", domain, answers } = req.body || {};

    if (!domain) {
      res.statusCode = 400;
      res.json({ error: "Missing 'domain' in request body" });
      return;
    }

    const systemPrompt = buildSystemPrompt(language === "ar" ? "ar" : "en", domain, answers);
    const prompt = await callGemini(systemPrompt, apiKey);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ prompt }));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ error: "Failed to generate prompt" });
  }
};


