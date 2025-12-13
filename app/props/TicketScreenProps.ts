export default interface TicketScreenProps {
    ticket: {
        title: string;
        project: string;
        stack: string;
        priority: string;
        context: string;
        task: string;
    };
    onCreateLink: () => void;
    shareUrl: string | null;
    isSaving: boolean;
}