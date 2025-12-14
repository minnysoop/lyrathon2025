import { X } from "lucide-react";

interface SubmissionModalProps {
    submission: any;
    onClose: () => void;
}

export function SubmissionModal({ submission, onClose }: SubmissionModalProps) {
    if (!submission) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">

                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur">
                    <div>
                        <h2 className="text-lg font-bold text-white">{submission.candidateEmail}</h2>
                        <p className="text-xs text-zinc-400">
                            Submitted on {new Date(submission.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">AI Assessment</h3>
                            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border 
                                        ${submission.evaluation.level.includes("Senior") ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : 
                                          submission.evaluation.level.includes("Mid") ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : 
                                          "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
                                        {submission.evaluation.level}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-300 leading-relaxed">
                                    {submission.evaluation.summary}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Key Strengths</h3>
                            <div className="flex flex-wrap gap-2">
                                {submission.evaluation.strengths?.map((strength: string, i: number) => (
                                    <span key={i} className="px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                        {strength}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <hr className="border-zinc-800" />
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Candidate Solution</h3>
                        <div className="relative group">
                            <pre className="p-6 rounded-xl bg-black border border-zinc-800 overflow-x-auto text-sm text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">
                                {submission.solution}
                            </pre>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}