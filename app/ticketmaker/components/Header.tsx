'use client';

import { useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();
    return (
        <div className="w-full border-b border-border bg-card px-6 py-4" onClick={() => {
            router.push("/");
        }}>
            <div className="max-w-3xl mx-auto flex items-center justify-between" >
                <div className="flex items-center gap-2">
                    {/* <span className="text-2xl">🎟️</span> */}
                    <div>
                        <div className="text-foreground">Ticket-to-Hire</div>
                        <div className="text-xs text-muted-foreground">Real-world hiring, without LeetCode</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
