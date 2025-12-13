interface HeaderProps {
    showStatus?: boolean;
}

export function Header({ showStatus }: HeaderProps) {
    return (
        <div className="w-full border-b border-border bg-card px-6 py-4">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🎟️</span>
                    <div>
                        <div className="text-foreground">Ticket-to-Hire</div>
                        <div className="text-xs text-muted-foreground">Real-world hiring, without LeetCode</div>
                    </div>
                </div>
                {showStatus && (
                    <div className="flex items-center gap-2 text-sm text-success">
                        <span>JD Loaded</span>
                        <span>✓</span>
                    </div>
                )}
            </div>
        </div>
    );
}
