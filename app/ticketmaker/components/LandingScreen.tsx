import LandingScreenProps from "@/app/props/LandingScreenProps";

export function LandingScreen({ jobDescription, setJobDescription, onGenerate }: LandingScreenProps) {
    return (
        <div className="flex flex-col">
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                    
                    <div className="text-center mb-12 space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-white leading-tight">
                            Stop reversing linked lists.<br/>
                            <span className="text-zinc-500 dark:text-zinc-400">
                                Start solving real tickets.
                            </span>
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
                            Paste a job description. Get a realistic engineering task. Explain how you would solve it.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                        <div className="p-6">
                            <label htmlFor="job-description" className="sr-only">
                                Job Description
                            </label>
                            <textarea
                                id="job-description"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job description here…&#10;(e.g. Senior Frontend Engineer – React, Redux, GraphQL)"
                                className="w-full h-48 p-4 text-base bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-transparent resize-none transition-all"
                            />
                        </div>
                        
                        <div className="px-6 pb-6">
                            <button
                                onClick={onGenerate}
                                disabled={!jobDescription.trim()}
                                className="w-full group relative flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:ring-4 focus:ring-zinc-200 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-800"
                            >
                                <span>Generate Real-World Ticket</span>
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
