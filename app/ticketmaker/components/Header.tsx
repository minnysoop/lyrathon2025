'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { signOut, onAuthStateChanged, User } from 'firebase/auth';

export function Header() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const performLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <header
            className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-zinc-800 bg-black"
        >
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                
                <button 
                    onClick={() => router.push("/")}
                    className="group flex items-center gap-3 focus:outline-none"
                >
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-white shadow-sm transition-transform group-hover:scale-105 group-hover:rotate-3">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="w-5 h-5 text-black"
                        >
                            <rect x="4" y="14" width="16" height="4" rx="1" className="opacity-50" />
                            <rect x="4" y="9" width="16" height="4" rx="1" className="opacity-80" />
                            <rect x="4" y="4" width="16" height="4" rx="1" />
                        </svg>
                    </div>

                    <div className="text-left">
                        <div className="text-sm font-bold tracking-tight text-white">
                            Ticket-to-Hire
                        </div>
                        <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors">
                            Real-World Hiring
                        </div>
                    </div>
                </button>

                {user && (
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-xs text-zinc-200">
                            {user.email}
                        </div>
                        <button
                            onClick={performLogout}
                            className="text-xs font-semibold px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-red-400 hover:border-red-900/50 transition-all shadow-sm"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}