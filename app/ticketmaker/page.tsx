'use client'

import { useState } from "react";
import { LandingScreen } from "./components/LandingScreen";
import { TicketScreen } from "./components/TicketScreen";
import { SolutionScreen } from "./components/SolutionScreen";
import { EvaluationScreen } from "./components/EvaluationScreen";

import { generate } from "@/app/api/generate";
import { evaluate } from "@/app/api/evaluate";

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
async function generateTicket(jobDescription: string): Promise<Ticket> {
    return await generate(jobDescription)
}

export default function Ticketmaster() {
    const [screen, setScreen] = useState<Screen>("landing");
    const [jobDescription, setJobDescription] = useState("");
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [solution, setSolution] = useState("");
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

    const handleGenerateTicket = async () => {
        const generatedTicket = await generateTicket(jobDescription);
        setTicket(generatedTicket);
        setScreen("ticket");
    };

    const handleStartSolution = () => {
        setScreen("solution");
    };

    const handleSubmitSolution = async () => {
        const generatedEvaluation = await evaluate(solution);
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
