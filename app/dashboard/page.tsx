"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";
import { Header } from "@/app/ticketmaker/components/Header";
import { signOut } from 'firebase/auth';

interface Ticket {
    id: string;
    title: string;
    project: string;
    createdAt: string;
}

interface Submission {
    id: string;
    candidateEmail: string;
    createdAt: string;
    evaluation: {
        level: string;
        summary: string;
        strengths: string[];
    };
}

export default function DashboardPage() {
    const router = useRouter();
    
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthLoading(false);
            } else {
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (isAuthLoading) return; 

        const fetchTickets = async () => {
            try {
                const q = query(collection(db, "tickets"));
                const snapshot = await getDocs(q);
                
                const ticketsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Ticket[];

                setTickets(ticketsData);
                
                if (ticketsData.length > 0) {
                    setSelectedTicketId(ticketsData[0].id);
                }
            } catch (error) {
                console.error("Error fetching tickets:", error);
            } finally {
                setIsDataLoading(false);
            }
        };

        fetchTickets();
    }, [isAuthLoading]);

    const performLogout = async () => {
            try {
                await signOut(auth);
                router.push('/')
            } catch (error) {
                console.error("Error signing out:", error);
            }
        };

    useEffect(() => {
        if (!selectedTicketId) return;
        
        const fetchSubmissions = async () => {
            setSubmissions([]);
            try {
                const q = query(
                    collection(db, "submissions"),
                    where("ticketId", "==", selectedTicketId)
                );
                const snapshot = await getDocs(q);
                const subsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Submission[];

                setSubmissions(subsData);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            }
        };

        fetchSubmissions();
    }, [selectedTicketId]);

    const getLevelBadge = (level: string) => {
        if (level?.includes("Senior") || level?.includes("Staff")) 
            return "bg-purple-100 text-purple-700 border-purple-200";
        if (level?.includes("Mid")) 
            return "bg-blue-100 text-blue-700 border-blue-200";
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full"/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 font-sans">
            <Header />
            
            <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-8">
                
                <div className="w-full md:w-1/3 space-y-4">

                    <h2 className="text-xl font-bold text-zinc-900 px-2">Your Challenges</h2>

                    <button
                            onClick={() => performLogout()}
                            className="text-xs font-medium text-zinc-500 hover:text-red-600 transition-colors"
                        >
                            Sign Out
                    </button>
                    
                    {isDataLoading ? (
                         <div className="animate-pulse space-y-3">
                            {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-200 rounded-xl"/>)}
                         </div>
                    ) : (
                        <div className="space-y-3">
                            {tickets.map(ticket => (
                                <button
                                    key={ticket.id}
                                    onClick={() => setSelectedTicketId(ticket.id)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                                        selectedTicketId === ticket.id 
                                            ? "bg-white border-black shadow-md ring-1 ring-black" 
                                            : "bg-white border-zinc-200 hover:border-zinc-400 text-zinc-600"
                                    }`}
                                >
                                    <div className="font-semibold text-sm mb-1">{ticket.title}</div>
                                    <div className="text-xs text-zinc-400 font-mono">{ticket.project}</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT MAIN: CANDIDATE LIST */}
                <div className="w-full md:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-zinc-900">
                            Candidate Submissions 
                            <span className="ml-2 text-sm font-normal text-zinc-500 bg-zinc-200 px-2 py-0.5 rounded-full">
                                {submissions.length}
                            </span>
                        </h2>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                        {submissions.length === 0 ? (
                            <div className="p-12 text-center text-zinc-400">
                                <p>No submissions yet for this challenge.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-100">
                                {submissions.map((sub) => (
                                    <div key={sub.id} className="p-6 hover:bg-zinc-50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-zinc-900">{sub.candidateEmail}</h3>
                                                <p className="text-xs text-zinc-400">
                                                    {new Date(sub.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getLevelBadge(sub.evaluation?.level)}`}>
                                                {sub.evaluation?.level || "N/A"}
                                            </span>
                                        </div>
                                        
                                        <p className="text-sm text-zinc-600 leading-relaxed bg-zinc-50 p-3 rounded border border-zinc-100">
                                            "{sub.evaluation?.summary}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}