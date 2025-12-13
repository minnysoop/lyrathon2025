export default interface EvaluationScreenProps {
    evaluation: {
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
    };
    onTryAnother: () => void;
}