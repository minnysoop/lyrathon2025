import { Header } from "./Header";

interface TicketScreenProps {
    ticket: {
        title: string;
        project: string;
        stack: string;
        priority: string;
        context: string;
        task: string;
    };
    onStartSolution: () => void;
}

export function TicketScreen({ ticket, onStartSolution }: TicketScreenProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header showStatus />
            <div className="flex-1 px-6 py-12">
                <div className="w-full max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl mb-2 text-foreground">Generated Engineering Ticket</h2>
                        <p className="text-muted-foreground">Based on the job description you provided</p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
                        <h3 className="text-2xl mb-4 text-foreground">{ticket.title}</h3>

                        <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                            <div>
                                <span className="text-foreground">Project:</span> {ticket.project}
                            </div>
                            <div>|</div>
                            <div>
                                <span className="text-foreground">Stack:</span> {ticket.stack}
                            </div>
                            <div>|</div>
                            <div>
                                <span className="text-foreground">Priority:</span>
                                <span className="ml-1 text-destructive">{ticket.priority}</span>
                            </div>
                        </div>

                        <div className="bg-muted rounded-lg p-6 mb-6">
                            <pre className="whitespace-pre-wrap text-sm text-foreground">
                                <code>
                                    {`Context:
${ticket.context}

Task:
${ticket.task}`}
                                </code>
                            </pre>
                        </div>

                        <button
                            onClick={onStartSolution}
                            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Start My Solution →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
