// Simple bilingual labels and domain questions

const state = {
  language: "en", // "en" or "ar"
  selectedDomain: null,
};

const translations = {
  en: {
    appTitle: "Prompt Generator",
    appSubtitle: "Answer a few questions and get a ready-to-use prompt for Lovable.",
    domainTitle: "Choose a domain",
    domainDescription: "Start by selecting the type of website you want to generate.",
    domains: {
      healthcare: {
        title: "Healthcare",
        subtitle: "Clinics, hospitals, telehealth, wellness services",
      },
      smartCities: {
        title: "Smart cities",
        subtitle: "Mobility, IoT, urban services, dashboards",
      },
      business: {
        title: "Business",
        subtitle: "Startups, agencies, e-commerce, services",
      },
      education: {
        title: "Education",
        subtitle: "Courses, schools, platforms, training",
      },
      nonProfit: {
        title: "Volunteering",
        subtitle: "Initiatives, campaigns, volunteering platforms",
      },
    },
    questionsTitle: "Tell us about your idea",
    questionsDescription:
      "Keep your answers short and simple. This helps us build a strong prompt.",
    backToDomains: "Back to domains",
    generateButton: "Generate prompt",
    resultTitle: "Your Lovable prompt",
    resultDescription: "Copy this prompt and paste it into Lovable to generate your website.",
    copyButton: "Copy to clipboard",
    openLovableButton: "Open Lovable",
    copied: "Copied!",
    copyFailed: "Copy failed",
    privacyNote: "Your answers are only used to generate a prompt and are not stored.",
    loadingText: "Generating your prompt...",
    generating: "Generating…",
    generateAgain: "Generate again",
    defaultError:
      "Something went wrong while generating the prompt. Please try again in a moment.",
  },
  ar: {
    appTitle: "مولّد الأوامر",
    appSubtitle: "Lovable أجب عن بعض الأسئلة القصيرة وسننشئ لك أمراً جاهزاً لاستخدامه في",
    // Used to control visual order of the English word "Lovable" in RTL.
    appSubtitleHtml:
      "أجب عن بعض الأسئلة القصيرة وسننشئ لك أمراً جاهزاً لاستخدامه في <span dir=\"ltr\">Lovable</span>.",
    domainTitle: "اختر المجال",
    domainDescription: "ابدأ باختيار نوع الموقع الذي تريد إنشاءه.",
    domains: {
      healthcare: {
        title: "الرعاية الصحية",
        subtitle: "العيادات، المستشفيات، الخدمات الصحية والرفاهية",
      },
      smartCities: {
        title: "المدن الذكية",
        subtitle: "التنقل، إنترنت الأشياء، الخدمات الحضرية، لوحات المعلومات",
      },
      business: {
        title: "الأعمال",
        subtitle: "الشركات الناشئة، الوكالات، المتاجر الإلكترونية، الخدمات",
      },
      education: {
        title: "التعليم",
        subtitle: "الدورات، المدارس، المنصات التعليمية، التدريب",
      },
      nonProfit: {
        title: "العمل التطوعي",
        subtitle: "المبادرات، الحملات، منصات التطوع",
      },
    },
    questionsTitle: "حدثنا عن فكرتك",
    questionsDescription:
      "حاول أن تكون إجاباتك قصيرة وواضحة حتى نستطيع بناء أمر قوي لك.",
    backToDomains: "الرجوع لاختيار المجال",
    generateButton: "إنشاء الأمر",
    resultTitle: "الأمر الجاهز لـ Lovable",
    resultDescription: "انسخ هذا الأمر والصقه في Lovable لإنشاء موقعك.",
    copyButton: "نسخ إلى الحافظة",
    openLovableButton: "الانتقال إلى Lovable",
    copied: "تم النسخ!",
    copyFailed: "فشل النسخ",
    privacyNote: "تُستخدم إجاباتك فقط لإنشاء الأمر ولا يتم حفظها.",
    loadingText: "جاري إنشاء الأمر...",
    generating: "جاري الإنشاء…",
    generateAgain: "إنشاء أمر جديد",
    defaultError: "حدث خطأ أثناء إنشاء الأمر. يرجى المحاولة مرة أخرى بعد قليل.",
  },
};

// Domain-specific questions
// Each question: { id, label: {en, ar}, hint: {en, ar}, type }

const domainQuestions = {
  healthcare: [
    {
      id: "idea",
      label: {
        en: "What is your healthcare idea in one or two sentences?",
        ar: "ما هي فكرة موقعك في مجال الرعاية الصحية (سطر أو سطرين)؟",
      },
      hint: {
        en: "Example: A website for a small dental clinic with online appointment booking.",
        ar: "مثال: موقع لعيادة أسنان صغيرة مع حجز المواعيد أونلاين.",
      },
      type: "textarea",
    },
    {
      id: "targetAudience",
      label: {
        en: "Who is the main audience?",
        ar: "من هو الجمهور المستهدف الرئيسي؟",
      },
      hint: {
        en: "Example: Families, elderly patients, chronic disease patients, etc.",
        ar: "مثال: العائلات، كبار السن، مرضى الأمراض المزمنة، إلخ.",
      },
      type: "text",
    },
    {
      id: "mainGoals",
      label: {
        en: "What are the main goals of the website?",
        ar: "ما هي الأهداف الأساسية للموقع؟",
      },
      hint: {
        en: "Example: Explain services, collect appointments, share health tips.",
        ar: "مثال: شرح الخدمات، استقبال حجز المواعيد، مشاركة نصائح صحية.",
      },
      type: "textarea",
    },
    {
      id: "features",
      label: {
        en: "List 3–5 key features you want on the site.",
        ar: "اذكر ٣–٥ خصائص أو أقسام مهمة تريدها في الموقع.",
      },
      hint: {
        en: "Example: Appointment form, services list, doctor profiles, contact/WhatsApp.",
        ar: "مثال: نموذج حجز، قائمة الخدمات، ملفات الأطباء، تواصل/واتساب.",
      },
      type: "textarea",
    },
  ],
  smartCities: [
    {
      id: "idea",
      label: {
        en: "Describe your smart city idea in one or two sentences.",
        ar: "صف فكرتك في مجال المدن الذكية في سطر أو سطرين.",
      },
      hint: {
        en: "Example: Dashboard for city mobility data and public transport.",
        ar: "مثال: لوحة معلومات لبيانات التنقل ووسائل النقل العامة في المدينة.",
      },
      type: "textarea",
    },
    {
      id: "targetAudience",
      label: {
        en: "Who will use this website?",
        ar: "من هم مستخدمو هذا الموقع؟",
      },
      hint: {
        en: "Example: Citizens, city officials, investors, students.",
        ar: "مثال: السكان، مسؤولو المدينة، المستثمرون، الطلاب.",
      },
      type: "text",
    },
    {
      id: "dataContent",
      label: {
        en: "What kind of information or data should the site show?",
        ar: "ما نوع البيانات أو المعلومات التي يجب أن يعرضها الموقع؟",
      },
      hint: {
        en: "Example: Traffic, sensors, air quality, projects, events.",
        ar: "مثال: حركة المرور، الحساسات، جودة الهواء، المشاريع، الفعاليات.",
      },
      type: "textarea",
    },
    {
      id: "features",
      label: {
        en: "List 3–5 important pages or features.",
        ar: "اذكر ٣–٥ صفحات أو خصائص أساسية.",
      },
      hint: {
        en: "Example: Interactive map, stats cards, project list, contact form.",
        ar: "مثال: خريطة تفاعلية، مؤشرات رقمية، قائمة بالمشاريع، نموذج تواصل.",
      },
      type: "textarea",
    },
  ],
  business: [
    {
      id: "idea",
      label: {
        en: "What type of business or startup is this for?",
        ar: "ما نوع المشروع أو الشركة التي سيُنشأ لها الموقع؟",
      },
      hint: {
        en: "Example: Digital marketing agency, coffee shop, online store, consulting.",
        ar: "مثال: وكالة تسويق رقمي، مقهى، متجر إلكتروني، استشارات.",
      },
      type: "textarea",
    },
    {
      id: "targetAudience",
      label: {
        en: "Who are your ideal customers?",
        ar: "من هم عملاؤك المثاليون؟",
      },
      hint: {
        en: "Example: Small businesses, students, parents, tech enthusiasts.",
        ar: "مثال: الشركات الصغيرة، الطلاب، أولياء الأمور، المهتمون بالتقنية.",
      },
      type: "text",
    },
    {
      id: "valueProposition",
      label: {
        en: "What makes your business special or different?",
        ar: "ما الذي يميز مشروعك أو خدمتك عن الآخرين؟",
      },
      hint: {
        en: "Example: Fast delivery, personalized service, unique product, price.",
        ar: "مثال: سرعة في التنفيذ، خدمة شخصية، منتج مميز، أسعار تنافسية.",
      },
      type: "textarea",
    },
    {
      id: "features",
      label: {
        en: "List 3–5 key sections you want on the website.",
        ar: "اذكر ٣–٥ أقسام أساسية تريدها في الموقع.",
      },
      hint: {
        en: "Example: Home, services, portfolio, pricing, about us, contact.",
        ar: "مثال: الرئيسية، الخدمات، أعمالنا، الباقات/الأسعار، من نحن، تواصل.",
      },
      type: "textarea",
    },
  ],
  education: [
    {
      id: "idea",
      label: {
        en: "What is the educational idea or project?",
        ar: "ما هي الفكرة أو المبادرة التعليمية للموقع؟",
      },
      hint: {
        en: "Example: Online course, training center, school, tutoring platform.",
        ar: "مثال: دورة أونلاين، مركز تدريبي، مدرسة، منصة دروس خصوصية.",
      },
      type: "textarea",
    },
    {
      id: "targetAudience",
      label: {
        en: "Who are the learners or users?",
        ar: "من هم المتعلمون أو المستخدمون المستهدفون؟",
      },
      hint: {
        en: "Example: High school students, university students, employees.",
        ar: "مثال: طلاب ثانوي، طلاب جامعات، موظفون.",
      },
      type: "text",
    },
    {
      id: "contentType",
      label: {
        en: "What type of content will you offer?",
        ar: "ما نوع المحتوى التعليمي الذي ستقدمه؟",
      },
      hint: {
        en: "Example: Video lessons, live sessions, PDFs, quizzes, blog articles.",
        ar: "مثال: فيديوهات، جلسات مباشرة، ملفات PDF، اختبارات، مقالات.",
      },
      type: "textarea",
    },
    {
      id: "features",
      label: {
        en: "List 3–5 important pages or features for learners.",
        ar: "اذكر ٣–٥ صفحات أو خصائص مهمة للمتعلمين.",
      },
      hint: {
        en: "Example: Course catalog, enrollment form, instructors page, FAQs.",
        ar: "مثال: قائمة الدورات، نموذج التسجيل، صفحة المدربين، الأسئلة الشائعة.",
      },
      type: "textarea",
    },
  ],
  nonProfit: [
    {
      id: "idea",
      label: {
        en: "Describe your non-profit or volunteering idea.",
        ar: "صف مبادرتك أو فكرتك في مجال العمل التطوعي أو غير الربحي.",
      },
      hint: {
        en: "Example: Volunteer matching platform for environmental projects.",
        ar: "مثال: منصة لربط المتطوعين بمشاريع بيئية.",
      },
      type: "textarea",
    },
    {
      id: "targetAudience",
      label: {
        en: "Who do you want to reach?",
        ar: "من الفئة التي تريد الوصول إليها؟",
      },
      hint: {
        en: "Example: Volunteers, donors, NGOs, students, local communities.",
        ar: "مثال: المتطوعون، المتبرعون، الجمعيات، الطلاب، المجتمع المحلي.",
      },
      type: "text",
    },
    {
      id: "impact",
      label: {
        en: "What impact or results do you want to highlight?",
        ar: "ما الأثر أو النتائج التي تريد إبرازها في الموقع؟",
      },
      hint: {
        en: "Example: Number of volunteers, completed projects, stories.",
        ar: "مثال: عدد المتطوعين، المشاريع المنجزة، القصص والتجارب.",
      },
      type: "textarea",
    },
    {
      id: "features",
      label: {
        en: "List 3–5 important sections you want on the website.",
        ar: "اذكر ٣–٥ أقسام أساسية تريدها في الموقع.",
      },
      hint: {
        en: "Example: About the initiative, projects, how to volunteer, donate, contact.",
        ar: "مثال: عن المبادرة، المشاريع، كيف تتطوع، التبرع، التواصل.",
      },
      type: "textarea",
    },
  ],
};

const domainOrder = ["nonProfit", "healthcare", "smartCities", "business", "education"];

function $(id) {
  return document.getElementById(id);
}

function applyLanguage() {
  const t = translations[state.language];

  $("app-title").textContent = t.appTitle;
  const subtitleEl = $("app-subtitle");
  if (state.language === "ar" && t.appSubtitleHtml) {
    subtitleEl.innerHTML = t.appSubtitleHtml;
  } else {
    subtitleEl.textContent = t.appSubtitle;
  }
  $("domain-title").textContent = t.domainTitle;
  $("domain-description").textContent = t.domainDescription;
  $("questions-title").textContent = t.questionsTitle;
  $("questions-description").textContent = t.questionsDescription;
  $("back-to-domains-label").textContent = t.backToDomains;
  $("generate-button-label").textContent = t.generateButton;
  $("result-title").textContent = t.resultTitle;
  $("result-description").textContent = t.resultDescription;
  $("copy-button-label").textContent = t.copyButton;
  if ($("open-lovable-label")) {
    $("open-lovable-label").textContent = t.openLovableButton;
  }
  $("privacy-note").textContent = t.privacyNote;
  $("loading-text").textContent = t.loadingText;

  // Direction: apply to the main app and the whole body so the header text flows correctly
  const isArabic = state.language === "ar";
  const app = $("app");
  app.setAttribute("dir", isArabic ? "rtl" : "ltr");
  document.body.setAttribute("dir", isArabic ? "rtl" : "ltr");

  // Explicitly flip header layout (logo/title right, switcher left) in Arabic
  const header = document.querySelector("header.header");
  if (header) {
    if (isArabic) {
      header.classList.add("header--rtl");
    } else {
      header.classList.remove("header--rtl");
    }
  }

  // Domains
  renderDomains();

  // If domain already selected, re-render questions
  if (state.selectedDomain) {
    renderQuestions(state.selectedDomain);
  }
}

function renderDomains() {
  const list = $("domain-list");
  const t = translations[state.language];

  list.innerHTML = "";

  domainOrder.forEach((key) => {
    const domainInfo = t.domains[key];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "domain-button";
    button.dataset.domain = key;

    const title = document.createElement("div");
    title.className = "domain-button-title";
    title.textContent = domainInfo.title;

    const subtitle = document.createElement("div");
    subtitle.className = "domain-button-subtitle";
    subtitle.textContent = domainInfo.subtitle;

    button.appendChild(title);
    button.appendChild(subtitle);
    button.addEventListener("click", () => {
      state.selectedDomain = key;
      $("questions-card").hidden = false;
      $("result-card").hidden = true;
      renderQuestions(key);
      scrollToTop();
    });

    list.appendChild(button);
  });
}

function renderQuestions(domainKey) {
  const container = $("questions-container");
  const lang = state.language;
  const questions = domainQuestions[domainKey] || [];

  container.innerHTML = "";

  questions.forEach((q) => {
    const wrapper = document.createElement("div");
    wrapper.className = "form-field";

    const label = document.createElement("label");
    label.className = "form-label";
    label.htmlFor = q.id;
    label.textContent = q.label[lang];

    const hint = document.createElement("div");
    hint.className = "form-hint";
    hint.textContent = q.hint[lang];

    let input;
    if (q.type === "textarea") {
      input = document.createElement("textarea");
      input.className = "textarea-input";
      input.rows = 3;
    } else {
      input = document.createElement("input");
      input.type = "text";
      input.className = "text-input";
    }
    input.id = q.id;
    input.name = q.id;

    wrapper.appendChild(label);
    wrapper.appendChild(hint);
    wrapper.appendChild(input);

    container.appendChild(wrapper);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function handleSubmit(event) {
  event.preventDefault();
  if (!state.selectedDomain) return;

  const lang = state.language;
  const t = translations[lang];
  const domainKey = state.selectedDomain;
  const questions = domainQuestions[domainKey] || [];

  const answers = {};
  questions.forEach((q) => {
    const input = $(q.id);
    answers[q.id] = (input?.value || "").trim();
  });

  const hasContent = Object.values(answers).some((v) => v.length > 0);
  if (!hasContent) {
    // Basic UX: focus first field if everything is empty
    const first = $(questions[0].id);
    first?.focus();
    return;
  }

  showLoading(true);
  setGenerateButtonLoading(true);

  try {
    const resp = await fetch("/api/generatePrompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: lang,
        domain: domainKey,
        answers,
      }),
    });

    if (!resp.ok) {
      throw new Error("Request failed");
    }

    const data = await resp.json();
    const promptText = data?.prompt || "";
    $("prompt-output").value = promptText || t.defaultError;
    $("result-card").hidden = false;
    scrollToTop();
  } catch (err) {
    console.error(err);
    $("prompt-output").value = t.defaultError;
    $("result-card").hidden = false;
  } finally {
    showLoading(false);
    setGenerateButtonLoading(false);
  }
}

function showLoading(visible) {
  $("loading-overlay").hidden = !visible;
}

function setGenerateButtonLoading(loading) {
  const btn = $("generate-button");
  const label = $("generate-button-label");
  const lang = state.language;
  const t = translations[lang];

  if (loading) {
    btn.disabled = true;
    label.textContent = t.generating;
  } else {
    btn.disabled = false;
    label.textContent = t.generateButton;
  }
}

function handleCopy() {
  const text = $("prompt-output").value;
  const lang = state.language;
  const t = translations[lang];

  if (!text) return;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      $("copy-status").textContent = t.copied;
      setTimeout(() => {
        $("copy-status").textContent = "";
      }, 1800);
    })
    .catch(() => {
      $("copy-status").textContent = t.copyFailed;
      setTimeout(() => {
        $("copy-status").textContent = "";
      }, 2000);
    });
}

function handleOpenLovable() {
  const url = "https://lovable.dev";
  window.open(url, "_blank", "noopener");
}

function initLanguageSwitcher() {
  const btnEn = $("lang-en");
  const btnAr = $("lang-ar");

  btnEn.addEventListener("click", () => {
    if (state.language === "en") return;
    state.language = "en";
    btnEn.classList.add("lang-button--active");
    btnAr.classList.remove("lang-button--active");
    document.documentElement.lang = "en";
    applyLanguage();
  });

  btnAr.addEventListener("click", () => {
    if (state.language === "ar") return;
    state.language = "ar";
    btnAr.classList.add("lang-button--active");
    btnEn.classList.remove("lang-button--active");
    document.documentElement.lang = "ar";
    applyLanguage();
  });
}

function initNavigation() {
  $("back-to-domains").addEventListener("click", () => {
    $("questions-card").hidden = true;
    $("result-card").hidden = true;
    state.selectedDomain = null;
    scrollToTop();
  });
}

function initForm() {
  $("questions-form").addEventListener("submit", handleSubmit);
  $("copy-button").addEventListener("click", handleCopy);
  const openLovableBtn = $("open-lovable");
  if (openLovableBtn) {
    openLovableBtn.addEventListener("click", handleOpenLovable);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.lang = "en";
  initLanguageSwitcher();
  initNavigation();
  initForm();
  // Make sure loading overlay is hidden on initial load
  showLoading(false);
  applyLanguage();
});


