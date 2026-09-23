// Renal Physiology Mock Exam - Question Bank
// Extracted & structured from MEDINTELECT Academy guide (Dr. Onwe Series)

const questionBank = {
  mcq: [
    {
      id: "mcq1",
      question: "Filtration of blood occurs in which part of the nephron?",
      options: ["Loop of Henle", "Bowman’s capsule", "Ureter", "Bladder"],
      correct: 1,
      explanation: "Filtration occurs across the glomerular capillaries into Bowman’s space."
    },
    {
      id: "mcq2",
      question: "The kidneys extend approximately from which vertebral levels?",
      options: ["T10–L1", "T12–L3", "L1–L5", "T8–T12"],
      correct: 1,
      explanation: "Normally T12 to L3; right kidney slightly lower due to the liver."
    },
    {
      id: "mcq3",
      question: "Which of the following is NOT a process of urine formation?",
      options: ["Filtration", "Reabsorption", "Secretion", "Micturition"],
      correct: 3,
      explanation: "Micturition is the act of voiding urine, not a step in its formation."
    },
    {
      id: "mcq4",
      question: "About what percentage of filtered water is reabsorbed in the PCT?",
      options: ["20–25%", "45–50%", "65–80%", "90–95%"],
      correct: 2,
      explanation: "Obligatory reabsorption of the majority of filtered water occurs in the PCT."
    },
    {
      id: "mcq5",
      question: "ADH acts primarily on which part of the nephron?",
      options: ["Proximal convoluted tubule", "Thin descending limb", "Distal convoluted tubule and collecting duct", "Glomerulus"],
      correct: 2,
      explanation: "ADH increases water permeability of DCT and collecting ducts via aquaporins."
    },
    {
      id: "mcq6",
      question: "Renin is secreted by:",
      options: ["Macula densa cells", "Juxtaglomerular cells", "Podocytes", "Mesangial cells"],
      correct: 1,
      explanation: "JG cells of the afferent arteriole secrete renin."
    },
    {
      id: "mcq7",
      question: "The renal pyramids are located in the:",
      options: ["Cortex", "Medulla", "Renal pelvis", "Hilum"],
      correct: 1,
      explanation: "The medulla consists of pyramidal masses called renal pyramids."
    },
    {
      id: "mcq8",
      question: "Which substance is completely reabsorbed in the PCT under normal conditions?",
      options: ["Urea", "Creatinine", "Glucose", "Inulin"],
      correct: 2,
      explanation: "Glucose and amino acids are completely reabsorbed in the PCT (provided plasma levels are normal)."
    },
    {
      id: "mcq9",
      question: "The net effect of the RAAS is to:",
      options: ["Decrease blood pressure and volume", "Increase blood pressure and volume", "Only increase K⁺ excretion", "Inhibit aldosterone"],
      correct: 1,
      explanation: "RAAS conserves Na⁺ and water and causes vasoconstriction, raising BP and ECF volume."
    },
    {
      id: "mcq10",
      question: "The filtration membrane does NOT include:",
      options: ["Fenestrated endothelium", "Basement membrane", "Podocyte slit pores", "Afferent arteriole smooth muscle"],
      correct: 3,
      explanation: "The filtration barrier consists of endothelium, basement membrane and podocyte filtration slits."
    },
    {
      id: "mcq11",
      question: "Pararenal fat is located:",
      options: ["Immediately outside the renal capsule", "Inside the renal sinus", "On the posterior lateral side of the kidney", "Between the cortex and medulla"],
      correct: 2,
      explanation: "Pararenal fat lies outside the renal fascia, posterolaterally."
    },
    {
      id: "mcq12",
      question: "Absence of ADH leads to:",
      options: ["Concentrated small-volume urine", "Dilute large-volume urine", "No urine formation", "Proteinuria"],
      correct: 1,
      explanation: "Without ADH the distal nephron is impermeable to water → water diuresis."
    }
  ],

  objective: [
    {
      id: "obj1",
      question: "What is the structural and functional unit of the kidney?",
      answer: "The nephron",
      keywords: ["nephron"]
    },
    {
      id: "obj2",
      question: "How many nephrons are approximately present in each kidney?",
      answer: "About 1 million",
      keywords: ["1 million", "million", "1,000,000"]
    },
    {
      id: "obj3",
      question: "Name the four major organs of the urinary system.",
      answer: "Kidneys, ureters, urinary bladder, urethra",
      keywords: ["kidney", "ureter", "bladder", "urethra"]
    },
    {
      id: "obj4",
      question: "Where are the kidneys located?",
      answer: "Retroperitoneally in the posterior abdomen, extending from T12 to L3",
      keywords: ["retroperitoneal", "T12", "L3", "posterior abdomen"]
    },
    {
      id: "obj5",
      question: "Why is the right kidney lower than the left?",
      answer: "Because of the weight/position of the liver",
      keywords: ["liver"]
    },
    {
      id: "obj6",
      question: "What is the renal hilum?",
      answer: "A deep medial depression that serves as the gateway for renal vessels, nerves and ureter",
      keywords: ["depression", "gateway", "vessels", "ureter", "medial"]
    },
    {
      id: "obj7",
      question: "Name the three processes of urine formation.",
      answer: "Glomerular filtration (ultrafiltration), tubular reabsorption, and tubular secretion",
      keywords: ["filtration", "reabsorption", "secretion"]
    },
    {
      id: "obj8",
      question: "Where does filtration occur?",
      answer: "In the renal corpuscle (glomerulus + Bowman’s capsule)",
      keywords: ["corpuscle", "glomerulus", "bowman"]
    },
    {
      id: "obj9",
      question: "What percentage of cardiac output goes to the kidneys?",
      answer: "Approximately 20–25%",
      keywords: ["20", "25", "20-25", "20%"]
    },
    {
      id: "obj10",
      question: "What is the daily urine output in a normal adult?",
      answer: "About 1–1.5 litres",
      keywords: ["1", "1.5", "litre", "liter"]
    },
    {
      id: "obj11",
      question: "Name the hormone that controls facultative water reabsorption.",
      answer: "Antidiuretic hormone (ADH / vasopressin)",
      keywords: ["adh", "vasopressin", "antidiuretic"]
    },
    {
      id: "obj12",
      question: "Which cells secrete renin?",
      answer: "Juxtaglomerular (JG) cells of the afferent arteriole",
      keywords: ["juxtaglomerular", "jg", "afferent"]
    },
    {
      id: "obj13",
      question: "What is the main site of obligatory water reabsorption?",
      answer: "Proximal convoluted tubule (PCT)",
      keywords: ["pct", "proximal"]
    },
    {
      id: "obj14",
      question: "Name the enzyme that converts angiotensin I to angiotensin II.",
      answer: "Angiotensin-converting enzyme (ACE)",
      keywords: ["ace", "angiotensin-converting"]
    },
    {
      id: "obj15",
      question: "What is Gerota’s fascia?",
      answer: "The renal fascia that covers the kidneys and adrenal glands",
      keywords: ["renal fascia", "gerota", "fascia"]
    },
    {
      id: "obj16",
      question: "What drains into a minor calyx?",
      answer: "The renal papilla (apex of a renal pyramid)",
      keywords: ["papilla", "pyramid"]
    },
    {
      id: "obj17",
      question: "List two hormones produced by the kidney.",
      answer: "Erythropoietin and renin (also activates vitamin D)",
      keywords: ["erythropoietin", "renin"]
    },
    {
      id: "obj18",
      question: "What is the effect of ADH on the collecting duct?",
      answer: "Increases water permeability by inserting aquaporin-2 channels, leading to water reabsorption",
      keywords: ["aquaporin", "permeability", "reabsorption", "water"]
    },
    {
      id: "obj19",
      question: "Where is the macula densa located?",
      answer: "In the distal convoluted tubule, adjacent to the afferent arteriole",
      keywords: ["dct", "distal", "afferent"]
    },
    {
      id: "obj20",
      question: "What type of epithelium lines the proximal convoluted tubule?",
      answer: "Simple cuboidal epithelium with brush border (microvilli)",
      keywords: ["cuboidal", "brush border", "microvilli"]
    }
  ],

  highProb: [
    {
      id: "hp1",
      question: "Describe the juxtaglomerular apparatus and its functions.",
      answer: "The juxtaglomerular apparatus (JGA) is a specialized structure at the vascular pole of the glomerulus where the afferent arteriole and distal convoluted tubule come into contact. It consists of: (1) Juxtaglomerular cells (modified smooth muscle cells of the afferent arteriole that secrete renin); (2) Macula densa (specialized epithelial cells of the DCT that sense NaCl concentration); (3) Extraglomerular mesangial (Goormaghtigh) cells. Functions: Regulation of renin release, tubuloglomerular feedback (adjusting afferent arteriolar tone based on distal NaCl delivery), and local control of glomerular filtration rate (GFR)."
    },
    {
      id: "hp2",
      question: "Briefly discuss the functions of the kidney (general).",
      answer: "1. Excretion of metabolic wastes and foreign substances. 2. Regulation of water and electrolyte balance. 3. Regulation of acid–base balance. 4. Regulation of arterial blood pressure (via RAAS and fluid volume). 5. Production of hormones: erythropoietin (stimulates RBC production), renin, and activation of vitamin D (1,25-dihydroxycholecalciferol). 6. Gluconeogenesis (especially in prolonged fasting)."
    },
    {
      id: "hp3",
      question: "Describe the process of glomerular filtration (ultrafiltration).",
      answer: "Glomerular filtration is the process by which blood is filtered as it passes through the glomerular capillaries. Filtration occurs across the filtration membrane (fenestrated endothelium, basement membrane, and slit pores of podocytes). Water, salts and small molecules are filtered into Bowman’s space, while blood cells and large proteins are retained. The net filtration pressure is determined by glomerular hydrostatic pressure minus (Bowman’s capsule hydrostatic pressure + oncotic pressure of plasma proteins). The resulting fluid is the glomerular filtrate (protein-free plasma)."
    },
    {
      id: "hp4",
      question: "Explain tubular reabsorption with emphasis on the proximal convoluted tubule.",
      answer: "Tubular reabsorption is the process of transporting important substances from the tubular filtrate back into the blood. In the PCT, about 65–80% of filtered water and Na⁺, virtually all glucose and amino acids, and most bicarbonate, phosphate and other solutes are reabsorbed (obligatory reabsorption). Mechanisms include active transport (Na⁺/K⁺-ATPase driven), secondary active co-transport, and passive diffusion. Electrolyte reabsorption also occurs in the thick ascending limb of the loop of Henle (~25% of Na⁺, K⁺, Cl⁻)."
    },
    {
      id: "hp5",
      question: "What is tubular secretion? Give examples.",
      answer: "Tubular secretion is the process by which unwanted substances are moved from the blood (peritubular capillaries) into the tubular lumen. It occurs mainly in the PCT and DCT. Examples: secretion of H⁺, K⁺, ammonia, organic acids and bases, urea, uric acid, and certain drugs. Secretion helps remove toxins and contributes to acid–base and potassium balance."
    },
    {
      id: "hp6",
      question: "Outline the path of urine from formation to excretion.",
      answer: "Filtrate formed in Bowman’s capsule → PCT → Loop of Henle → DCT → Collecting duct → Renal papilla → Minor calyx → Major calyx → Renal pelvis → Ureter → Urinary bladder (storage) → Urethra (voiding)."
    },
    {
      id: "hp7",
      question: "Differentiate between obligatory and facultative reabsorption of water.",
      answer: "Obligatory reabsorption (~65–80% of filtered water) occurs mainly in the PCT and is independent of ADH; it follows solute reabsorption. Facultative reabsorption occurs in the DCT and collecting ducts and is controlled by ADH (via insertion of aquaporin-2 channels). Presence of ADH → concentrated urine; absence → dilute large-volume urine."
    },
    {
      id: "hp8",
      question: "List the layers of the filtration membrane.",
      answer: "1. Fenestrated endothelium of glomerular capillaries. 2. Glomerular basement membrane (fused basal laminae). 3. Slit pores (filtration slits) formed by the foot processes (pedicels) of podocytes (visceral epithelium of Bowman’s capsule)."
    }
  ],

  aoc: [
    {
      id: "aoc1",
      question: "Discuss the physiological anatomy of the kidney",
      answer: "The kidneys are paired, reddish-brown, bean-shaped organs located bilaterally in the posterior abdomen, retroperitoneally (behind the peritoneum). They normally extend from T12 to L3, with the right kidney slightly lower than the left due to the liver. The adrenal (suprarenal) glands sit on the superior poles.\n\nExternal coverings (from inner to outer):\n• Tough fibrous renal capsule\n• Perirenal (perinephric) fat\n• Renal fascia (Gerota’s fascia), which also encloses the adrenal glands\n• Pararenal fat (posterolateral)\n\nInternal structure / functional anatomy: The renal parenchyma consists of an outer cortex and inner medulla. Cortex extensions divide the medulla into triangular renal pyramids. The apex of each pyramid is the renal papilla, which drains into a minor calyx. Several minor calyces unite to form major calyces, which open into the funnel-shaped renal pelvis. Urine then passes into the ureter.\n\nThe medial border has a deep depression, the renal hilum, which transmits the renal artery, renal vein, nerves, lymphatics and ureter. Blood supply is via renal arteries (direct branches of the abdominal aorta) and drainage via renal veins into the inferior vena cava."
    },
    {
      id: "aoc2",
      question: "List the functions of the kidney mediated through urine formation",
      answer: "Through glomerular filtration, tubular reabsorption and tubular secretion the kidney:\n• Removes metabolic wastes and toxins (urea, uric acid, creatinine, ammonia, etc.)\n• Regulates water balance and conserves or excretes water as needed\n• Maintains electrolyte balance (Na⁺, K⁺, Ca²⁺, Cl⁻, etc.)\n• Maintains acid–base balance (by secreting H⁺ and reabsorbing/generating HCO₃⁻)\n• Excretes excess or unwanted substances while reclaiming essential ones"
    },
    {
      id: "aoc3",
      question: "Discuss the physiological anatomy of the nephron(s)",
      answer: "The nephron is the structural and functional unit of the kidney. Each kidney contains approximately 1 million nephrons.\n\nComponents:\n1. Renal corpuscle (in the cortex):\n• Glomerulus – a tuft of capillaries supplied by an afferent arteriole and drained by an efferent arteriole.\n• Bowman’s (glomerular) capsule – a double-walled cup surrounding the glomerulus; the space between the layers receives the filtrate.\n2. Renal tubule:\n• Proximal convoluted tubule (PCT) – highly coiled, in the cortex; site of bulk (obligatory) reabsorption.\n• Loop of Henle – descends into the medulla (thin descending limb, thin ascending limb, thick ascending limb) and returns toward the cortex.\n• Distal convoluted tubule (DCT) – in the cortex.\n• Collecting duct – receives fluid from several DCTs; runs through the medulla and opens at the renal papilla into a minor calyx.\n\nBlood path: Renal artery → afferent arteriole → glomerulus → efferent arteriole → peritubular capillaries / vasa recta → renal vein.\nUrine path: Filtrate in Bowman’s capsule → PCT → Loop of Henle → DCT → Collecting duct → Minor calyx → Major calyx → Renal pelvis → Ureter → Bladder."
    },
    {
      id: "aoc4",
      question: "Discuss the formation of dilute large volume urine",
      answer: "During urine formation, about 65–80% of filtered water is reabsorbed obligately in the PCT (and some in the loop of Henle). Reabsorption of the remaining water in the DCT and collecting duct is facultative and depends on:\n• Plasma osmolarity\n• Permeability of the DCT / collecting-duct epithelium (controlled by ADH)\n\nIn the absence of antidiuretic hormone (ADH / vasopressin) — e.g., when plasma osmolarity is low (water excess) — the DCT and collecting ducts remain impermeable to water (aquaporin-2 channels are not inserted into the apical membrane). Consequently:\n• Water is not reabsorbed in the distal nephron\n• A large volume of dilute (hypo-osmotic) urine is excreted (water diuresis)\n\nWhen ADH is present, aquaporins open, water is reabsorbed, and concentrated urine of smaller volume is formed. Absence or inhibition of ADH therefore leads to production and voiding of dilute large-volume urine."
    },
    {
      id: "aoc5",
      question: "Write an essay on the Renin–Angiotensin–Aldosterone System (RAAS)",
      answer: "The Renin–Angiotensin–Aldosterone System (RAAS) is a hormonal cascade that regulates blood pressure, extracellular fluid volume and sodium balance.\n\nTrigger: A fall in renal perfusion pressure, decreased NaCl delivery to the macula densa, or increased sympathetic activity stimulates the juxtaglomerular (JG) cells of the afferent arteriole to release the enzyme renin.\n\nCascade:\n1. Renin cleaves circulating angiotensinogen (produced by the liver) → angiotensin I.\n2. Angiotensin-converting enzyme (ACE), mainly in lung endothelium, converts angiotensin I → angiotensin II.\n3. Angiotensin II acts via AT₁ receptors to:\n• Constrict arterioles (especially efferent) → raise glomerular filtration pressure and systemic BP\n• Stimulate the adrenal cortex to secrete aldosterone\n• Stimulate release of ADH from the posterior pituitary\n• Directly increase proximal tubular Na⁺ reabsorption and thirst\n\nAldosterone acts on the principal cells of the late DCT and collecting duct to increase Na⁺ reabsorption (via ENaC and Na⁺/K⁺-ATPase), increase K⁺ and H⁺ secretion, and thereby expand extracellular fluid volume.\n\nOverall effects: Restoration of blood pressure and volume, conservation of sodium, and maintenance of potassium and acid–base balance. Negative feedback (restored pressure/volume and angiotensin II itself) inhibits further renin release. Pharmacologic interruption (ACE inhibitors, ARBs, aldosterone antagonists) is used clinically to treat hypertension and heart failure."
    }
  ]
};
