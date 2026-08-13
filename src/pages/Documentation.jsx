import { useState } from "react";
import {Menu,X,Search,ChevronRight,Copy,Check,Terminal,Code2,Bug,Network,Sparkles,BookOpen,ShieldCheck,History,Zap,} from "lucide-react";
import Header from "../components/Header";

const documentationSections = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "Core Features",
    icon: Code2,
    items: [
      { id: "code-analysis", label: "Code Analysis" },
      { id: "console-analysis", label: "Console Analysis" },
      { id: "network-analysis", label: "Network Analysis" },
      { id: "ai-suggestions", label: "AI Suggestions" },
    ],
  },
  {
    title: "Account",
    icon: ShieldCheck,
    items: [
      { id: "history", label: "Analysis History" },
      { id: "favorites", label: "Saved Analyses" },
    ],
  },
];

function CodeBlock({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0d]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#111116] px-4 py-3">
        <div className="flex items-center gap-2">
          <Code2 size={15} className="text-purple-600" />
          <span className="text-xs text-gray-400">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-7">
        <code className="font-mono text-gray-300">
          {code}
        </code>
      </pre>
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111116] p-5 transition hover:border-purple-600/30">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/10 text-purple-600">
        <Icon size={18} />
      </div>
      <h3 className="mb-2 text-sm font-semibold text-white">{title}</h3>
      <p className="text-sm leading-6 text-gray-400">{children}</p>
    </div>
  );
}

export default function Documentation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [search, setSearch] = useState("");
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setSidebarOpen(false);
  };

  const filteredSections = documentationSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen bg-[#09090c] text-white">
      <Header/>
      <div className="mx-auto flex max-w-[1500px]">
        <aside
          className={`
            fixed left-0 top-16 z-40 h-[calc(100vh-4rem)]
            w-72 overflow-y-auto border-r border-white/10
            bg-[#09090c] p-5
            transition-transform duration-300
            lg:sticky lg:top-16 lg:block lg:translate-x-0
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >

          <div className="mb-6 md:hidden">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search..."
                className="w-full rounded-lg border border-white/10 bg-[#111116] py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-600 focus:border-purple-600/50"
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-600">Documentation</p>
            <p className="px-3 text-xs leading-5 text-gray-500">
              Learn how CodeExpert analyzes code,
              errors and API problems.
            </p>
          </div>

          <nav className="space-y-7">
            {filteredSections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <div key={section.title}>
                  <div className="mb-2 flex items-center gap-2 px-3">
                    <SectionIcon
                      size={14}
                      className="text-purple-600"
                    />

                    <span className="text-xs font-semibold text-gray-300">
                      {section.title}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() =>
                          scrollToSection(item.id)
                        }
                        className={`
                          flex w-full items-center justify-between
                          rounded-lg px-3 py-2 text-left text-sm
                          transition cursor-pointer
                          ${
                            activeSection === item.id
                              ? "bg-purple-600/10 text-purple-600"
                              : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                          }
                        `}
                      >
                        <span>{item.label}</span>

                        {activeSection === item.id && (
                          <ChevronRight size={14} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-10 sm:px-8 lg:px-14 xl:px-20">
          <section id="introduction" className="scroll-mt-24">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">CodeExpert Documentation</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-400">
              CodeExpert is an AI-powered developer
              assistant that helps you understand code,
              diagnose errors, analyze API failures and
              generate practical solutions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <InfoCard icon={Code2} title="Code Analysis">
                Analyze source code and understand
                potential problems and improvements.
              </InfoCard>
              <InfoCard icon={Terminal} title="Console Analysis">
                Understand JavaScript errors,
                warnings and runtime failures.
              </InfoCard>
              <InfoCard icon={Network} title="Network Analysis">
                Investigate API failures, status codes
                and request problems.
              </InfoCard>
              <InfoCard icon={Sparkles} title="AI Assistance">
                Get explanations, fixes and improved
                code from AI.
              </InfoCard>
            </div>
          </section>

          <section
            id="quick-start"
            className="mt-20 scroll-mt-24"
          >
            <SectionHeading
              number="01"
              title="Quick Start"
            />

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Start by providing CodeExpert with the
              code or error you want to analyze. The AI
              processes the input and returns a structured
              explanation with possible fixes.
            </p>

            <CodeBlock
              language="javascript"
              code={`const user = undefined;

console.log(user.name);

// TypeError:
// Cannot read properties of undefined`}
            />

            <div className="rounded-xl border border-purple-600/20 bg-purple-600/5 p-5">
              <div className="flex gap-3">
                <Sparkles
                  size={18}
                  className="mt-0.5 shrink-0 text-purple-600"
                />

                <div>
                  <h3 className="text-sm font-semibold text-purple-600">
                    Tip
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Include the complete error message
                    and the related code whenever possible.
                    This gives the AI more context for its
                    analysis.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CODE ANALYSIS */}

          <section
            id="code-analysis"
            className="mt-20 scroll-mt-24"
          >
            <SectionHeading
              number="02"
              title="Code Analysis"
            />

            <p className="mt-4 text-sm leading-7 text-gray-400">
              CodeExpert can analyze JavaScript and
              React code to identify potential issues,
              explain the implementation and suggest
              improvements.
            </p>

            <CodeBlock
              language="javascript"
              code={`async function fetchUser() {
  const response = await fetch("/api/user");

  const user = await response.json();

  return user;
}`}
            />

            <h3 className="mt-8 text-lg font-semibold">What CodeExpert can identify</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <Bullet>Missing error handling</Bullet>
              <Bullet>Potential undefined values</Bullet>
              <Bullet>Unnecessary or inefficient logic</Bullet>
              <Bullet>Async/await problems</Bullet>
              <Bullet>Code readability improvements</Bullet>
            </ul>
          </section>

          <section
            id="console-analysis"
            className="mt-20 scroll-mt-24"
          >
            <SectionHeading
              number="03"
              title="Console Analysis"
            />

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Paste a browser console error into
              CodeExpert and receive an explanation of
              the error, its likely cause and possible
              solutions.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-red-500/20 bg-[#111116]">
              <div className="flex items-center gap-2 border-b border-red-500/10 bg-red-500/5 px-4 py-3">
                <Bug
                  size={15}
                  className="text-red-400"
                />

                <span className="text-xs font-medium text-red-400">Console Error</span>
              </div>

              <div className="p-5 font-mono text-sm text-gray-300">
                TypeError: Cannot read properties of
                undefined (reading 'name')
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-purple-600/20 bg-purple-600/5 p-5">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={16}
                  className="text-purple-600"
                />

                <span className="text-sm font-semibold text-purple-600">AI Analysis</span>
              </div>

              <div className="mt-5 space-y-5">
                <AnalysisItem
                  title="Root Cause"
                  text="The user variable is undefined when the name property is accessed."
                />

                <AnalysisItem
                  title="Why It Happens"
                  text="The application attempts to access a nested property before confirming that the object exists."
                />

                <AnalysisItem
                  title="Suggested Fix"
                  text="Validate the object before accessing its properties or provide a fallback value."
                />
              </div>
            </div>
          </section>

          {/* NETWORK */}

          <section
            id="network-analysis"
            className="mt-20 scroll-mt-24"
          >
            <SectionHeading
              number="04"
              title="Network Analysis"
            />

            <p className="mt-4 text-sm leading-7 text-gray-400">
              CodeExpert can help analyze failed API
              requests by examining the request method,
              endpoint, status code and response.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#111116]">
              <div className="grid grid-cols-2 border-b border-white/10 text-xs sm:grid-cols-4">
                <NetworkItem
                  label="Method"
                  value="GET"
                />
                <NetworkItem
                  label="Status"
                  value="500"
                  danger
                />
                <NetworkItem
                  label="Endpoint"
                  value="/api/users"
                />
                <NetworkItem
                  label="Type"
                  value="fetch"
                />
              </div>

              <div className="p-5">
                <p className="mb-3 text-xs uppercase tracking-wider text-gray-600">Response</p>

                <pre className="overflow-x-auto rounded-lg bg-[#09090c] p-4 text-sm text-gray-400">
{`{
  "error": "Internal Server Error",
  "message": "Database connection failed"
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* AI SUGGESTIONS */}

          <section
            id="ai-suggestions"
            className="mt-20 scroll-mt-24"
          >
            <SectionHeading
              number="05"
              title="AI Suggestions"
            />

            <p className="mt-4 text-sm leading-7 text-gray-400">
              After analyzing the provided code or error,
              CodeExpert generates contextual suggestions
              instead of only displaying an error message.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <SuggestionCard
                title="Explain"
                text="Understand what the error means and why it happened."
              />

              <SuggestionCard
                title="Fix"
                text="Get a practical solution for resolving the issue."
              />

              <SuggestionCard
                title="Improve"
                text="Discover ways to make the implementation cleaner and safer."
              />
            </div>
          </section>

          {/* HISTORY */}

          <section
            id="history"
            className="mt-20 scroll-mt-24"
          >
            <SectionHeading
              number="06"
              title="Analysis History"
            />

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Every authenticated user can access their
              previous CodeExpert analyses from the history
              section.
            </p>

            <div className="mt-6 grid gap-3">
              <HistoryItem
                error="TypeError: Cannot read properties of undefined"
                type="Console"
                date="Today"
              />

              <HistoryItem
                error="GET /api/users — 500 Internal Server Error"
                type="Network"
                date="Yesterday"
              />

              <HistoryItem
                error="Missing dependency in React component"
                type="Code Analysis"
                date="2 days ago"
              />
            </div>
          </section>


          <section
            id="favorites"
            className="mt-20 scroll-mt-24"
          >
            <SectionHeading
              number="07"
              title="Saved Analyses"
            />

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Important AI analyses can be saved to your
              personal collection for future reference.
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-[#111116] p-5">
              <div className="flex items-center gap-3">
                <History
                  size={18}
                  className="text-purple-600"
                />

                <div>
                  <h3 className="text-sm font-semibold">
                    Your saved analyses
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Quickly access solutions you want to
                    revisit later.
                  </p>
                </div>
              </div>
            </div>
          </section>


          <footer className="mt-24 border-t border-white/10 py-8">
            <div className="flex flex-col justify-between gap-4 text-xs text-gray-600 sm:flex-row">
              <p>CodeExpert Documentation</p>
              <p>AI-powered developer assistance</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}


function SectionHeading({ number, title }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-purple-600">
        {number}
      </span>

      <h2 className="text-2xl font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
      <span>{children}</span>
    </li>
  );
}

function AnalysisItem({ title, text }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-gray-300">
        {text}
      </p>
    </div>
  );
}

function NetworkItem({ label, value, danger }) {
  return (
    <div className="border-r border-white/10 p-4 last:border-r-0">
      <p className="text-[10px] uppercase tracking-wider text-gray-600">
        {label}
      </p>

      <p
        className={`mt-1 font-mono text-xs ${
          danger ? "text-red-400" : "text-gray-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function SuggestionCard({ title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111116] p-5">
      <div className="mb-3 flex items-center gap-2">
        <Zap
          size={15}
          className="text-purple-600"
        />

        <h3 className="text-sm font-semibold">
          {title}
        </h3>
      </div>

      <p className="text-sm leading-6 text-gray-500">
        {text}
      </p>
    </div>
  );
}

function HistoryItem({ error, type, date }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#111116] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-600/10">
          <Terminal
            size={15}
            className="text-purple-600"
          />
        </div>

        <div>
          <p className="text-sm text-gray-300">
            {error}
          </p>

          <p className="mt-1 text-xs text-gray-600">
            {type}
          </p>
        </div>
      </div>

      <span className="text-xs text-gray-600">
        {date}
      </span>
    </div>
  );
}