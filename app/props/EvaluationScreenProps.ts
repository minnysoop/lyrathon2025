export default interface EvaluationScreenProps {
    evaluation: {
        level: string;
        strengths: string[];
        gaps: string[];
        summary: string;
    };
    onTryAnother: () => void;
}