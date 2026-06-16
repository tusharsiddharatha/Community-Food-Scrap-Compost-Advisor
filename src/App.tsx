import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Play, 
  BookOpen, 
  CheckCircle, 
  Copy, 
  Download, 
  RefreshCw, 
  Compass, 
  Leaf, 
  Layers,
  Heart,
  Droplet,
  Zap,
  Globe,
  Trash2,
  AlertTriangle,
  Lightbulb,
  Workflow,
  Eye,
  Lock,
  MessageSquare
} from 'lucide-react';

// SDG configuration
interface SDG {
  id: number;
  number: string;
  title: string;
  colorClass: string;
  bgGradient: string;
  icon: React.ReactNode;
  description: string;
  presets: {
    title: string;
    observations: string;
    targetAudience: string;
    aiApproach: string;
    systemPrompt: string;
    knowledgeBase: string;
  }[];
}

const SDGS: SDG[] = [
  {
    id: 3,
    number: "SDG 3",
    title: "Good Health and Well-being",
    colorClass: "from-emerald-600 to-teal-500",
    bgGradient: "bg-emerald-50 border-emerald-200 text-emerald-900",
    icon: <Heart className="w-6 h-6 text-emerald-600" id="sdg-icon-3" />,
    description: "Ensure healthy lives and promote well-being for all at all ages.",
    presets: [
      {
        title: "Community Heatwave Health Advisor",
        observations: "Extreme summer temperatures are causing heat strokes and dehydration among outdoor workers, street vendors, and children in local urban settlements who lack access to smart warning systems.",
        targetAudience: "Local outdoor workers, vendors, and community clinics.",
        aiApproach: "Predictive Alert and Climate Health Chatbot",
        systemPrompt: "You are a Heatwave Health Advisor AI system. Your goal is to provide protective advice based on local temperatures. Advise on water standards, symptoms of exhaustion (fatigue, dark urine, cramps, heavy sweating), and recommend localized remedies (ORS solutions, cooling towels, timing shade rest). Keep advice extremely simple, practical, and highly empathetic.",
        knowledgeBase: "National Heat Stress Index Guidelines:\n- Heat levels above 38°C (100°F) present high heat exhaustion risk.\n- Outdoor workers must drink 1 liter of fresh water every hour, regardless of activity.\n- Core symptom watch: Heavy sweating, cold/pale skin, muscle cramps, dizziness.\n- Immediate response: Move to shade, apply wet cloths, sip cool water slowly."
      }
    ]
  },
  {
    id: 6,
    number: "SDG 6",
    title: "Clean Water and Sanitation",
    colorClass: "from-blue-600 to-sky-500",
    bgGradient: "bg-blue-50 border-blue-200 text-blue-900",
    icon: <Droplet className="w-6 h-6 text-blue-600" id="sdg-icon-6" />,
    description: "Ensure availability and sustainable management of water and sanitation for all.",
    presets: [
      {
        title: "Wastewater Leak Detector & Safety Advisor",
        observations: "Open public sewage drains leak during rains, polluting drinking water reservoirs in our college neighborhood and raising safety hazards.",
        targetAudience: "Campus sanitation crews and local residents.",
        aiApproach: "Community Safety Advisor & Identification System",
        systemPrompt: "You are the Wastewater Safety Advisor AI. Help community residents identify water quality issues, recognize safe/unsafe water conditions (turbidity, smell, bio-indicators like green algae), and outline rapid sand filter methods or storage guidelines. Always encourage reporting issues directly to municipal contacts.",
        knowledgeBase: "Neighborhood Water Quality Standards:\n- Unsafe indicators: Fecal or chemical odors, orange-brown rust tint (high iron), deep gray color (organic sewage).\n- Emergency safety steps: Boil water for at least 3 minutes, or treat using WHO-approved Chlorine drops.\n- Sand filter specs: Top layer fine sand (40cm), middle layer charcoal (10cm), bottom layer gravel (20cm) for manual pre-treatment."
      }
    ]
  },
  {
    id: 7,
    number: "SDG 7",
    title: "Affordable and Clean Energy",
    colorClass: "from-amber-600 to-yellow-500",
    bgGradient: "bg-amber-50 border-amber-200 text-amber-900",
    icon: <Zap className="w-6 h-6 text-amber-600" id="sdg-icon-7" />,
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    presets: [
      {
        title: "Vampire Power Saver Companion",
        observations: "Idle campus lab computers, projector systems, and heavy cooling units are left switched on continuously, wasting massive amounts of vampire energy overnight.",
        targetAudience: "School students, IT staff, and facilities coordinators.",
        aiApproach: "Energy Consumption Forecasting & Behavioral Guide",
        systemPrompt: "You are the Vampire Power Saver AI. Your mission is to provide micro-strategies for minimizing passive standby energy waste. Analyze standard home/school electronics wattage and offer immediate instructions on power scheduling, smart power strip use, or lab shutdown routines. Use energy metrics dynamically to illustrate real carbon offsets.",
        knowledgeBase: "Lab Power Audit Metrics:\n- Passive standby draw: Office PC state (15W), Server rig standby (45W), TV & audio systems in standby (12W).\n- Annual baseline waste: Leaving 50 lab PCs in deep standby costs roughly 6,560 kWh, equivalent to 4.6 metric tons of CO2.\n- Recommended protocol: Enable automated BIOS wake-on-LAN and auto-shutdown at 7:00 PM."
      }
    ]
  },
  {
    id: 11,
    number: "SDG 11",
    title: "Sustainable Cities and Communities",
    colorClass: "from-orange-600 to-amber-500",
    bgGradient: "bg-orange-50 border-orange-200 text-orange-900",
    icon: <Building2 className="w-6 h-6 text-orange-600" id="sdg-icon-11" />,
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    presets: [
      {
        title: "Eco-Transport Route Planner",
        observations: "Heavy single-occupant motor travel on our city access roads produces toxic peak-hour congestion, air pollution, and safe bike path gaps.",
        targetAudience: "Urban campus commuters, local shoppers, and municipal planners.",
        aiApproach: "Sustainable Active Commute Assistant",
        systemPrompt: "You are the Eco-Transport Route Planner AI. Guide commuters on integrating low-carbon lanes (walking paths, bicycle routes, shared electric shuttles) into their daily route planner. Focus on calculating carbon reductions in grams of CO2 and emphasize road safety and weather convenience.",
        knowledgeBase: "City Green Transit Emission Benchmarks:\n- Single gasoline car: 192g CO2 per kilometer traveled.\n- Public Diesel Bus: 68g CO2 per passenger kilometer.\n- Electric Metro: 14g CO2 per passenger kilometer.\n- Bicycle/Walking: 0g CO2.\n- Safety warning: Wear helmet and high-visibility jackets when active temperature exceeds 33°C."
      }
    ]
  },
  {
    id: 12,
    number: "SDG 12",
    title: "Responsible Consumption and Production",
    colorClass: "from-yellow-600 to-lime-500",
    bgGradient: "bg-yellow-50 border-yellow-200 text-yellow-900",
    icon: <Layers className="w-6 h-6 text-yellow-600" id="sdg-icon-12" />,
    description: "Ensure sustainable consumption and production patterns.",
    presets: [
      {
        title: "Community Food Scrap Compost Advisor",
        observations: "Local vegetable dealers and households dump large amounts of leftover food waste straight into household municipal garbage bins, contributing directly to toxic landfill methane.",
        targetAudience: "Local residential societies, cooks, and municipal waste workers.",
        aiApproach: "AI Waste Segregation & Bio-Composting Guide",
        systemPrompt: "You are the Organic Waste Compost Advisor. Teach local households how to segregate wet organic wastes. Categorize user items into Greens (nitrogen-rich food scraps, wet grounds) vs Browns (carbon-rich paper, dry leaves), and alert them on items that ruin the compost (meat scraps, dairy, chemical treated wood). Provide simple Troubleshooting steps for compost odors.",
        knowledgeBase: "Home Backyard Composting Rules:\n- Optimum carbon-to-nitrogen ratio is 30:1 (roughly 3 parts dry Browns to 1 part wet Greens).\n- Allowed items: Vegetable peels, clean tea bags, eggshells, cardboard fragments, dry grass.\n- Forbidden items: Meat bones, fats/oils, dairy, animal feces, plastic polymers (avoid heavy heavy contamination).\n- Fix for rotten eggs smell: The pile is too wet; immediately mix in dry leaves or newspapers to restore aeration."
      }
    ]
  },
  {
    id: 13,
    number: "SDG 13",
    title: "Climate Action",
    colorClass: "from-teal-600 to-emerald-500",
    bgGradient: "bg-teal-50 border-teal-200 text-teal-900",
    icon: <Globe className="w-6 h-6 text-teal-600" id="sdg-icon-13" />,
    description: "Take urgent action to combat climate change and its impacts.",
    presets: [
      {
        title: "Flash Flood Prep & Mitigation System",
        observations: "Irregular monsoon cycles cause flash water accumulation in the low-lying sectors of our town, stranding citizens without real-time emergency mitigation checklists.",
        targetAudience: "Low-lying settlement residents and disaster preparedness groups.",
        aiApproach: "Emergency Mitigation Advisor & Monitoring Assistant",
        systemPrompt: "You are the Flood Safety Responder AI. Your objective is to guide citizens in fast water defense. Outline steps to secure residential units (sandbag placements, critical utilities cutoff, document waterproofing) and recommend safe exit vectors. Maintain a calm, high-alert, precise tone.",
        knowledgeBase: "Flash Flood Protection Checklist:\n- Sandbag defense: Arrange bags in staggered brick formats, overlapping joints, and pack firmly down.\n- Electrical risk mitigation: Never step into water if outlets or breaker boxes are submerged. Shut main switches before water line arrives.\n- Safe routing: Just 15cm (6 inches) of moving water can sweep a human off feet. Avoid underpasses and flowing storm streams."
      }
    ]
  },
  {
    id: 15,
    number: "SDG 15",
    title: "Life on Land",
    colorClass: "from-green-600 to-lime-600",
    bgGradient: "bg-green-50 border-green-200 text-green-900",
    icon: <Leaf className="w-6 h-6 text-green-600" id="sdg-icon-15" />,
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems.",
    presets: [
      {
        title: "Soil Erosion Risk Advisory System",
        observations: "Farming fields on nearby sloped slopes lose fertile topsoil during torrential rains, causing sediment mudslides and lower land quality.",
        targetAudience: "Local hillside vegetable farmers and land stewards.",
        aiApproach: "Eco-Erosion advisory assistant",
        systemPrompt: "You are the Topsoil Preservation Expert AI. Educate farming communities on erosion controls. Guide users on slope stabilization, terracing, contour farming, cover crop planting (vetiver grass, legumes), and natural rock dams. Keep advice practical, affordable, and actionable with zero costly synthetic tools.",
        knowledgeBase: "Sloped Slope Soil Best Practices:\n- Slopes higher than 15% gradient require physical terracing or continuous stone barriers.\n- Cover crops: Vetiver grass roots extend up to 3 meters deep, binding soil particles firmly.\n- Contour bunding: Construct physical mud ridges along the natural level contour lines to slow run-off. Avoid farming straight up-and-down slopes."
      }
    ]
  }
];

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'frame' | 'brainstorm' | 'prototype' | 'responsible' | 'presentation'>('frame');

  // Multi-user/Project Metadata
  const [studentNames, setStudentNames] = useState('Khushi Choudhary');
  const [collegeName, setCollegeName] = useState('VES Institute of Technology');

  // Core Project State
  const [selectedSdg, setSelectedSdg] = useState<SDG>(SDGS[4]); // Fallback to SDG 12
  const [observations, setObservations] = useState(SDGS[4].presets[0].observations);
  const [targetAudience, setTargetAudience] = useState(SDGS[4].presets[0].targetAudience);
  const [projectTitle, setProjectTitle] = useState(SDGS[4].presets[0].title);

  // Gemini Generated / Structured Concept
  const [conceptGenerating, setConceptGenerating] = useState(false);
  const [conceptData, setConceptData] = useState<{
    projectTitle: string;
    empathize: { userPains: string[]; currentGaps: string };
    define: { problemStatement: string };
    ideate: { aiApproach: string; aiJustification: string };
  } | null>(null);

  // AI Sandbox Prototyper Configuration
  const [aiType, setAiType] = useState('AI Waste Segregation & Bio-Composting Guide');
  const [systemPrompt, setSystemPrompt] = useState(SDGS[4].presets[0].systemPrompt);
  const [knowledgeBase, setKnowledgeBase] = useState(SDGS[4].presets[0].knowledgeBase);

  // Playground Chat State
  const [testMessage, setTestMessage] = useState('Can I put orange peels and clean cardboard in my food compost pile? It smells a bit sour.');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'ai'; text: string; id: number }[]>([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your community composting advisor prototype. Ask me anything to test my prompt settings and local RAG guidelines.'
    }
  ]);
  const [simulating, setSimulating] = useState(false);

  // Responsible AI State
  const [assessmentGenerating, setAssessmentGenerating] = useState(false);
  const [assessmentData, setAssessmentData] = useState<{
    fairness: { goal: string; checklists: string[] };
    transparency: { goal: string; checklists: string[] };
    ethics: { goal: string; checklists: string[] };
    privacy: { goal: string; checklists: string[] };
    expectedImpact: { environmental: string; social: string };
  } | null>(null);

  // Formatted Slide Deck states
  const [copiedSlide, setCopiedSlide] = useState<number | null>(null);

  // Prepopulate form when SDG card is clicked
  const handleSelectSdg = (sdg: SDG) => {
    setSelectedSdg(sdg);
    const preset = sdg.presets[0];
    setObservations(preset.observations);
    setTargetAudience(preset.targetAudience);
    setProjectTitle(preset.title);
    setAiType(preset.aiApproach);
    setSystemPrompt(preset.systemPrompt);
    setKnowledgeBase(preset.knowledgeBase);
    // Clear dynamic states to prompt regeneration
    setConceptData(null);
    setAssessmentData(null);
    setChatLog([
      {
        id: Date.now(),
        sender: 'ai',
        text: `Hello! I am your simulated ${preset.aiApproach} AI system. Ask me anything to test my rules and RAG guidelines on ${sdg.title}.`
      }
    ]);
  };

  // Helper template filler
  const applyPreset = () => {
    const preset = selectedSdg.presets[0];
    setObservations(preset.observations);
    setTargetAudience(preset.targetAudience);
    setProjectTitle(preset.title);
    setAiType(preset.aiApproach);
    setSystemPrompt(preset.systemPrompt);
    setKnowledgeBase(preset.knowledgeBase);
  };

  // Call /api/project/generate-concept
  const generateDesignThinkingConcept = async () => {
    setConceptGenerating(true);
    try {
      const response = await fetch('/api/project/generate-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sdg: `${selectedSdg.number}: ${selectedSdg.title}`,
          observations,
          targetAudience
        })
      });
      if (!response.ok) {
        throw new Error('Concept API failure');
      }
      const data = await response.json();
      setConceptData(data);
      if (data.projectTitle) {
        setProjectTitle(data.projectTitle);
      }
      if (data.ideate?.aiApproach) {
        setAiType(data.ideate.aiApproach);
      }
      // Auto transition to design thinking view
      setActiveTab('brainstorm');
    } catch (e) {
      console.error(e);
      // Fallback local mock generate if API fails
      setConceptData({
        projectTitle: projectTitle ? projectTitle : `${selectedSdg.title} Smart AI Solution`,
        empathize: {
          userPains: [
            "Users face difficulty knowing if their parameters indicate safe practices.",
            "Local stakeholders lack systematic digital checklists or prompt notifications.",
            "People make decisions blindly without historical contextual measurements."
          ],
          currentGaps: `Manual reporting requires expert visits, which take time. Standard web search provides generic static articles not applicable to our specific neighborhood boundaries.`
        },
        define: {
          problemStatement: `How might we use AI to analyze local observations so that ${targetAudience || 'the surrounding community'} can become more sustainable?`
        },
        ideate: {
          aiApproach: aiType,
          aiJustification: `AI speeds up complex decision guidance dramatically by matching contextual issues instantly against safety rules templates, allowing untrained personnel to carry out mitigation safely.`
        }
      });
      setActiveTab('brainstorm');
    } finally {
      setConceptGenerating(false);
    }
  };

  // Call /api/project/simulate-ai
  const sendTestChatMessage = async () => {
    if (!testMessage.trim()) return;
    const userMsg = testMessage;
    const userLogItem = { id: Date.now(), sender: 'user' as const, text: userMsg };
    setChatLog(prev => [...prev, userLogItem]);
    setTestMessage('');
    setSimulating(true);

    try {
      const response = await fetch('/api/project/simulate-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt,
          testMessage: userMsg,
          knowledgeBase,
          aiType
        })
      });
      if (!response.ok) {
        throw new Error('Simulation API failure');
      }
      const data = await response.json();
      setChatLog(prev => [...prev, {
        id: Date.now(),
        sender: 'ai',
        text: data.output
      }]);
    } catch (e) {
      console.error(e);
      // Mocked local failure-safe response
      setChatLog(prev => [...prev, {
        id: Date.now(),
        sender: 'ai',
        text: `[Prototype Console Output]: Stately response on behalf of your AI configuration: Yes, based on the uploaded safety rules context, item composting is allowed! Remember to avoid oils and balance carbon dry browns high. Adjust your system instruction to customize this behavior.`
      }]);
    } finally {
      setSimulating(false);
    }
  };

  // Call /api/project/generate-assessment
  const runResponsibleAssessor = async () => {
    setAssessmentGenerating(true);
    try {
      const response = await fetch('/api/project/generate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectTitle: conceptData?.projectTitle || projectTitle,
          sdg: `${selectedSdg.number}: ${selectedSdg.title}`,
          problemStatement: conceptData?.define?.problemStatement || `How might we use AI to manage local issues?`,
          aiApproach: conceptData?.ideate?.aiApproach || aiType
        })
      });
      if (!response.ok) {
        throw new Error('Assessment API error');
      }
      const data = await response.json();
      setAssessmentData(data);
      setActiveTab('responsible');
    } catch (e) {
      console.error(e);
      // Fallback local mock
      setAssessmentData({
        fairness: {
          goal: "Avoid language exclusion and resource gaps for elderly residents.",
          checklists: [
            "Ensure system instructions use natural local vernacular and literal non-jargon vocabulary.",
            "Account for users who may not have permanent cellular datasets using lightweight off-line text-based guides."
          ]
        },
        transparency: {
          goal: "Users must understand exactly what rules or data the advisor matches against, rather than taking raw output blind.",
          checklists: [
            "Clearly present the source of the reference documents (e.g., local municipality standards) below the chat console.",
            "Display helpful warning flags when inputs are outside the reference guidelines boundaries."
          ]
        },
        ethics: {
          goal: "Prevent unsafe operations regarding fire risks, chemical contamination, or water toxicity due to AI hallucinations.",
          checklists: [
            "Implement a mandatory health & civil expert disclaimer on all generated prompts.",
            "Prevent the AI from giving medical remedies, instead routing instantly to local hospital contacts."
          ]
        },
        privacy: {
          goal: "Prevent users from leaks containing exact home values or GPS coordinates.",
          checklists: [
            "Do not demand exact address inputs; use generalized neighborhood or broad postal code categories instead.",
            "Implement text filter logic to strip name mentions on user messages prior to system evaluation."
          ]
        },
        expectedImpact: {
          environmental: "Diverts approximately 20-30kg of waste waste from regional landfill pits monthly per household.",
          social: "Empowers local street and family growers to produce pesticide-free fertilizer locally."
        }
      });
      setActiveTab('responsible');
    } finally {
      setAssessmentGenerating(false);
    }
  };

  const copySlideText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSlide(index);
    setTimeout(() => setCopiedSlide(null), 2000);
  };

  // Compile full Markdown of the Project PPT Content
  const compileFullMarkdown = () => {
    return `# 1M1B AI for Sustainability Internship Project Submission
## Project: ${conceptData?.projectTitle || projectTitle || selectedSdg.presets[0].title}

### 1. Cover Details
- **Student Name(s)**: ${studentNames}
- **College/Affiliation**: ${collegeName}
- **Primary SDG**: ${selectedSdg.number} — ${selectedSdg.title}
- **Partnership**: IBM SkillsBuild & AICTE AI + Sustainability Internship Project

### 2. Problem Statement
- **Observations**: ${observations}
- **Target Audience / Users Benefitting**: ${targetAudience}
- **Empathy Map - User Pains**: ${conceptData?.empathize?.userPains.join(', ') || 'Lack of guidance, physical access gaps, complex guidelines.'}
- **Empathy Map - Gaps**: ${conceptData?.empathize?.currentGaps || 'No rapid custom verification existed previously.'}
- **Formulated Problem Statement**: ${conceptData?.define?.problemStatement || `How might we use AI to assist so that local operations become sustainable?`}

### 3. AI Prototyping Sandbox Overview
- **AI Solution Classification**: ${aiType}
- **Justification for AI**: ${conceptData?.ideate?.aiJustification || 'Speeds up contextual responses safely without requiring physical manual labor.'}
- **AI System Prompt Logic**:
\`\`\`
${systemPrompt}
\`\`\`
- **Knowledge Base (RAG Rules)**:
\`\`\`
${knowledgeBase}
\`\`\`

### 4. Responsible AI Assessment
- **Fairness Framework**: ${assessmentData?.fairness?.goal || 'Ensured localized non-jargon responses.'}
- **Transparency Framework**: ${assessmentData?.transparency?.goal || 'Displayed reference citations explicitly below responses.'}
- **Ethical Integrity Safeguards**: ${assessmentData?.ethics?.goal || 'Restricted non-verified emergency remedies.'}
- **Core Privacy Rules**: ${assessmentData?.privacy?.goal || 'Strips all geo-markers and names.'}

### 5. Expected Sustainability Impact
- **Environmental Reductions**: ${assessmentData?.expectedImpact?.environmental || 'Saves resources and limits toxic carbon elements of local wastes.'}
- **Social Upgrades**: ${assessmentData?.expectedImpact?.social || 'Fosters safety metrics, mutual aid awareness, and cleaner neighborhoods.'}`;
  };

  const downloadSubmissionJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      author: { studentNames, collegeName },
      sdg: selectedSdg.number,
      sdgTitle: selectedSdg.title,
      projectTitle: conceptData?.projectTitle || projectTitle,
      observations,
      targetAudience,
      problemStatement: conceptData?.define?.problemStatement,
      designThinking: conceptData,
      aiPrototype: { aiType, systemPrompt, knowledgeBase },
      responsibleAi: assessmentData
    }, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${(conceptData?.projectTitle || projectTitle).replace(/\s+/g, '_')}_1M1B_Project.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950" id="main-container">
      {/* Upper Navigation/Banner */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 py-3" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
              <Leaf className="w-6 h-6 animate-pulse" id="header-logo" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wider uppercase bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  1M1B Virtual Internship Workspace
                </span>
                <span className="text-xs font-semibold tracking-wider uppercase bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 hidden sm:inline">
                  IBM SkillsBuild & AICTE
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2 mt-1">
                AI + Sustainability Project Builder
              </h1>
            </div>
          </div>

          {/* Student metadata box */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900/90 border border-slate-800 rounded-lg p-2 text-xs text-slate-350">
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
              <span>Student: <input className="bg-transparent text-white font-medium border-b border-transparent focus:border-emerald-400 outline-none w-28 text-xs transition" value={studentNames} onChange={e => setStudentNames(e.target.value)} /></span>
              <span>College: <input className="bg-transparent text-white font-medium border-b border-transparent focus:border-emerald-400 outline-none w-44 text-xs transition animate-none" value={collegeName} onChange={e => setCollegeName(e.target.value)} /></span>
            </div>
          </div>
        </div>
      </header>

      {/* Steps Track Indicator Bar */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800" id="progress-container">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4 custom-scrollbar text-xs">
          <button 
            id="nav-step-1"
            onClick={() => setActiveTab('frame')}
            className={`flex items-center gap-2 shrink-0 py-1.5 px-3 rounded-md transition ${activeTab === 'frame' ? 'bg-emerald-500/15 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">1</span>
            SDG Selection & Gaps
          </button>
          
          <ArrowRight className="w-4 h-4 text-slate-700 shrink-0" />

          <button 
            id="nav-step-2"
            onClick={() => {
              if (!conceptData) generateDesignThinkingConcept();
              else setActiveTab('brainstorm');
            }}
            className={`flex items-center gap-2 shrink-0 py-1.5 px-3 rounded-md transition ${activeTab === 'brainstorm' ? 'bg-emerald-500/15 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">2</span>
            Design Thinking
            {conceptData && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 ml-0.5" />}
          </button>

          <ArrowRight className="w-4 h-4 text-slate-700 shrink-0" />

          <button 
            id="nav-step-3"
            onClick={() => setActiveTab('prototype')}
            className={`flex items-center gap-2 shrink-0 py-1.5 px-3 rounded-md transition ${activeTab === 'prototype' ? 'bg-emerald-500/15 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">3</span>
            Prototyper Sandbox
          </button>

          <ArrowRight className="w-4 h-4 text-slate-700 shrink-0" />

          <button 
            id="nav-step-4"
            onClick={() => {
              if (!assessmentData) runResponsibleAssessor();
              else setActiveTab('responsible');
            }}
            className={`flex items-center gap-2 shrink-0 py-1.5 px-3 rounded-md transition ${activeTab === 'responsible' ? 'bg-emerald-500/15 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">4</span>
            Responsible AI
            {assessmentData && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 ml-0.5" />}
          </button>

          <ArrowRight className="w-4 h-4 text-slate-700 shrink-0" />

          <button 
            id="nav-step-5"
            onClick={() => setActiveTab('presentation')}
            className={`flex items-center gap-2 shrink-0 py-1.5 px-3 rounded-md transition ${activeTab === 'presentation' ? 'bg-emerald-500/15 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">5</span>
            Export Slide Deck
          </button>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto" id="workspace-main">
        
        {/* TAB 1: SDG framing */}
        {activeTab === 'frame' && (
          <div className="space-y-6" id="view-step-1">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Step 1: Empathize & Frame
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  Frame Your AI + Sustainability Project
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Start from your surroundings! Pick any UN Sustainable Development Goal that reflects an issue you notice on your local campus, village, or town. We will map this goal to a responsive, custom AI-powered micro-solution.
                </p>
              </div>
              <button 
                id="btn-use-preset"
                onClick={applyPreset}
                className="flex items-center gap-2 text-xs font-medium text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 border border-emerald-500/25 px-4 py-2.5 rounded-lg transition shrink-0"
              >
                <Compass className="w-4 h-4" /> Load Current Preset
              </button>
            </div>

            {/* SDG Cards Grid Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
                1. Select Target Sustainable Development Goal
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="sdg-grid">
                {SDGS.map((sdg) => {
                  const isSelected = selectedSdg.id === sdg.id;
                  return (
                    <div 
                      key={sdg.id}
                      id={`sdg-card-${sdg.id}`}
                      onClick={() => handleSelectSdg(sdg)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 flex flex-col justify-between h-44 group relative overflow-hidden text-left ${
                        isSelected 
                          ? 'bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/30' 
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      {/* Accent glowing light */}
                      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br ${sdg.colorClass} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-300`} />
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                            isSelected ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-900 text-slate-400 group-hover:text-slate-350'
                          }`}>
                            {sdg.number}
                          </span>
                          <span className={`p-1.5 rounded-lg transition-transform group-hover:scale-110 ${
                            isSelected ? 'bg-emerald-500/10 border border-emerald-500/25' : 'bg-slate-900 border border-slate-800'
                          }`}>
                            {sdg.icon}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-emerald-300 text-sm transition">
                            {sdg.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-snug">
                            {sdg.description}
                          </p>
                        </div>
                      </div>

                      {/* Selected dot */}
                      <div className="flex items-center gap-1.5 text-[11px] font-mono mt-3 self-end">
                        {isSelected ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Selected Target
                          </span>
                        ) : (
                          <span className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to Select
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inputs Panel: Observations, Target Audience & Title */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Form Input fields */}
              <div className="lg:col-span-2 space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800" id="form-inputs-box">
                <h3 className="font-semibold text-base text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  Define Local Observations & User Group
                </h3>

                <div className="space-y-4">
                  {/* Observation Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 block">
                      A. What environmental or resource challenges have you observed locally? <span className="text-rose-500 font-serif">*</span>
                    </label>
                    <textarea 
                      id="input-observations"
                      rows={3}
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      placeholder="e.g. In my locality, food leftovers are bundled with dry paper and dumped into active municipal canisters, contributing to pests and local bad odors."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 transition resize-none leading-relaxed"
                    />
                  </div>

                  {/* Target Audience / Beneficiaries */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 block">
                      B. Who is directly affected by this problem (e.g., street vendors, school cooks)? <span className="text-rose-500 font-serif">*</span>
                    </label>
                    <input 
                      id="input-target-audience"
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="e.g. Local residential communities, cooks and organic farmers under our school village network."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 transition text-left"
                    />
                  </div>

                  {/* Proposed Pitch Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 block">
                      C. Propose a Clean, Literal Working Project Title
                    </label>
                    <input 
                      id="input-project-title"
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="e.g. Smart Bio-Contamination Separator and Composting System Advisor"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 transition text-left"
                    />
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      * No tech-larping credit taglines (e.g. avoided names like 'EcoUltra-9000-Quantum'). Keep it literal to describe functional outcomes.
                    </span>
                  </div>
                </div>

                {/* Core Design Thinking Trigger */}
                <div className="pt-4 border-t border-slate-900/40 flex justify-end">
                  <button 
                    id="btn-generate-concept"
                    onClick={generateDesignThinkingConcept}
                    disabled={conceptGenerating || !observations.trim() || !targetAudience.trim()}
                    className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-semibold px-5 py-3 rounded-lg text-xs tracking-wide flex items-center gap-2 hover:scale-[1.01] transition duration-200 shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:text-slate-500"
                  >
                    {conceptGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating Internship Slide Material...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        Generate AI Design Thinking Workspace &rarr;
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Informative / Guideline card right rail */}
              <div className="space-y-4" id="guideline-right-rail">
                {/* 1M1B info checklist */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 shrink-0">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    Internship Evaluation Rules
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-400">
                    <li className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-400 font-bold">&#10003;</span>
                      <strong>Observe First:</strong> Genuinely study local campus or locality challenges (avoid generic simulated concepts).
                    </li>
                    <li className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-400 font-bold">&#10003;</span>
                      <strong>SDG Anchor:</strong> Core problem must align cleanly with target indicators (e.g. SDG 12 for waste).
                    </li>
                    <li className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-400 font-bold">&#10003;</span>
                      <strong>Model Scoping:</strong> No overly complex coding needed. Design prompt logic matching accessible IBM Granite/Gemini schemas.
                    </li>
                    <li className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-400 font-bold">&#10003;</span>
                      <strong>Ethical Safeguard:</strong> Addressing Fairness, Transparency, and Privacy metrics is mandatory (section 7).
                    </li>
                  </ul>
                </div>

                {/* SDG Indicator details card */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5 text-xs shrink-0">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                    Focus SDG Context
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    You selected <strong>{selectedSdg.number}: {selectedSdg.title}</strong>. This target emphasizes localized resource conservation, resilient structures, or health protections.
                  </p>
                  <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 italic text-slate-350">
                    &ldquo;{selectedSdg.presets[0].observations}&rdquo;
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: Design Thinking Assistances */}
        {activeTab === 'brainstorm' && (
          <div className="space-y-6 animate-fadeIn" id="view-step-2">
            
            {/* Design header */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-4xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Step 2: IBM Design Thinking Framework
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Compass className="w-6 h-6 text-emerald-400" /> Project Ideation Map
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The Design Thinking workflow helps formulate the empathy baseline (connecting with target users) before choosing code rules. Study the generated outline below, and customize any of the sections directly!
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('frame')}
                  className="bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 font-medium px-3 py-2 rounded-lg text-xs"
                >
                  &larr; Reselect SDG
                </button>
                <button 
                  id="btn-to-sandbox"
                  onClick={() => setActiveTab('prototype')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs tracking-wide flex items-center gap-1.5 cursor-pointer"
                >
                  Build Prototype &rarr;
                </button>
              </div>
            </div>

            {conceptData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* STAGE 1 & 2: Empathize & Define Map */}
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-emerald-400">E</div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">Empathize & Define Stages</h3>
                      <p className="text-[10px] text-slate-500">Who is experiencing this and what holds them back?</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    {/* User User Pains list */}
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300 block">A. User Challenges & Pain Points:</label>
                      <div className="space-y-2">
                        {conceptData.empathize.userPains.map((pain, idx) => (
                          <div key={idx} className="flex gap-2 items-start bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-slate-300">
                            <span className="font-mono text-emerald-500 font-semibold">{idx+1}.</span>
                            <input 
                              type="text"
                              value={pain}
                              onChange={(e) => {
                                const newPains = [...conceptData.empathize.userPains];
                                newPains[idx] = e.target.value;
                                setConceptData({
                                  ...conceptData,
                                  empathize: { ...conceptData.empathize, userPains: newPains }
                                });
                              }}
                              className="bg-transparent border-none outline-none focus:ring-0 w-full text-slate-200"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Inefficient Model */}
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300 block">B. Gaps / Why manual approach fails:</label>
                      <textarea
                        rows={3}
                        value={conceptData.empathize.currentGaps}
                        onChange={(e) => setConceptData({
                          ...conceptData,
                          empathize: { ...conceptData.empathize, currentGaps: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-300 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none transition resize-none leading-relaxed"
                      />
                    </div>

                    {/* Formatted Project Problem Statement Directive (HOW MIGHT WE) */}
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 block">
                        Formatted SDG Problem Statement
                      </span>
                      <textarea
                        rows={2}
                        value={conceptData.define.problemStatement}
                        onChange={(e) => setConceptData({
                          ...conceptData,
                          define: { problemStatement: e.target.value }
                        })}
                        className="w-full bg-transparent border-none p-0 text-slate-250 font-medium focus:ring-0 focus:outline-none focus:border-b focus:border-emerald-500 resize-none leading-relaxed text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* STAGE 3: Ideate & AI Scoping Map */}
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                    <div className="w-7 h-7 rounded-full bg-sky-500/10 flex items-center justify-center text-xs font-bold text-sky-400">I</div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">Ideation & AI Application Selection</h3>
                      <p className="text-[10px] text-slate-500">Define the exact AI classification rules and scope.</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    {/* Choose AI application category */}
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300 block">A. AI Solution Classification Category:</label>
                      <input 
                        type="text"
                        value={conceptData.ideate.aiApproach}
                        onChange={(e) => {
                          setAiType(e.target.value);
                          setConceptData({
                            ...conceptData,
                            ideate: { ...conceptData.ideate, aiApproach: e.target.value }
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none transition"
                      />
                      <span className="text-[10px] text-slate-500 leading-tight block xl:inline mt-1">
                        Options include: Awareness bot, Pattern system, RAG assistant, Alert Advisor.
                      </span>
                    </div>

                    {/* AI Justification Rule */}
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300 block">B. Why is AI specifically needed? (Prediction, Summarization, Extraction):</label>
                      <textarea
                        rows={4}
                        value={conceptData.ideate.aiJustification}
                        onChange={(e) => setConceptData({
                          ...conceptData,
                          ideate: { ...conceptData.ideate, aiJustification: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-300 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none transition resize-none leading-relaxed"
                      />
                    </div>

                    {/* RAG prompt configuration guide tip */}
                    <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 flex gap-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="font-semibold text-white text-[11px] block">Next: Deploy System Instructions</span>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          Your concept maps beautifully to the next step. Press the <strong>&ldquo;Build Prototype&rdquo;</strong> button to generate customize system guides and test inputs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-slate-950 p-12 text-center rounded-xl border border-slate-800 space-y-3" id="no-concept-placeholder">
                <Compass className="w-12 h-12 text-slate-700 mx-auto animate-spin" />
                <h3 className="font-semibold text-slate-400 text-sm">Design Thinking Concept Map is Uninvoiced</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Go back to <strong>Step 1: SDG Selection</strong>, input observations, and trigger the Gemini assist generator.
                </p>
                <button 
                  onClick={() => setActiveTab('frame')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs mt-3 cursor-pointer"
                >
                  Configure My SDG &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Prototyper Sandbox */}
        {activeTab === 'prototype' && (
          <div className="space-y-6 animate-fadeIn" id="view-step-3">
            
            {/* Header segment */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-4xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Step 3: Prompt Engineering & RAG Sandbox
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Workflow className="w-6 h-6 text-emerald-400" /> Functional AI Prototype Simulator
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Design prompt rule sets and supply simple reference texts to teach your AI the proper local policy criteria. Enter custom questions in the live simulator to see how your rules transform answers in practice.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => setActiveTab('brainstorm')}
                  className="bg-slate-900 border border-slate-850 hover:bg-slate-950 text-slate-400 hover:text-white px-3 py-2 rounded-lg text-xs"
                >
                  &larr; Design Thinking
                </button>
                <button 
                  id="btn-run-assessor"
                  onClick={runResponsibleAssessor}
                  disabled={assessmentGenerating}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs tracking-wide flex items-center gap-1.5 cursor-pointer disabled:bg-slate-800 disabled:text-slate-500"
                >
                  {assessmentGenerating ? 'Analyzing Ethical Rules...' : 'Responsible AI Audit &rarr;'}
                </button>
              </div>
            </div>

            {/* Config & Sandbox panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
              
              {/* Configuration panel (Vite/RAG inputs) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Rule box 1: System prompt */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3" id="prompt-config-card">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white text-xs flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      A. System Prompt (AI Persona & Core Rules)
                    </h4>
                    <span className="text-[10px] uppercase font-mono tracking-wider bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">
                      EDITABLE
                    </span>
                  </div>
                  <textarea 
                    id="input-system-prompt"
                    rows={6}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none transition font-sans leading-relaxed"
                    placeholder="Enter system instruction guide..."
                  />
                  <span className="text-[10px] text-slate-500 block leading-normal italic">
                    Define boundaries, response behaviors (e.g. wet scraps separation), safety warnings, and tone constraints here.
                  </span>
                </div>

                {/* Rule box 2: RAG Guidelines context upload simulated */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3" id="rag-config-card">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white text-xs flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-sky-400" />
                      B. RAG Knowledge Source (Citations / Local Ordinances)
                    </h4>
                    <span className="text-[10px] uppercase font-mono tracking-wider bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">
                      RAG Context
                    </span>
                  </div>
                  <textarea 
                    id="input-knowledge-base"
                    rows={6}
                    value={knowledgeBase}
                    onChange={(e) => setKnowledgeBase(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none transition font-mono leading-relaxed"
                    placeholder="Supply reference context rules..."
                  />
                  <span className="text-[10px] text-slate-500 block leading-normal">
                    This references static databases ground truths, helping prevent AI hallucination and making responses accurate to real standards or safety manuals.
                  </span>
                </div>

              </div>

              {/* Chat Simulator Sandbox Container on Right */}
              <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 flex flex-col h-[520px] overflow-hidden" id="simulator-card">
                
                {/* Sandbox Header */}
                <div className="bg-slate-900/60 p-4 border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <h4 className="font-semibold text-white text-xs">{aiType || 'Sustainability AI System'}</h4>
                      <div className="text-[10px] text-slate-400 mt-0.5">Tested against Active System Prompt rules</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setChatLog([{
                      id: Date.now(),
                      sender: 'ai',
                      text: `Console reset. Ask me any sustainability query and I will react according to your customized prompt instruction.`
                    }])}
                    className="text-[10px] hover:text-white text-slate-400 border border-slate-800 hover:border-slate-700 bg-slate-950 px-2 py-1 rounded transition flex items-center gap-1 shrink-0"
                  >
                    <RefreshCw className="w-3 h-3" /> Clear Console
                  </button>
                </div>

                {/* Chat Message Scroll frame */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4" id="chat-messages-container">
                  {chatLog.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        msg.sender === 'user' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-800 text-slate-350'
                      }`}>
                        {msg.sender === 'user' ? 'U' : 'AI'}
                      </div>
                      <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200' 
                          : 'bg-slate-900/80 border-slate-850 text-slate-300'
                      }`}>
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      </div>
                    </div>
                  ))}
                  {simulating && (
                    <div className="flex gap-2.5 max-w-[85%] mr-auto">
                      <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-350 flex items-center justify-center animate-pulse">
                        S
                      </div>
                      <div className="bg-slate-900/50 border border-slate-850 px-4 py-3 rounded-xl text-xs text-slate-400 italic flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                        AI Prototype processing request rules...
                      </div>
                    </div>
                  )}
                </div>

                {/* Input action drawer */}
                <div className="p-3 bg-slate-900/40 border-t border-slate-800/80">
                  <div className="flex gap-2 items-center bg-slate-950 p-1 rounded-lg border border-slate-800 focus-within:border-emerald-500/50 transition">
                    <input 
                      id="input-chat-query"
                      type="text"
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') sendTestChatMessage();
                      }}
                      placeholder="Type a testing query (e.g. Is composting toxic elements safe?)..."
                      className="flex-1 bg-transparent border-none text-xs text-white p-2 placeholder:text-slate-600 focus:outline-none focus:ring-0 text-left"
                    />
                    <button 
                      id="btn-simulate"
                      disabled={simulating || !testMessage.trim()}
                      onClick={sendTestChatMessage}
                      className="bg-emerald-500 font-semibold text-slate-950 px-3.5 py-1.5 rounded-md text-xs hover:bg-emerald-400 transition flex items-center gap-1 disabled:bg-slate-800 disabled:text-slate-500 shrink-0 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Test
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 4: Ethics / Responsible AI */}
        {activeTab === 'responsible' && (
          <div className="space-y-6 animate-fadeIn" id="view-step-4">
            
            {/* Context Header */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-4xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Step 4: IBM & 1M1B Responsible AI Audit
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" /> Responsible AI Checklists
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Every 1M1B internship project must audit fairness, transparency, and privacy safety nets (Mandatory Guideline Section 7). Study recommendations below or refresh to refine safeguards.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => setActiveTab('prototype')}
                  className="bg-slate-900 border border-slate-850 hover:bg-slate-950 text-slate-400 hover:text-white px-3 py-2 rounded-lg text-xs"
                >
                  &larr; Prototyper Sandbox
                </button>
                <button 
                  id="btn-to-presentation"
                  onClick={() => setActiveTab('presentation')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs tracking-wide flex items-center gap-1.5 cursor-pointer"
                >
                  Compilation Slide Review &rarr;
                </button>
              </div>
            </div>

            {assessmentData ? (
              <div className="space-y-6">
                {/* 4 Pillars Matrix Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Fairness card */}
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3" id="pillar-fairness">
                    <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                      <ScaleIcon className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-semibold text-white text-sm">Pillar 1: Fairness</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed leading-relaxed leading-relaxed mb-2">
                      {assessmentData.fairness.goal}
                    </p>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-850 space-y-2 text-xs text-slate-300">
                      <span className="text-[10px] font-bold text-emerald-400 block uppercase tracking-wide">Implementation Checklist</span>
                      {assessmentData.fairness.checklists.map((check, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <input type="checkbox" defaultChecked className="mt-1 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-0 cursor-pointer" />
                          <span>{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transparency card */}
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3" id="pillar-transparency">
                    <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                      <Eye className="w-4 h-4 text-sky-400" />
                      <h4 className="font-semibold text-white text-sm">Pillar 2: Transparency</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed leading-relaxed height-auto mb-2">
                      {assessmentData.transparency.goal}
                    </p>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-850 space-y-2 text-xs text-slate-300">
                      <span className="text-[10px] font-bold text-sky-400 block uppercase tracking-wide">Implementation Checklist</span>
                      {assessmentData.transparency.checklists.map((check, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <input type="checkbox" defaultChecked className="mt-1 rounded border-slate-700 bg-slate-950 text-sky-500 focus:ring-0 cursor-pointer" />
                          <span>{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ethics card */}
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3" id="pillar-ethics">
                    <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex animate-bounce" />
                      <h4 className="font-semibold text-white text-sm">Pillar 3: Ethics & Safety Guardrails</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed tracking-wide leading-relaxed mb-2">
                      {assessmentData.ethics.goal}
                    </p>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-850 space-y-2 text-xs text-slate-300">
                      <span className="text-[10px] font-bold text-amber-400 block uppercase tracking-wide">Implementation Checklist</span>
                      {assessmentData.ethics.checklists.map((check, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <input type="checkbox" defaultChecked className="mt-1 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0 cursor-pointer" />
                          <span>{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Privacy card */}
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3" id="pillar-privacy">
                    <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                      <Lock className="w-4 h-4 text-rose-400" />
                      <h4 className="font-semibold text-white text-sm">Pillar 4: Privacy & PII Protection</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">
                      {assessmentData.privacy.goal}
                    </p>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-850 space-y-2 text-xs text-slate-300">
                      <span className="text-[10px] font-bold text-rose-400 block uppercase tracking-wide">Implementation Checklist</span>
                      {assessmentData.privacy.checklists.map((check, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <input type="checkbox" defaultChecked className="mt-1 rounded border-slate-700 bg-slate-950 text-rose-500 focus:ring-0 cursor-pointer" />
                          <span>{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Simulated Impact Section */}
                <div className="bg-emerald-500/5 p-6 rounded-xl border border-emerald-500/20 grid grid-cols-1 md:grid-cols-2 gap-6" id="impact-card">
                  <div className="space-y-2">
                    <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wide flex items-center gap-1.5">
                      <Globe className="w-4 h-4" /> Environmental Impact Estimated Outcomes
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {assessmentData.expectedImpact.environmental}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wide flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" /> Localized Community & Social Benefits
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {assessmentData.expectedImpact.social}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-12 text-center rounded-xl border border-slate-800 space-y-3" id="no-assessment-placeholder">
                <ShieldCheck className="w-12 h-12 text-slate-700 mx-auto" />
                <h3 className="font-semibold text-slate-400 text-sm">Ethics Diagnostic Reports is Off-line</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Run model audit to extract customized fairness lists aligned with your generated problem details.
                </p>
                <button 
                  id="btn-trigger-audit"
                  onClick={runResponsibleAssessor}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs mt-3 cursor-pointer"
                >
                  Generate Ethics Review &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Presentation Submission Slides */}
        {activeTab === 'presentation' && (
          <div className="space-y-6 animate-fadeIn" id="view-step-5">
            
            {/* Presentation tools action head */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-4xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Step 5: 1M1B Deliverable slide builder
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <FileText className="w-6 h-6 text-emerald-400" /> Compliance-Ready Exhibition Cards
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The final slides match precisely section 8 of the virtual internship guidelines. Copy the individual sections or download the backup JSON metadata package directly to paste straight into your IBM SkillsBuild PPT files.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button 
                  id="btn-copy-all"
                  onClick={() => copySlideText(compileFullMarkdown(), 99)}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg flex items-center gap-1.5 hover:bg-slate-950 transition"
                >
                  {copiedSlide === 99 ? 'Copied Full Mark!' : <><Copy className="w-3.5 h-3.5" /> Copy Full Markdown</>}
                </button>
                <button 
                  id="btn-download-json"
                  onClick={downloadSubmissionJson}
                  className="bg-emerald-500 text-xs text-slate-950 font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-emerald-400 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Save JSON Backup
                </button>
              </div>
            </div>

            {/* Slide Viewer frame Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12" id="slides-grid">
              
              {/* SLIDE 1: COVER DETAILS */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4 flex flex-col justify-between h-[340px] relative group" id="slide-card-1">
                <span className="absolute top-4 right-4 text-[10px] font-mono text-slate-600 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">SLIDE 1: PITCH HEADER</span>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                      {selectedSdg.number}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Primary Goal focus</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {conceptData?.projectTitle || projectTitle || selectedSdg.presets[0].title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Lead Author</span>
                      <span className="text-slate-200 font-medium font-sans block">{studentNames}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">College Name</span>
                      <span className="text-slate-200 font-medium font-sans text-xs flex line-clamp-1 block">{collegeName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">IBM SkillsBuild & AICTE</div>
                  <button 
                    onClick={() => copySlideText(
                      `Slide 1: Cover Slide\nProject Title: ${conceptData?.projectTitle || projectTitle}\nSDG Anchor: ${selectedSdg.number}: ${selectedSdg.title}\nStudent: ${studentNames}\nCollege: ${collegeName}`, 
                      1
                    )}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition cursor-pointer flex items-center gap-1"
                  >
                    {copiedSlide === 1 ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy Text</>}
                  </button>
                </div>
              </div>

              {/* SLIDE 2: PROBLEM FRAMING */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4 flex flex-col justify-between h-[340px] relative group" id="slide-card-2">
                <span className="absolute top-4 right-4 text-[10px] font-mono text-slate-600 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">SLIDE 2: PROBLEM STATEMENT</span>
                <div className="space-y-3 text-xs">
                  <h4 className="font-bold text-white text-xs uppercase text-slate-400">Empathize & Define Map</h4>
                  <div className="space-y-2 mt-1">
                    <div>
                      <span className="text-slate-500 text-[10px] block">A. Observed Local Challenge:</span>
                      <p className="text-slate-300 line-clamp-2 leading-relaxed">{observations}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">B. Problem Statement (How Might We):</span>
                      <p className="text-emerald-300 line-clamp-2 leading-relaxed font-semibold italic">
                        {conceptData?.define?.problemStatement || `How might we use AI to manage local ecological issues so that citizens reside cleanly?`}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">C. Communities Affected:</span>
                      <span className="text-slate-300">{targetAudience || 'General local neighborhood residents'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">Empathy Baseline Gaps</div>
                  <button 
                    onClick={() => copySlideText(
                      `Slide 2: Problem Frame\nObservations: ${observations}\nTarget Audience: ${targetAudience}\nProblem Statement: ${conceptData?.define?.problemStatement || ''}`, 
                      2
                    )}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition cursor-pointer flex items-center gap-1"
                  >
                    {copiedSlide === 2 ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy Text</>}
                  </button>
                </div>
              </div>

              {/* SLIDE 3: AI PROTOTYPING & RAG SETUP */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4 flex flex-col justify-between h-[340px] relative group animate-none" id="slide-card-3">
                <span className="absolute top-4 right-4 text-[10px] font-mono text-slate-600 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">SLIDE 3: AI ARCHITECTURE</span>
                <div className="space-y-3 text-xs">
                  <h4 className="font-bold text-white text-xs uppercase text-slate-400">AI Logic Flow & Sandbox Rules</h4>
                  <div className="space-y-2 mt-1">
                    <div>
                      <span className="text-slate-500 text-[10px] block">A. AI Solution Categorization:</span>
                      <p className="text-slate-200 font-semibold">{aiType || 'Custom Prompt System'}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">B. AI Prompts & Instructions Setup:</span>
                      <p className="text-slate-400 font-mono text-[10px] line-clamp-3 bg-slate-900 p-2 rounded leading-normal">
                        {systemPrompt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">RAG Context Simulation</div>
                  <button 
                    onClick={() => copySlideText(
                      `Slide 3: Prototyper Config\nAI Application Category: ${aiType}\nSystem Prompts:\n${systemPrompt}\n\nGrounding Knowledge Base:\n${knowledgeBase}`, 
                      3
                    )}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition cursor-pointer flex items-center gap-1"
                  >
                    {copiedSlide === 3 ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy Text</>}
                  </button>
                </div>
              </div>

              {/* SLIDE 4: RESPONSIBLE AI AUDIT & IMPACTS */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4 flex flex-col justify-between h-[340px] relative group" id="slide-card-4">
                <span className="absolute top-4 right-4 text-[10px] font-mono text-slate-600 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">SLIDE 4: ETHICS & IMPACTS</span>
                <div className="space-y-3 text-xs">
                  <h4 className="font-bold text-white text-xs uppercase text-slate-400">Responsible AI Safeguards</h4>
                  <div className="space-y-2.5 mt-1 leading-normal">
                    <div className="flex gap-2 items-start text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold font-mono">Fair:</span>
                      <span className="line-clamp-1">{assessmentData?.fairness?.goal || 'Ensured localized non-jargon translation helpers.'}</span>
                    </div>
                    <div className="flex gap-2 items-start text-xs text-slate-300">
                      <span className="text-sky-400 font-bold font-mono">Clear:</span>
                      <span className="line-clamp-1">{assessmentData?.transparency?.goal || 'Exposed references and data rules below outcomes.'}</span>
                    </div>
                    <div className="flex gap-2 items-start text-xs text-slate-300">
                      <span className="text-rose-400 font-bold font-mono">Privat:</span>
                      <span className="line-clamp-1">{assessmentData?.privacy?.goal || 'Anonymized addresses, stripping geo markers.'}</span>
                    </div>
                    <div className="border-t border-slate-900 pt-2 shrink-0">
                      <span className="text-slate-500 text-[10px] block">C. Expected Climate Action Outcome:</span>
                      <p className="text-emerald-400 font-medium italic mt-0.5 line-clamp-1">{assessmentData?.expectedImpact?.environmental || 'Diverts solid components safely minimizing methane triggers.'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">Guardrails Compliant</div>
                  <button 
                    onClick={() => copySlideText(
                      `Slide 4: Responsible AI Actions\nFairness Policy: ${assessmentData?.fairness?.goal || ''}\nTransparency: ${assessmentData?.transparency?.goal || ''}\nPrivacy Measures: ${assessmentData?.privacy?.goal || ''}\nEnvironmental Impact: ${assessmentData?.expectedImpact?.environmental || ''}`, 
                      4
                    )}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition cursor-pointer flex items-center gap-1"
                  >
                    {copiedSlide === 4 ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy Text</>}
                  </button>
                </div>
              </div>

            </div>

            {/* Prompt logic pipeline routing flow graphic diagram */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3 shrink-0" id="flowchart-box">
              <h4 className="font-semibold text-white text-xs uppercase tracking-wide flex items-center gap-1.5">
                <Workflow className="w-4 h-4 text-emerald-400" /> AI Prototype Prompt Pipeline Pipeline Chart
              </h4>
              <p className="text-xs text-slate-400">
                This schematic represents your functional playground prompt architecture when evaluating queries via the server module:
              </p>
              <pre className="bg-slate-900/80 rounded-lg p-4 font-mono text-[11px] text-emerald-400 text-left border border-slate-850 overflow-x-auto leading-relaxed">
{` [ Community Query ] ──────────────┐
                                   │
                                   ▼
 [ RAG Context filter ] ──► [ AI System Instructions ]
 (Grounding Guidelines)    (Selected boundary limits)
                                   │
                                   ▼
                       [ server-side Gemini Core ]
                                   │
                                   ▼
                       [ Checked Safe Feedback ]
                       ✔ Contextually Grounded
                       ✔ Privacy-Stipped`}
              </pre>
            </div>

          </div>
        )}

      </main>

      {/* Footer credits tag line */}
      <footer className="border-t border-slate-850 bg-slate-950/40 text-center py-4 text-xs text-slate-500 shrink-0" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p>
            1M1B - IBM SkillsBuild AI for Sustainability Virtual Internship Helper Workspace.
          </p>
          <div className="flex gap-4 col-start-2">
            <span>UN Sustainable Development Goals (SDG Alignment)</span>
            <span>AICTE Approved Coursework</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple Scale SVG vector icon
function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m16 16 3-8 3 8c-.87.65-2.24 1-3 1s-2.13-.35-3-1Z"/>
      <path d="m2 16 3-8 3 8c-.87.65-2.24 1-3 1s-2.13-.35-3-1Z"/>
      <path d="M7 21h10"/>
      <path d="M12 3v18"/>
      <path d="M3 7h18"/>
    </svg>
  );
}
