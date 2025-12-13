export default interface LandingScreenProps {
    jobDescription: string;
    setJobDescription: (value: string) => void;
    onGenerate: () => void;
}
