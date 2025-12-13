import { Header } from "@/app/ticketmaker/components/Header";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface EvaluationScreenProps {
    evaluation: {
        level: string;
        strengths: string[];
        gaps: string[];
        summary: string;
    };
    onTryAnother: () => void;
}

export function EvaluationScreen({ evaluation, onTryAnother }: EvaluationScreenProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header showStatus />
            <div className="flex-1 px-6 py-12">
                <div className="w-full max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl mb-2 text-foreground">AI Evaluation Result</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Score Card */}
                        <div className="bg-card border border-border rounded-lg p-8 shadow-sm text-center">
                            <div className="text-success text-3xl mb-2">
                                {evaluation.level}
                            </div>
                        </div>

                        {/* Strengths */}
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

                        {/* Gaps */}
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

                        {/* Summary */}
                        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                            <h3 className="text-xl mb-4 text-foreground">Overall Summary</h3>
                            <p className="text-foreground leading-relaxed">{evaluation.summary}</p>
                        </div>

                        {/* Try Another Button */}
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
