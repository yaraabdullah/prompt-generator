const fetch = global.fetch || require("node-fetch");

function buildFallbackPrompt(language, domain, answers) {
  const isArabic = language === "ar";
  const clean = (v) => (typeof v === "string" && v.trim() ? v.trim() : "");

  const idea = clean(answers?.idea);
  const audience = clean(answers?.targetAudience);
  const goals =
    clean(answers?.mainGoals) ||
    clean(answers?.dataContent) ||
    clean(answers?.contentType) ||
    clean(answers?.impact);
  const features = clean(answers?.features);

  if (!isArabic) {
    return [
      `You are Lovable, an AI website builder. Build a complete website based on this idea: ${idea || "a simple professional website in the selected domain"}.`,
      audience
        ? `The main audience is: ${audience}.`
        : "Choose a clear primary audience and write copy that speaks directly to them.",
      goals
        ? `Main goals of the site: ${goals}.`
        : "The website should clearly explain the value, build trust, and encourage visitors to take action.",
      features
        ? `Key sections and features to include: ${features}.`
        : "Include a modern home page, clear navigation, an about/overview section, services or projects, and a simple contact section or form.",
      "Use a clean modern layout, responsive on desktop and mobile. Write concise, friendly copy and use neutral placeholder images/icons where needed.",
    ].join(" ");
  }

  return [
    `أنت منصة Lovable لإنشاء المواقع بالذكاء الاصطناعي. أنشئ موقعاً كاملاً بناءً على هذه الفكرة: ${idea || "موقع بسيط واحترافي في المجال المختار"}.`,
    audience
      ? `الجمهور المستهدف الرئيسي: ${audience}.`
      : "اختر جمهوراً مستهدفاً رئيسياً واكتب محتوى يتحدث إليه بشكل مباشر.",
    goals
      ? `أهداف الموقع الأساسية: ${goals}.`
      : "يجب أن يوضح الموقع القيمة، ويعزز الثقة، ويشجّع الزائر على اتخاذ إجراء واضح.",
    features
      ? `الأقسام والخصائص المطلوبة في الموقع: ${features}.`
      : "أضف صفحة رئيسية حديثة، وصفحة تعرّف بالمبادرة أو الجهة، وصفحة للخدمات أو المشاريع، وقسم واضح للتواصل أو التسجيل أو الانضمام.",
    "استخدم تصميماً عصرياً بسيطاً يدعم العرض على الجوال والكمبيوتر، مع نصوص عربية فصحى واضحة وصور أو أيقونات افتراضية مناسبة.",
  ].join(" ");
}

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
  // Use the model explicitly chosen for this project.
  // If you ever change models in Google AI Studio, update the ID here or via an env var.
  const modelId = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const baseUrl = modelId.startsWith("gemini-2.5")
    ? "https://generativelanguage.googleapis.com/v1"
    : "https://generativelanguage.googleapis.com/v1beta";

  const endpoint = `${baseUrl}/models/${modelId}:generateContent`;

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

  // Basic retry on 503 overload
  const maxAttempts = 2;
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(`${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
      return text.trim();
    }

    const status = res.status;
    const errText = await res.text();

    // If overloaded, retry once after a short delay
    if (status === 503 && attempt < maxAttempts) {
      lastError = new Error(`Gemini API overloaded (503): ${errText}`);
      await new Promise((r) => setTimeout(r, 900));
      continue;
    }

    throw new Error(`Gemini API error: ${status} ${errText}`);
  }

  throw lastError || new Error("Gemini API failed after retries.");
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

    const langCode = language === "ar" ? "ar" : "en";
    const systemPrompt = buildSystemPrompt(langCode, domain, answers);
    let prompt = "";

    try {
      prompt = await callGemini(systemPrompt, apiKey);
    } catch (modelErr) {
      console.error("Gemini call failed, falling back to local prompt:", modelErr);
      // fall through to fallback below
    }

    if (!prompt || prompt.length < 10) {
      prompt = buildFallbackPrompt(langCode, domain, answers);
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ prompt }));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ error: "Failed to generate prompt" });
  }
};


