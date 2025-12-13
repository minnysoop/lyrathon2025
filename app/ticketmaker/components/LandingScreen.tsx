import { Header } from "./Header";

interface LandingScreenProps {
    jobDescription: string;
    setJobDescription: (value: string) => void;
    onGenerate: () => void;
}

export function LandingScreen({ jobDescription, setJobDescription, onGenerate }: LandingScreenProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl mb-4 text-foreground">
                            Stop reversing binary trees. Start solving real tickets.
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Paste a job description. Get a realistic engineering task. Explain how you would solve it.
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
                        <label htmlFor="job-description" className="block mb-3 text-foreground">
                            Job Description
                        </label>
                        <textarea
                            id="job-description"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description here…&#10;(e.g. Senior Frontend Engineer – React, Redux, GraphQL)"
                            className="w-full h-48 px-4 py-3 border border-input rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                        <button
                            onClick={onGenerate}
                            disabled={!jobDescription.trim()}
                            className="w-full mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Generate Real-World Ticket →
                        </button>
                    </div>

                    <div className="text-center mt-8 text-sm text-muted-foreground">
                        Built for Lyrathon Hackathon
                    </div>
                </div>
            </div>
        </div>
    );
}
