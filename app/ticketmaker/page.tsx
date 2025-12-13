'use client'

import { useState } from "react";
import { LandingScreen } from "./components/LandingScreen";
import { TicketScreen } from "./components/TicketScreen";
import { SolutionScreen } from "./components/SolutionScreen";
import { EvaluationScreen } from "./components/EvaluationScreen";

type Screen = "landing" | "ticket" | "solution" | "evaluation";

interface Ticket {
    title: string;
    project: string;
    stack: string;
    priority: string;
    context: string;
    task: string;
}

interface Evaluation {
    level: string;
    strengths: string[];
    gaps: string[];
    summary: string;
}

// Mock ticket generator based on job description
function generateTicket(jobDescription: string): Ticket {
    const tickets: Ticket[] = [
        {
            title: "🐞 Fix race condition in shopping cart state",
            project: "Checkout Platform",
            stack: "React, Redux Toolkit, Node.js",
            priority: "High",
            context: `Users are occasionally seeing duplicate items added
to their cart when clicking "Add to Cart" rapidly.

We use Redux Toolkit for state management and
async thunks for API calls.`,
            task: `Describe how you would investigate and fix this issue.
Focus on state flow, concurrency, and edge cases.`
        },
        {
            title: "⚡ Optimize API response time for dashboard query",
            project: "Analytics Dashboard",
            stack: "React, GraphQL, PostgreSQL",
            priority: "High",
            context: `The main dashboard query is taking 3-5 seconds to load
when users have large datasets (500K+ records).

Current implementation fetches all data and filters
client-side.`,
            task: `Explain your approach to diagnose the bottleneck and
propose solutions for both backend and frontend optimization.`
        },
        {
            title: "🔐 Implement OAuth refresh token rotation",
            project: "Authentication Service",
            stack: "Node.js, Express, JWT, Redis",
            priority: "Critical",
            context: `We need to implement refresh token rotation to improve
security. Currently, refresh tokens never expire and
aren't tracked server-side.`,
            task: `Describe the architecture changes needed and how you'd
handle edge cases like concurrent refresh requests.`
        }
    ];

    // Simple hash to pick a consistent ticket based on JD length
    const index = jobDescription.length % tickets.length;
    return tickets[index];
}

// Mock evaluation generator based on solution
function generateEvaluation(solution: string): Evaluation {
    const wordCount = solution.trim().split(/\s+/).length;
    const hasDebugging = solution.toLowerCase().includes("debug") || solution.toLowerCase().includes("reproduce");
    const hasEdgeCases = solution.toLowerCase().includes("edge") || solution.toLowerCase().includes("concurrent");
    const hasTesting = solution.toLowerCase().includes("test");

    const level = wordCount > 100 ? "Senior-Level Signal: Strong" :
        wordCount > 50 ? "Mid-Level Signal: Good" :
            "Junior-Level Signal: Developing";

    const strengths: string[] = [];
    const gaps: string[] = [];

    if (hasDebugging) {
        strengths.push("Clear debugging strategy");
        strengths.push("Systematic approach to problem-solving");
    } else {
        gaps.push("Missing detailed debugging approach");
    }

    if (hasEdgeCases) {
        strengths.push("Good understanding of edge cases and concurrency");
    } else {
        gaps.push("Could expand on edge case handling");
    }

    if (hasTesting) {
        strengths.push("Considers testing strategy");
    } else {
        gaps.push("No mention of testing strategy");
    }

    if (wordCount > 80) {
        strengths.push("Thorough and detailed explanation");
    }

    if (!solution.toLowerCase().includes("backend") && !solution.toLowerCase().includes("server")) {
        gaps.push("Could consider backend/server-side implications");
    }

    const summary = wordCount > 100
        ? "This response demonstrates strong real-world reasoning and would likely perform well in a production engineering environment. The candidate shows senior-level thinking with attention to system design and edge cases."
        : wordCount > 50
            ? "This response shows solid engineering fundamentals and practical problem-solving skills. With more depth on system-level concerns, this could reach senior-level quality."
            : "This response demonstrates basic understanding of the problem. Consider expanding on debugging methodology, edge cases, and system-level implications to strengthen the answer.";

    return { level, strengths, gaps, summary };
}

export default function Ticketmaster() {
    const [screen, setScreen] = useState<Screen>("landing");
    const [jobDescription, setJobDescription] = useState("");
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [solution, setSolution] = useState("");
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

    const handleGenerateTicket = () => {
        const generatedTicket = generateTicket(jobDescription);
        setTicket(generatedTicket);
        setScreen("ticket");
    };

    const handleStartSolution = () => {
        setScreen("solution");
    };

    const handleSubmitSolution = () => {
        const generatedEvaluation = generateEvaluation(solution);
        setEvaluation(generatedEvaluation);
        setScreen("evaluation");
    };

    const handleTryAnother = () => {
        setJobDescription("");
        setTicket(null);
        setSolution("");
        setEvaluation(null);
        setScreen("landing");
    };

    return (
        <div className="min-h-screen">
            {screen === "landing" && (
                <LandingScreen
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                    onGenerate={handleGenerateTicket}
                />
            )}

            {screen === "ticket" && ticket && (
                <TicketScreen
                    ticket={ticket}
                    onStartSolution={handleStartSolution}
                />
            )}

            {screen === "solution" && (
                <SolutionScreen
                    solution={solution}
                    setSolution={setSolution}
                    onSubmit={handleSubmitSolution}
                />
            )}

            {screen === "evaluation" && evaluation && (
                <EvaluationScreen
                    evaluation={evaluation}
                    onTryAnother={handleTryAnother}
                />
            )}
        </div>
    );
}
