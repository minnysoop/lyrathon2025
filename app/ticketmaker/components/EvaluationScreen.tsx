import { CheckCircle, AlertTriangle } from "lucide-react";

import EvaluationScreenProps from "@/app/props/EvaluationScreenProps";

// function SignalBar({ label, score }: { label: string; score: number }) {
//     return (
//         <div>
//             <div className="flex justify-between text-sm mb-1">
//                 <span className="text-foreground">{label}</span>
//                 <span className="text-muted-foreground">{score}/5</span>
//             </div>
//             <div className="h-2 w-full bg-border rounded">
//                 <div
//                     className="h-2 rounded bg-primary transition-all"
//                     style={{ width: `${(score / 5) * 100}%` }}
//                 />
//             </div>
//         </div>
//     );
// }

function SignalBar({ label, score }: { label: string; score: number }) {
    // Map score to color
    const getColor = (score: number) => {
        switch (score) {
            case 1:
                return "#EF4444"; // red
            case 2:
                return "#F97316"; // orange
            case 3:
                return "#FACC15"; // yellow
            case 4:
                return "#86EFAC"; // light green
            case 5:
                return "#16A34A"; // dark green
            default:
                return "#D1D5DB"; // gray fallback
        }
    };

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1 text-sm">
                <span className="text-foreground">{label}</span>
                <span className="text-muted-foreground">{score}/5</span>
            </div>
            <div className="h-4 w-full bg-gray-200 rounded">
                <div
                    className="h-4 rounded transition-all"
                    style={{
                        width: `${(score / 5) * 100}%`,
                        backgroundColor: getColor(score),
                    }}
                />
            </div>
        </div>
    );
}



export function EvaluationScreen({ evaluation, onTryAnother }: EvaluationScreenProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 px-6 py-12">
                <div className="w-full max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl mb-2 text-foreground">AI Evaluation Result</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-lg p-8 shadow-sm text-center">
                            <div className="text-success text-3xl mb-2">
                                {evaluation.level}
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                            <h3 className="text-xl mb-6 text-foreground">
                                Hiring Signal Breakdown
                            </h3>

                            <div className="space-y-4">
                                <SignalBar
                                    label="System Thinking"
                                    score={evaluation.signals.systemThinking}
                                />
                                <SignalBar
                                    label="Debugging Approach"
                                    score={evaluation.signals.debugging}
                                />
                                <SignalBar
                                    label="Communication Clarity"
                                    score={evaluation.signals.communication}
                                />
                                <SignalBar
                                    label="Risk Awareness (Idempotency, Testing)"
                                    score={evaluation.signals.riskAwareness}
                                />
                            </div>
                        </div>


                        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                            <h3 className="text-xl mb-4 text-foreground flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-success" />
                                Strengths
                            </h3>
                            <ul className="space-y-2">
                                {evaluation.strengths.map((strength, index) => (
                                    <li key={index} className="flex items-start gap-2 text-foreground">
                                        <span className="text-success mt-1">✔</span>
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                            <h3 className="text-xl mb-4 text-foreground flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" style={{ color: 'var(--warning)' }} />
                                Gaps
                            </h3>
                            <ul className="space-y-2">
                                {evaluation.gaps.map((gap, index) => (
                                    <li key={index} className="flex items-start gap-2 text-foreground">
                                        <span className="mt-1" style={{ color: 'var(--warning)' }}>⚠</span>
                                        <span>{gap}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                            <h3 className="text-xl mb-4 text-foreground">Overall Summary</h3>
                            <p className="text-foreground leading-relaxed">{evaluation.summary}</p>
                        </div>

                        <button
                            onClick={onTryAnother}
                            className="w-full bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors border border-border"
                        >
                            Try another JD
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
