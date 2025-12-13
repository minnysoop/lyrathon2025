"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { evaluate } from "@/app/api/evaluate";
import { EvaluationScreen } from "@/app/ticketmaker/components/EvaluationScreen";
import { useRouter } from 'next/navigation';
import { addDoc, collection } from "firebase/firestore";

interface Ticket {
    title: string;
    project: string;
    stack: string;
    priority: string;
    context: string;
    task: string;
}

export default function CandidateSolvePage() {
    const params = useParams();
    const id = params?.id as string;

    // State
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [status, setStatus] = useState("loading"); // loading | ready | error
    const [solution, setSolution] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [evaluation, setEvaluation] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTicket = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, "tickets", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTicket(docSnap.data() as Ticket);
                    setStatus("ready");
                } else {
                    setStatus("error");
                }
            } catch (error) {
                console.error("Firebase fetch error:", error);
                setStatus("error");
            }
        };
        fetchTicket();
    }, [id]);

    const handleSubmit = async () => {
        if (!solution.trim()) return;

        if (!email.trim() || !email.includes('@')) {
            alert("Please enter a valid email address to submit.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const context = `
                Title: ${ticket?.title}
                Task: ${ticket?.task}
                Tech Stack: ${ticket?.stack}
            `;

            const result = await evaluate(context, solution);

            await addDoc(collection(db, "submissions"), {
                ticketId: id,
                solution: solution,
                evaluation: result,
                createdAt: new Date().toISOString(),
                candidateEmail: email,
            });
            setEvaluation(result);

        } catch (error) {
            alert("Error submitting solution. Please try again.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (evaluation) {
        return (
            <EvaluationScreen 
                evaluation={evaluation} 
                onTryAnother={() => router.push('/ticketmaker')}
            />
        );
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full"/>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">Challenge Not Found</h1>
                <p className="text-gray-500">This link might be invalid or expired.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gray-50 border-r border-gray-200 p-8 overflow-y-auto h-auto md:h-screen">
                <div className="max-w-xl mx-auto">
                    <div className="flex gap-2 mb-6">
                        <span className="px-2 py-1 bg-white border border-gray-200 text-xs font-mono rounded text-gray-600">
                            {ticket?.project}
                        </span>
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-mono rounded border border-red-200">
                            {ticket?.priority} Priority
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
                        {ticket?.title}
                    </h1>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Context</h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {ticket?.context}
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">The Task</h3>
                            <p className="font-medium text-gray-900 whitespace-pre-wrap">
                                {ticket?.task}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tech Stack</h3>
                            <p className="font-mono text-sm text-gray-600 bg-gray-200 inline-block px-2 py-1 rounded">
                                {ticket?.stack}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col h-screen">
                <div className="flex-1 flex flex-col max-w-xl mx-auto w-full">
                    <div className="mb-4">
                        <h2 className="font-bold text-lg">Architecture Plan</h2>
                        <p className="text-lg text-gray-500">How would you approach this? (No code required)</p>
                    </div>

                    <textarea 
                        className="flex-1 w-full p-4 border border-gray-200 rounded-xl font-mono text-sm text-black focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none bg-gray-50 focus:bg-white transition-colors"
                        placeholder="1. Diagnosis Strategy...&#10;2. Proposed Fix...&#10;3. Testing Plan..."
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                    />

                    <div className="mb-4 mt-4">
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                            Candidate Email
                        </label>
                        <input 
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm text-black focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white transition-colors"
                        />
                    </div>

                    <div>
                        <button 
                            onClick={handleSubmit}
                            disabled={isSubmitting || !solution.trim() || !email.trim()}
                            className="w-full bg-gray-500 text-white py-4 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"/>
                                    Analyzing Solution...
                                </span>
                            ) : (
                                "Submit for Review"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}