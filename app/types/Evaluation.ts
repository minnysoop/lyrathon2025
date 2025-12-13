export default interface Evaluation {
    level: string;
    strengths: string[];
    gaps: string[];
    summary: string;
    signals: {
        systemThinking: number;
        debugging: number;
        communication: number;
        riskAwareness: number;
    };
}