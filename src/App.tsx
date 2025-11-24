import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  FileText, 
  Activity,
  Share2,
  ChevronLeft,
  CheckCircle2,
  Loader2
} from 'lucide-react';

// --- Configuration ---
const supabaseUrl = 'https://rqliizpjhxiiulrckzgu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxbGlpenBqaHhpaXVscmNremd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTQ4ODYsImV4cCI6MjA3OTIzMDg4Nn0.h7X27HOi0FB4hAQeVBsQMR-TEOywnGcvSBYF3fVsdYc';

// --- Types ---

interface VerificationItem {
  bias: string;
  score: number;
  verdict: string;
  confidence: number;
  summary: string;
  contextLabel: string;
  contextText: string;
  color: string;
  claim: string;
  isPolitical: boolean;
}

// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-2">
    <span className="font-['Anton'] text-3xl tracking-wide text-[#E6EDF3]">Vett</span>
  </div>
);

const Button = ({ 
  children, 
  className = "", 
  onClick, 
  disabled = false,
  type = "button"
}: { 
  children?: React.ReactNode, 
  className?: string, 
  onClick?: () => void,
  disabled?: boolean,
  type?: "button" | "submit" | "reset"
}) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    type={type}
    className={`
      bg-[#3A86FF] hover:bg-[#2A76EF] text-white 
      font-medium text-sm px-6 py-3 
      transition-colors duration-200 
      rounded-[2px] 
      flex items-center justify-center gap-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `}
  >
    {children}
  </button>
);

const Input = ({ 
  placeholder, 
  value, 
  onChange,
  required = false
}: { 
  placeholder: string,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean
}) => (
  <input 
    type="email" 
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className="
      bg-[#14181D] border border-[rgba(255,255,255,0.08)]
      text-[#E6EDF3] placeholder-[#9BA4AE]
      px-4 py-3 text-sm w-full
      focus:outline-none focus:border-[#3A86FF]
      transition-colors duration-200
      rounded-[2px]
    "
  />
);

const SectionHeading = ({ children }: { children?: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-[#E6EDF3] mb-6 leading-[1.1]">
    {children}
  </h2>
);

const SectionText = ({ children }: { children?: React.ReactNode }) => (
  <p className="text-[#9BA4AE] leading-relaxed text-base md:text-lg max-w-lg">
    {children}
  </p>
);

// --- Hero Visualization Component ---

const VerificationDemo = () => {
  const [index, setIndex] = useState(1); // Start with the "Mostly Accurate" example

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3);
    }, 6000); // Slightly longer duration for reading
    return () => clearInterval(interval);
  }, []);

  const data: VerificationItem[] = [
    {
      bias: "Center",
      score: 98,
      verdict: "Verified",
      confidence: 99,
      summary: "IEA data confirms renewables surpassed coal capacity in early 2024, driven by solar expansion in Asia.",
      contextLabel: "Verified Sources",
      contextText: "Primary Source: IEA Renewables Report 2024. Cross-referenced with Bloomberg NEF analysis.",
      color: "#4CC9F0", // Blue
      claim: "Global renewable energy capacity surpassed coal in 2024.",
      isPolitical: false
    },
    {
      bias: "Center",
      score: 70,
      verdict: "Mostly Accurate",
      confidence: 85,
      summary: "MBS visited Trump at the White House as confirmed, but a $1 trillion deal was promised, not signed.",
      contextLabel: "Missing Context",
      contextText: "While high-level discussions occurred, official White House transcripts show no binding financial agreement was signed.",
      color: "#FB8B24", // Orange
      claim: "MBS visited Donald Trump at the White House and signed a $1 trillion deal.",
      isPolitical: true
    },
    {
      bias: "Unreliable",
      score: 12,
      verdict: "False",
      confidence: 94,
      summary: "Seismological consensus rejects 48h prediction capabilities. Source linked to known clickbait network.",
      contextLabel: "Correct Information",
      contextText: "USGS confirms no technology currently exists to predict earthquakes within a 48-hour window.",
      color: "#FF4D6D", // Red
      claim: "New algorithm predicts earthquake in California within 48 hours.",
      isPolitical: false
    }
  ];

  const item = data[index];
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (item.score / 100) * circumference;

  return (
    <div className="relative w-full max-w-[360px] mx-auto md:ml-auto md:mr-0 mt-8 md:mt-[220px] select-none scale-[0.85] sm:scale-100 origin-top md:origin-top-right transition-transform">
      {/* Phone/Card Container */}
      <div className="relative bg-[#0C0F12] rounded-[40px] border border-[rgba(255,255,255,0.08)] p-6 shadow-2xl overflow-hidden min-h-[720px] flex flex-col justify-between">
        
        {/* Ambient Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10 blur-[100px] transition-colors duration-1000"
          style={{ backgroundColor: item.color }}
        />

        {/* --- Top Section --- */}
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="w-9 h-9 rounded-full bg-[#1E2329] flex items-center justify-center text-[#E6EDF3] cursor-pointer hover:bg-[#2A3038] transition-colors border border-white/5">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-3">
              {item.isPolitical && (
                <span className="text-xs font-medium text-[#9BA4AE] bg-[#1E2329] px-3 py-1.5 rounded-full border border-white/5">
                  Bias · {item.bias}
                </span>
              )}
              <div className="w-9 h-9 rounded-full bg-[#1E2329] flex items-center justify-center text-[#E6EDF3] cursor-pointer hover:bg-[#2A3038] transition-colors border border-white/5">
                <Share2 className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Input Claim - Moved to Top */}
          <div className="mb-8 z-10 relative px-1">
            <div className="text-[10px] text-[#525964] uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3A86FF]"></div>
              Input Claim
            </div>
            <p className="text-xl font-display font-medium text-[#E6EDF3] leading-[1.35]">
              "{item.claim}"
            </p>
          </div>
        </div>

        {/* --- Middle Section: Ring --- */}
        <div className="relative flex justify-center items-center py-2 z-10 w-full flex-grow">
          <div className="w-60 h-60 relative flex items-center justify-center">
            {/* SVG Container */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Background Circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="#1E2329"
                strokeWidth="10"
                fill="none"
              />
              {/* Progress Circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke={item.color}
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{ filter: `drop-shadow(0 0 8px ${item.color}40)` }}
              />
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase tracking-widest text-[#9BA4AE] font-semibold mb-1">Vett Score</span>
              <span 
                className="text-7xl font-display font-bold text-[#E6EDF3] tracking-tighter transition-colors duration-500"
              >
                {item.score}
              </span>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Details --- */}
        <div className="space-y-4 z-10 relative mt-4">
          
          {/* Verdict Row */}
          <div className="flex justify-between items-center px-1 mb-2">
            <div>
              <div className="text-[10px] text-[#525964] uppercase tracking-wider font-bold mb-1">Verdict</div>
              <h3 className="text-xl font-display font-bold text-[#E6EDF3] tracking-tight">
                {item.verdict}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[#525964] uppercase tracking-wider font-bold mb-1">Confidence</div>
              <div className="flex items-center justify-end gap-2">
                <div className="w-12 h-1 bg-[#1E2329] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${item.confidence}%`, backgroundColor: item.color }} 
                  />
                </div>
                <span className="text-sm font-bold text-[#E6EDF3] font-mono">{item.confidence}%</span>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-[#14181D] rounded-xl p-4 border border-[rgba(255,255,255,0.04)]">
            <div className="text-[10px] text-[#525964] uppercase tracking-wider font-bold mb-2">Summary</div>
            <p className="text-[13px] text-[#E6EDF3] leading-relaxed">
              {item.summary}
            </p>
          </div>

          {/* Context / Correct Info - Dynamic based on verdict */}
          <div className="bg-[#14181D] rounded-xl p-4 border border-[rgba(255,255,255,0.04)]">
            <div className="text-[10px] text-[#525964] uppercase tracking-wider font-bold mb-2 text-[#3A86FF]">{item.contextLabel}</div>
            <p className="text-[13px] text-[#E6EDF3] leading-relaxed">
              {item.contextText}
            </p>
          </div>
        </div>

      </div>
      
      {/* Decorative Elements around phone */}
      <div className="absolute -z-10 top-8 -right-8 w-full h-full border border-[rgba(255,255,255,0.03)] rounded-[44px] pointer-events-none" />
    </div>
  );
};

// --- Success Screen Component ---

const SuccessScreen = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center animate-fade-in">
    <div className="mb-8">
      <Logo />
    </div>
    <div className="w-16 h-16 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mb-6 text-[#3A86FF]">
      <CheckCircle2 className="w-8 h-8" />
    </div>
    <h1 className="text-4xl md:text-5xl font-display font-semibold text-[#E6EDF3] mb-4">
      You're on the list.
    </h1>
    <p className="text-[#9BA4AE] text-lg max-w-md leading-relaxed mb-8">
      We've reserved your spot in line. Watch your inbox for your invite code and early access instructions.
    </p>
    <div className="p-4 bg-[#14181D] border border-[rgba(255,255,255,0.06)] rounded-lg max-w-sm w-full">
      <p className="text-xs text-[#525964] uppercase tracking-wider font-bold mb-2">Next Steps</p>
      <p className="text-sm text-[#E6EDF3]">
        Follow us on X/Twitter @VettAI for release updates and live verification demos.
      </p>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setJoined(true);
      } else {
        const errorData = await res.json();
        console.error('Supabase Error:', errorData);
        // Check for unique violation (Postgres code 23505)
        if (errorData?.code === '23505') {
          setJoined(true);
        } else {
          alert('There was an error joining the waitlist. Please try again.');
        }
      }
    } catch (err) {
      console.error('Submission Error:', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (joined) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden selection:bg-[#3A86FF] selection:text-white">
      
      {/* Navigation */}
      <nav className="w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-10">
        <Logo />
      </nav>

      {/* Hero Section */}
      <section id="hero" className="w-full px-6 md:px-12 pt-8 md:pt-16 pb-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-[#E6EDF3] leading-[0.95] tracking-tight mb-6">
            Verify reality.<br />
            <span className="text-[#9BA4AE]">In real-time.</span>
          </h1>
          <p className="text-[#9BA4AE] text-lg md:text-xl leading-relaxed max-w-md mb-10 font-light">
            An automated intelligence layer that vets social claims against global data sources. Truth at the speed of the feed.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md" onSubmit={handleJoinWaitlist}>
            <Input 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button className="whitespace-nowrap" type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join Waitlist"}
            </Button>
          </form>
          <p className="mt-4 text-xs text-[#525964]">
            Limited early access. No spam, ever.
          </p>
        </div>

        <div className="lg:col-span-6 w-full relative flex justify-center lg:justify-end">
          <VerificationDemo />
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="w-full px-6 md:px-12 py-24 bg-[#14181D] border-y border-[rgba(255,255,255,0.03)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Block 1 */}
            <div className="flex flex-col gap-4 md:mt-0">
              <AlertTriangle className="w-6 h-6 text-[#FF4D6D]" />
              <h3 className="text-xl font-display font-medium text-[#E6EDF3]">Viral Misinformation</h3>
              <p className="text-[#9BA4AE] text-sm leading-relaxed">
                Falsehoods spread 6x faster than truth on social platforms. The viral loop prioritizes engagement over accuracy, leaving users misinformed before corrections arrive.
              </p>
            </div>

            {/* Block 2 */}
            <div className="flex flex-col gap-4 md:mt-12">
              <Activity className="w-6 h-6 text-[#3A86FF]" />
              <h3 className="text-xl font-display font-medium text-[#E6EDF3]">Manual Bottlenecks</h3>
              <p className="text-[#9BA4AE] text-sm leading-relaxed">
                Traditional fact-checking takes hours or days. In a 24-hour news cycle, a retrospective correction is often too late to undo the damage of a false narrative.
              </p>
            </div>

            {/* Block 3 */}
            <div className="flex flex-col gap-4 md:mt-24">
              <Search className="w-6 h-6 text-[#2EC4B6]" />
              <h3 className="text-xl font-display font-medium text-[#E6EDF3]">Source Amnesia</h3>
              <p className="text-[#9BA4AE] text-sm leading-relaxed">
                Screenshots and reposts strip away context and citations. We reverse-engineer the claim to find the original data, restoring the missing provenance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full px-6 md:px-12 py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionHeading>Designed for transparency.</SectionHeading>
            <SectionText>
              Vett doesn't just say "True" or "False". It builds a legal-grade case file for every claim, citing primary sources and highlighting context gaps.
            </SectionText>
            
            <div className="mt-12 hidden lg:block">
              <div className="h-px w-24 bg-[#3A86FF] mb-6"></div>
              <div className="text-sm font-mono text-[#525964]">
                PROCESS ARCHITECTURE v1
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-12">
            {/* Step 1 */}
            <div className="group flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 flex items-center justify-center text-[#E6EDF3]">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="w-px h-full bg-[rgba(255,255,255,0.06)] my-2 group-last:hidden"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-lg font-medium text-[#E6EDF3] mb-2">Ingest & Parse</h4>
                <p className="text-[#9BA4AE] text-sm">
                  Submit text, a link, or an image screenshot. Vett's OCR and NLP engine extracts the core assertions, separating objective claims from subjective opinion.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 flex items-center justify-center text-[#E6EDF3]">
                  <Search className="w-5 h-5" />
                </div>
                <div className="w-px h-full bg-[rgba(255,255,255,0.06)] my-2 group-last:hidden"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-lg font-medium text-[#E6EDF3] mb-2">Cross-Reference</h4>
                <p className="text-[#9BA4AE] text-sm">
                  The engine queries reputable databases, academic journals, and primary news wires. It triangulates data points to find consensus or contradiction.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 flex items-center justify-center text-[#E6EDF3]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#E6EDF3] mb-2">Verdict Delivery</h4>
                <p className="text-[#9BA4AE] text-sm">
                  Receive a granular report with a confidence score. Claims are labeled: Verified, Misleading, Out of Context, or False, with direct links to evidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer id="cta" className="w-full bg-[#14181D] border-t border-[rgba(255,255,255,0.06)] py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center md:text-left md:flex md:justify-between md:items-end">
          <div className="mb-10 md:mb-0 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-[#E6EDF3] leading-[0.95] mb-6">
              Truth is the ultimate asset.
            </h2>
            <p className="text-[#9BA4AE] mb-8">
              Be the first to verify claims at the speed of social media. Join the beta for early access to the API and browser extension.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md" onSubmit={handleJoinWaitlist}>
              <Input 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Join Waitlist <ArrowRight className="w-4 h-4" /></>}
              </Button>
            </form>
          </div>
          
          <div className="text-right hidden md:block opacity-40">
             <Logo />
             <div className="mt-4 text-xs text-[#525964]">
               © 2024 Vett Inc.
             </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
