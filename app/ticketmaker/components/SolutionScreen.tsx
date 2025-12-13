import { Header } from "./Header";

interface SolutionScreenProps {
    solution: string;
    setSolution: (value: string) => void;
    onSubmit: () => void;
}

export function SolutionScreen({ solution, setSolution, onSubmit }: SolutionScreenProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header showStatus />
            <div className="flex-1 px-6 py-12">
                <div className="w-full max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl mb-2 text-foreground">Your Solution Approach</h2>
                        <p className="text-muted-foreground">
                            No code required. Explain how you would approach this as an engineer.
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
                        <textarea
                            value={solution}
                            onChange={(e) => setSolution(e.target.value)}
                            placeholder={`I would start by reproducing the issue locally…\nThen inspect Redux action dispatches…\nI would consider debouncing, optimistic updates, or request locking…`}
                            className="w-full h-96 px-4 py-3 border border-input rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                        />

                        <p className="text-xs text-muted-foreground mt-4 mb-6">
                            We evaluate clarity, reasoning, and seniority — not syntax.
                        </p>

                        <button
                            onClick={onSubmit}
                            disabled={!solution.trim()}
                            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Submit for Evaluation →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
