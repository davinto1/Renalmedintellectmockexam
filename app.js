// ===== STATE =====
let currentSection = null;
let currentIndex = 0;
let currentQuestions = [];
let selectedOption = null;
let userAnswer = "";
let showingFeedback = false;
let reviewFilter = "all";

const STORAGE_KEY = "renal_mock_exam_progress_v1";

// ===== STORAGE HELPERS =====
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getQuestionRecord(id) {
  const prog = loadProgress();
  return prog[id] || null;
}

function recordAttempt(id, section, correct, userResponse, modelAnswer) {
  const prog = loadProgress();
  const existing = prog[id] || { attempts: 0, passed: false };
  existing.attempts += 1;
  existing.lastAttempt = new Date().toISOString();
  existing.correct = correct;
  existing.passed = correct; // latest result
  existing.userResponse = userResponse;
  existing.modelAnswer = modelAnswer;
  existing.section = section;
  prog[id] = existing;
  saveProgress(prog);
  updateBadges();
}

function resetProgress() {
  if (confirm("Are you sure you want to erase all progress? This cannot be undone.")) {
    localStorage.removeItem(STORAGE_KEY);
    updateBadges();
    showDashboard();
    alert("Progress has been reset.");
  }
}

// ===== NAVIGATION =====
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showHome() {
  showSection("home");
  updateBadges();
  updateQuickStats();
}

function showDashboard() {
  showSection("dashboard");
  renderDashboard();
}

function showReview() {
  showSection("review");
  renderReview();
}

// ===== BADGES & STATS =====
function updateBadges() {
  const prog = loadProgress();
  const counts = { mcq: 0, objective: 0, highProb: 0, aoc: 0 };
  const totals = {
    mcq: questionBank.mcq.length,
    objective: questionBank.objective.length,
    highProb: questionBank.highProb.length,
    aoc: questionBank.aoc.length
  };

  Object.values(prog).forEach(r => {
    if (r.section && counts[r.section] !== undefined) counts[r.section]++;
  });

  document.getElementById("mcqBadge").textContent = `${counts.mcq}/${totals.mcq} attempted`;
  document.getElementById("objBadge").textContent = `${counts.objective}/${totals.objective} attempted`;
  document.getElementById("hpBadge").textContent = `${counts.highProb}/${totals.highProb} attempted`;
  document.getElementById("aocBadge").textContent = `${counts.aoc}/${totals.aoc} attempted`;
}

function updateQuickStats() {
  const prog = loadProgress();
  const records = Object.values(prog);
  const totalAttempted = records.length;
  const passed = records.filter(r => r.passed).length;
  const failed = totalAttempted - passed;
  const totalQuestions = questionBank.mcq.length + questionBank.objective.length +
                         questionBank.highProb.length + questionBank.aoc.length;

  const el = document.getElementById("quickStats");
  if (totalAttempted === 0) {
    el.innerHTML = `<span>Ready to begin · <strong>${totalQuestions}</strong> questions available</span>`;
  } else {
    el.innerHTML = `
      <span>Attempted: <strong>${totalAttempted}</strong></span>
      <span class="pass">Passed: <strong>${passed}</strong></span>
      <span class="fail">Failed: <strong>${failed}</strong></span>
      <span>Remaining: <strong>${totalQuestions - totalAttempted}</strong></span>
    `;
  }
}

// ===== QUIZ FLOW =====
function startSection(section) {
  currentSection = section;
  currentIndex = 0;
  selectedOption = null;
  userAnswer = "";
  showingFeedback = false;

  if (section === "mcq") currentQuestions = questionBank.mcq;
  else if (section === "objective") currentQuestions = questionBank.objective;
  else if (section === "highProb") currentQuestions = questionBank.highProb;
  else if (section === "aoc") currentQuestions = questionBank.aoc;

  const titles = {
    mcq: "Multiple Choice Questions",
    objective: "Objective / Short Answers",
    highProb: "High Probability Questions",
    aoc: "Area of Concentration (Essays)"
  };
  document.getElementById("sectionTitle").textContent = titles[section];

  showSection("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = currentQuestions[currentIndex];
  const total = currentQuestions.length;
  const progress = ((currentIndex) / total) * 100;

  document.getElementById("progressText").textContent = `Question ${currentIndex + 1} of ${total}`;
  document.getElementById("progressFill").style.width = `${progress}%`;

  // Live score for this section
  const prog = loadProgress();
  let score = 0;
  currentQuestions.forEach(qq => {
    if (prog[qq.id] && prog[qq.id].passed) score++;
  });
  document.getElementById("liveScore").textContent = `Score: ${score}/${total}`;

  const card = document.getElementById("questionCard");
  const actions = document.getElementById("quizActions");

  // Check if already attempted
  const record = getQuestionRecord(q.id);

  if (currentSection === "mcq") {
    renderMCQ(q, card, actions, record);
  } else if (currentSection === "objective") {
    renderObjective(q, card, actions, record);
  } else {
    // highProb or aoc – essay style
    renderEssay(q, card, actions, record);
  }
}

function renderMCQ(q, card, actions, record) {
  const letters = ["A", "B", "C", "D"];
  let optionsHtml = q.options.map((opt, i) => `
    <div class="option" data-index="${i}" onclick="selectOption(${i})">
      <span class="option-letter">${letters[i]}</span>
      <span>${opt}</span>
    </div>
  `).join("");

  card.innerHTML = `
    <div class="q-number">MCQ ${currentIndex + 1}</div>
    <div class="q-text">${q.question}</div>
    <div class="options" id="optionsList">${optionsHtml}</div>
    <div class="feedback" id="feedback"></div>
  `;

  actions.innerHTML = `
    <button class="btn secondary" onclick="prevQuestion()" ${currentIndex === 0 ? "disabled" : ""}>Previous</button>
    <button class="btn primary" id="submitBtn" onclick="submitMCQ()" disabled>Submit Answer</button>
    <button class="btn secondary" id="nextBtn" onclick="nextQuestion()" style="display:none">Next →</button>
  `;

  // If already attempted, show previous result
  if (record && record.userResponse !== undefined) {
    selectedOption = parseInt(record.userResponse);
    showMCQFeedback(q, record.correct);
  }
}

function selectOption(index) {
  if (showingFeedback) return;
  selectedOption = index;
  document.querySelectorAll(".option").forEach((el, i) => {
    el.classList.toggle("selected", i === index);
  });
  document.getElementById("submitBtn").disabled = false;
}

function submitMCQ() {
  if (selectedOption === null) return;
  const q = currentQuestions[currentIndex];
  const correct = selectedOption === q.correct;
  recordAttempt(q.id, "mcq", correct, selectedOption, q.options[q.correct]);
  showMCQFeedback(q, correct);
}

function showMCQFeedback(q, correct) {
  showingFeedback = true;
  const options = document.querySelectorAll(".option");
  options.forEach((el, i) => {
    el.classList.add("disabled");
    if (i === q.correct) el.classList.add("correct");
    if (i === selectedOption && !correct) el.classList.add("wrong");
  });

  const fb = document.getElementById("feedback");
  fb.className = `feedback show ${correct ? "correct" : "wrong"}`;
  fb.innerHTML = `
    <strong>${correct ? "✓ Correct!" : "✗ Incorrect"}</strong>
    ${q.explanation}
    <div class="model-answer"><strong>Correct answer:</strong> ${["A","B","C","D"][q.correct]}) ${q.options[q.correct]}</div>
  `;

  document.getElementById("submitBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "inline-block";

  // Update live score
  const prog = loadProgress();
  let score = 0;
  currentQuestions.forEach(qq => {
    if (prog[qq.id] && prog[qq.id].passed) score++;
  });
  document.getElementById("liveScore").textContent = `Score: ${score}/${currentQuestions.length}`;
}

function renderObjective(q, card, actions, record) {
  card.innerHTML = `
    <div class="q-number">Objective ${currentIndex + 1}</div>
    <div class="q-text">${q.question}</div>
    <textarea class="answer-input" id="userInput" placeholder="Type your answer here..." ${record ? "disabled" : ""}>${record ? (record.userResponse || "") : ""}</textarea>
    <div class="feedback" id="feedback"></div>
  `;

  actions.innerHTML = `
    <button class="btn secondary" onclick="prevQuestion()" ${currentIndex === 0 ? "disabled" : ""}>Previous</button>
    <button class="btn primary" id="submitBtn" onclick="submitObjective()" ${record ? 'style="display:none"' : ""}>Check Answer</button>
    <button class="btn secondary" id="revealBtn" onclick="revealObjective()" ${record ? 'style="display:none"' : ""}>Reveal Answer</button>
    <button class="btn secondary" id="nextBtn" onclick="nextQuestion()" style="${record ? "" : "display:none"}">Next →</button>
  `;

  if (record) {
    showObjectiveFeedback(q, record.correct, record.userResponse);
  }
}

function submitObjective() {
  const input = document.getElementById("userInput");
  userAnswer = input.value.trim();
  if (!userAnswer) {
    alert("Please type an answer first.");
    return;
  }

  const q = currentQuestions[currentIndex];
  // Simple keyword matching (case-insensitive)
  const lower = userAnswer.toLowerCase();
  const matched = q.keywords.some(kw => lower.includes(kw.toLowerCase()));
  const correct = matched;

  recordAttempt(q.id, "objective", correct, userAnswer, q.answer);
  showObjectiveFeedback(q, correct, userAnswer);
}

function revealObjective() {
  const q = currentQuestions[currentIndex];
  // Mark as attempted but not passed (revealed without answering)
  recordAttempt(q.id, "objective", false, "(Revealed without answering)", q.answer);
  showObjectiveFeedback(q, false, "(Revealed without answering)");
}

function showObjectiveFeedback(q, correct, userResp) {
  showingFeedback = true;
  const input = document.getElementById("userInput");
  if (input) {
    input.disabled = true;
    input.classList.add("disabled");
  }

  const fb = document.getElementById("feedback");
  fb.className = `feedback show ${correct ? "correct" : "info"}`;
  fb.innerHTML = `
    <strong>${correct ? "✓ Looks good!" : "Model Answer"}</strong>
    <div class="model-answer">${q.answer}</div>
    ${userResp && userResp !== "(Revealed without answering)" ? `<p style="margin-top:0.5rem;font-size:0.85rem;color:#5a6a7a"><em>Your answer:</em> ${userResp}</p>` : ""}
  `;

  document.getElementById("submitBtn").style.display = "none";
  document.getElementById("revealBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "inline-block";
}

function renderEssay(q, card, actions, record) {
  const sectionLabel = currentSection === "aoc" ? "AOC" : "High Prob";
  card.innerHTML = `
    <div class="q-number">${sectionLabel} ${currentIndex + 1}</div>
    <div class="q-text">${q.question}</div>
    <textarea class="answer-input" id="userInput" placeholder="Write your answer / key points here (optional)..." ${record ? "disabled" : ""}>${record ? (record.userResponse || "") : ""}</textarea>
    <div class="feedback" id="feedback"></div>
  `;

  actions.innerHTML = `
    <button class="btn secondary" onclick="prevQuestion()" ${currentIndex === 0 ? "disabled" : ""}>Previous</button>
    <button class="btn primary" id="submitBtn" onclick="submitEssay()" ${record ? 'style="display:none"' : ""}>Save & Reveal Model Answer</button>
    <button class="btn secondary" id="nextBtn" onclick="nextQuestion()" style="${record ? "" : "display:none"}">Next →</button>
  `;

  if (record) {
    showEssayFeedback(q, record.userResponse);
  }
}

function submitEssay() {
  const input = document.getElementById("userInput");
  userAnswer = input.value.trim() || "(No written answer)";
  const q = currentQuestions[currentIndex];

  // Essays are marked as "attempted" – we don't auto-grade long answers
  // We treat revealing the model as a successful review (passed = true for tracking)
  recordAttempt(q.id, currentSection, true, userAnswer, q.answer);
  showEssayFeedback(q, userAnswer);
}

function showEssayFeedback(q, userResp) {
  showingFeedback = true;
  const input = document.getElementById("userInput");
  if (input) {
    input.disabled = true;
    input.classList.add("disabled");
  }

  const fb = document.getElementById("feedback");
  fb.className = "feedback show info";
  fb.innerHTML = `
    <strong>Model Answer</strong>
    <div class="model-answer">${q.answer}</div>
    ${userResp && userResp !== "(No written answer)" ? `<p style="margin-top:0.6rem;font-size:0.85rem;color:#5a6a7a"><em>Your notes:</em> ${userResp}</p>` : ""}
  `;

  document.getElementById("submitBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "inline-block";
}

function nextQuestion() {
  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++;
    selectedOption = null;
    userAnswer = "";
    showingFeedback = false;
    renderQuestion();
  } else {
    // Finished section
    alert(`Section complete! Check your Dashboard or Review page for results.`);
    showHome();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    selectedOption = null;
    userAnswer = "";
    showingFeedback = false;
    renderQuestion();
  }
}

// ===== DASHBOARD =====
function renderDashboard() {
  const prog = loadProgress();
  const sections = [
    { key: "mcq", title: "Multiple Choice Questions", total: questionBank.mcq.length },
    { key: "objective", title: "Objective / Short Answers", total: questionBank.objective.length },
    { key: "highProb", title: "High Probability Questions", total: questionBank.highProb.length },
    { key: "aoc", title: "Area of Concentration", total: questionBank.aoc.length }
  ];

  let html = "";
  sections.forEach(sec => {
    const records = Object.values(prog).filter(r => r.section === sec.key);
    const attempted = records.length;
    const passed = records.filter(r => r.passed).length;
    const failed = attempted - passed;
    const pct = attempted ? Math.round((passed / attempted) * 100) : 0;

    html += `
      <div class="dash-card">
        <h3>${sec.title} <span style="font-size:0.85rem;color:#5a6a7a;font-weight:500">${attempted}/${sec.total}</span></h3>
        <div class="stat-row"><span class="stat-label">Attempted</span><span class="stat-value">${attempted}</span></div>
        <div class="stat-row"><span class="stat-label">Passed</span><span class="stat-value pass">${passed}</span></div>
        <div class="stat-row"><span class="stat-label">Failed / Revealed</span><span class="stat-value fail">${failed}</span></div>
        <div class="stat-row"><span class="stat-label">Success rate</span><span class="stat-value">${pct}%</span></div>
      </div>
    `;
  });

  // Overall
  const all = Object.values(prog);
  const totalAttempted = all.length;
  const totalPassed = all.filter(r => r.passed).length;
  const grandTotal = questionBank.mcq.length + questionBank.objective.length +
                     questionBank.highProb.length + questionBank.aoc.length;

  html = `
    <div class="dash-card" style="background:linear-gradient(135deg,#0b4f6c,#01baef);color:white">
      <h3 style="color:white">Overall Progress</h3>
      <div class="stat-row" style="border-color:rgba(255,255,255,0.2)"><span class="stat-label" style="color:rgba(255,255,255,0.85)">Total questions</span><span class="stat-value">${grandTotal}</span></div>
      <div class="stat-row" style="border-color:rgba(255,255,255,0.2)"><span class="stat-label" style="color:rgba(255,255,255,0.85)">Attempted</span><span class="stat-value">${totalAttempted}</span></div>
      <div class="stat-row" style="border-color:rgba(255,255,255,0.2)"><span class="stat-label" style="color:rgba(255,255,255,0.85)">Passed</span><span class="stat-value">${totalPassed}</span></div>
      <div class="stat-row" style="border:none"><span class="stat-label" style="color:rgba(255,255,255,0.85)">Completion</span><span class="stat-value">${Math.round((totalAttempted/grandTotal)*100)}%</span></div>
    </div>
  ` + html;

  document.getElementById("dashboardContent").innerHTML = html;
}

// ===== REVIEW =====
function filterReview(filter) {
  reviewFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  renderReview();
}

function renderReview() {
  const prog = loadProgress();
  const records = Object.entries(prog);

  if (records.length === 0) {
    document.getElementById("reviewList").innerHTML = `
      <div class="empty-state">
        <p>No attempts yet.</p>
        <p style="margin-top:0.5rem">Start a quiz section from the Home page.</p>
      </div>
    `;
    return;
  }

  // Build a lookup for question text
  const allQs = [
    ...questionBank.mcq,
    ...questionBank.objective,
    ...questionBank.highProb,
    ...questionBank.aoc
  ];
  const qMap = {};
  allQs.forEach(q => qMap[q.id] = q);

  let filtered = records;
  if (reviewFilter === "failed") {
    filtered = records.filter(([id, r]) => !r.passed);
  } else if (reviewFilter !== "all") {
    filtered = records.filter(([id, r]) => r.section === reviewFilter);
  }

  // Sort by last attempt (newest first)
  filtered.sort((a, b) => new Date(b[1].lastAttempt) - new Date(a[1].lastAttempt));

  if (filtered.length === 0) {
    document.getElementById("reviewList").innerHTML = `
      <div class="empty-state"><p>No matching attempts for this filter.</p></div>
    `;
    return;
  }

  let html = "";
  filtered.forEach(([id, r]) => {
    const q = qMap[id];
    const qText = q ? q.question : id;
    const statusClass = r.passed ? "passed" : "failed";
    const statusLabel = r.passed ? "Passed" : "Failed / Revealed";

    let yourAns = r.userResponse;
    if (r.section === "mcq" && q) {
      const letters = ["A", "B", "C", "D"];
      yourAns = `${letters[r.userResponse]}) ${q.options[r.userResponse]}`;
    }

    html += `
      <div class="review-item ${statusClass}">
        <div class="q">${qText}</div>
        <div class="meta">${r.section.toUpperCase()} · ${statusLabel} · Attempted ${r.attempts} time(s) · ${new Date(r.lastAttempt).toLocaleString()}</div>
        <div class="your-ans"><strong>Your response:</strong> ${yourAns || "—"}</div>
        <div class="model"><strong>Model answer:</strong><br>${r.modelAnswer || (q && q.answer) || "—"}</div>
      </div>
    `;
  });

  document.getElementById("reviewList").innerHTML = html;
}

// ===== PWA INSTALL PROMPT =====
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('installBtn');
  if (btn) btn.style.display = 'inline-flex';
});

function installApp() {
  if (!deferredPrompt) {
    alert('To install this app:\n\n• Android / Chrome: Menu (⋮) → "Install app" or "Add to Home screen"\n• iPhone / Safari: Tap Share → "Add to Home Screen"');
    return;
  }
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(() => {
    deferredPrompt = null;
    const btn = document.getElementById('installBtn');
    if (btn) btn.style.display = 'none';
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  updateBadges();
  updateQuickStats();
});
