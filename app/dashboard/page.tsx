"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";
import { Header } from "@/app/ticketmaker/components/Header";
import { SubmissionModal } from "./components/SubmissionModal";

// Types
interface Ticket {
    id: string;
    title: string;
    project: string;
    createdAt: string;
}

interface Submission {
    id: string;
    ticketId: string;
    candidateEmail: string;
    solution: string;
    createdAt: string;
    evaluation: {
        level: string;
        summary: string;
        strengths: string[];
    };
}

export default function DashboardPage() {
    const router = useRouter();

    // State
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

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
            return "bg-purple-500/10 text-purple-400 border-purple-500/20";
        if (level?.includes("Mid"))
            return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans text-zinc-100 bg-zinc-50">
            <Header />

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">

                <div className="w-full md:w-1/3 space-y-4 bg-zinc-900 rounded-2xl shadow-2xl shadow-zinc-900/50 p-6 border border-zinc-800">
                    <h2 className="text-xl font-bold text-white px-2">Your Challenges</h2>

                    {isDataLoading ? (
                        <div className="animate-pulse space-y-3">
                            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-zinc-800 rounded-xl" />)}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {tickets.map(ticket => (
                                <button
                                    key={ticket.id}
                                    onClick={() => setSelectedTicketId(ticket.id)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${selectedTicketId === ticket.id
                                            ? "bg-white border-white shadow-lg shadow-black/20 scale-[1.02] z-10"

                                            : "bg-zinc-600 border-zinc-700 hover:bg-zinc-700 text-zinc-300"
                                        }`}
                                >
                                    <div className={`font-semibold text-sm mb-1 ${selectedTicketId === ticket.id ? "text-zinc-900" : "text-white"
                                        }`}>
                                        {ticket.title}
                                    </div>
                                    <div className={`text-xs font-mono ${selectedTicketId === ticket.id ? "text-zinc-500" : "text-zinc-400"
                                        }`}>
                                        {ticket.project}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full md:w-2/3 space-y-4 bg-zinc-900 rounded-2xl shadow-2xl shadow-zinc-900/50 p-6 border border-zinc-800 h-fit">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white px-2">
                            Candidate Submissions
                            <span className="ml-3 text-xs font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-1 rounded-full">
                                {submissions.length}
                            </span>
                        </h2>
                    </div>

                    <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl overflow-hidden">
                        {submissions.length === 0 ? (
                            <div className="p-12 text-center text-zinc-500">
                                <p>No submissions yet for this challenge.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-800">
                                {submissions.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => setSelectedSubmission(sub)}
                                        className="w-full text-left p-6 hover:bg-zinc-900 transition-colors group"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                                                    {sub.candidateEmail}
                                                </h3>
                                                <p className="text-xs text-zinc-500 mt-1">
                                                    {new Date(sub.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getLevelBadge(sub.evaluation?.level)}`}>
                                                {sub.evaluation?.level || "N/A"}
                                            </span>
                                        </div>

                                        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                                            "{sub.evaluation?.summary}"
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selectedSubmission && (
                <SubmissionModal
                    submission={selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                />
            )}
        </div>
    );
}