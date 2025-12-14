import { CheckCircle, AlertTriangle, Download, Share2, TrendingUp, Award, Target } from "lucide-react";
import { useState } from "react";

import EvaluationScreenProps from "@/app/props/EvaluationScreenProps";

// function SignalBar({ label, score }: { label: string; score: number }) {
//     return (
//         <div>
//             <div className="flex justify-between text-sm mb-1">
//                 <span className="text-foreground">{label}</span>
//                 <span className="text-muted-foreground">{score}/5</span>
//             </div>
//             <div className="h-2 w-full bg-border rounded">
//                 <div
//                     className="h-2 rounded bg-primary transition-all"
//                     style={{ width: `${(score / 5) * 100}%` }}
//                 />
//             </div>
//         </div>
//     );
// }



function SignalBar({ label, score }: { label: string; score: number }) {
    const getColor = (score: number) => {
        switch (score) {
            case 1: return "#EF4444";
            case 2: return "#F97316";
            case 3: return "#FACC15";
            case 4: return "#86EFAC";
            case 5: return "#16A34A";
            default: return "#D1D5DB";
        }
    };

    const getGradient = (score: number) => {
        switch (score) {
            case 1: return "from-red-500 to-red-600";
            case 2: return "from-orange-500 to-orange-600";
            case 3: return "from-yellow-400 to-yellow-500";
            case 4: return "from-green-400 to-green-500";
            case 5: return "from-green-500 to-green-600";
            default: return "from-gray-600 to-gray-700";
        }
    };

    return (
        <div className="mb-5 group">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">{label}</span>
                <span className="text-sm font-bold px-2 py-1 rounded" style={{ backgroundColor: getColor(score) + "30", color: getColor(score) }}>
                    {score}/5
                </span>
            </div>
            <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden shadow-inner">
                <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getGradient(score)} transition-all duration-700 ease-out shadow-sm`}
                    style={{ width: `${(score / 5) * 100}%` }}
                />
            </div>
        </div>
    );
}


function RadarChart({ signals }: { signals: Record<string, number> }) {
    const metrics = Object.entries(signals);
    const totalScore = metrics.reduce((sum, [, score]) => sum + score, 0);
    const maxScore = metrics.length * 5;
    const percentage = (totalScore / maxScore) * 100;

    return (
        <div className="relative w-32 h-32 mx-auto">
            <svg className="transform -rotate-90" viewBox="0 0 120 120">
                <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="8"
                />
                <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54 * (1 - percentage / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">{Math.round(percentage)}</span>
                <span className="text-xs text-gray-400">Overall</span>
            </div>
        </div>
    );
}


const calculateAverageScore = (signals: Record<string, number>) => {
    const scores = Object.values(signals);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return average.toFixed(1); // Returns one decimal place
};

export function EvaluationScreen({ evaluation, onTryAnother }: EvaluationScreenProps) {
    const [showDetails, setShowDetails] = useState(true);

    // const handleDownload = () => {
    //     alert("Download functionality - export as PDF");
    // };

    // const handleShare = () => {
    //     alert("Share functionality - copy link or share via email");
    // };

    return (
        <div className="min-h-screen bg-black">
            {/* Floating orbs for visual interest */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-blue-900 rounded-full mix-blend-lighten filter blur-xl opacity-20 animate-pulse" />
            <div className="fixed bottom-20 right-10 w-72 h-72 bg-purple-900 rounded-full mix-blend-lighten filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative px-6 py-12">
                <div className="w-full max-w-5xl mx-auto">
                    {/* Header with actions */}
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                AI Evaluation Results
                            </h2>
                            <p className="text-gray-400">Comprehensive analysis of your technical interview</p>
                        </div>
                        {/* <div className="flex gap-2">
                            <button
                                onClick={handleShare}
                                className="p-3 bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-800 hover:border-gray-700"
                            >
                                <Share2 className="w-5 h-5 text-gray-400" />
                            </button>
                            <button
                                onClick={handleDownload}
                                className="p-3 bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-800 hover:border-gray-700"
                            >
                                <Download className="w-5 h-5 text-gray-400" />
                            </button>
                        </div> */}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Level card with visual emphasis */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-8 text-white shadow-xl">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-blue-300 text-sm font-medium mb-2">Your Level</p>
                                    <h3 className="text-3xl font-bold mb-4">{evaluation.level}</h3>
                                </div>
                                <Award className="w-12 h-12 text-white opacity-80" />
                            </div>
                            <p className="text-blue-100 leading-relaxed">
                                {evaluation.summary.slice(0, 150)}...
                            </p>
                        </div>

                        {/* Score overview */}
                        <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800">
                            <RadarChart signals={evaluation.signals} />
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-400">Performance Score</p>
                                <div className="flex items-center justify-center gap-1 mt-1">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    <span className="text-xs text-green-400 font-medium">Developing</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Signal breakdown */}
                    {/* <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800 mb-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Target className="w-6 h-6 text-blue-400" />
                                Hiring Signal Breakdown
                            </h3>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                            >
                                {showDetails ? 'Hide' : 'Show'} Details
                            </button>
                        </div>

                        {showDetails && (
                            <div className="space-y-1">
                                <SignalBar label="System Thinking" score={evaluation.signals.systemThinking} />
                                <SignalBar label="Debugging Approach" score={evaluation.signals.debugging} />
                                <SignalBar label="Communication Clarity" score={evaluation.signals.communication} />
                                <SignalBar label="Risk Awareness (Idempotency, Testing)" score={evaluation.signals.riskAwareness} />
                            </div>
                        )}
                    </div> */}


                    {/* Signal breakdown */}
                    <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800 mb-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Target className="w-6 h-6 text-blue-400" />
                                Hiring Signal Breakdown
                                {!showDetails && (
                                    <span className="text-lg font-semibold text-blue-400 ml-2">
                                        {calculateAverageScore(evaluation.signals)}/5
                                    </span>
                                )}
                            </h3>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                            >
                                {showDetails ? 'Hide' : 'Show'} Details
                            </button>
                        </div>

                        {showDetails && (
                            <div className="space-y-1">
                                <SignalBar label="System Thinking" score={evaluation.signals.systemThinking} />
                                <SignalBar label="Debugging Approach" score={evaluation.signals.debugging} />
                                <SignalBar label="Communication Clarity" score={evaluation.signals.communication} />
                                <SignalBar label="Risk Awareness (Idempotency, Testing)" score={evaluation.signals.riskAwareness} />
                            </div>
                        )}
                    </div>


                    {/* Strengths and Gaps side by side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Strengths */}
                        <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-green-900/30">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                Strengths
                            </h3>
                            <ul className="space-y-3">
                                {evaluation.strengths.map((strength, index) => (
                                    <li key={index} className="flex items-start gap-3 group">
                                        <span className="text-green-500 mt-0.5 text-lg">✓</span>
                                        <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                                            {strength}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Gaps */}
                        <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-amber-900/30">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                                <AlertTriangle className="w-6 h-6 text-amber-500" />
                                Areas for Growth
                            </h3>
                            <ul className="space-y-3">
                                {evaluation.gaps.map((gap, index) => (
                                    <li key={index} className="flex items-start gap-3 group">
                                        <span className="text-amber-500 mt-0.5 text-lg">⚠</span>
                                        <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                                            {gap}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Full summary */}
                    <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800 mb-6">
                        <h3 className="text-xl font-bold text-white mb-4">Detailed Summary</h3>
                        <p className="text-gray-300 leading-relaxed">{evaluation.summary}</p>
                    </div>

                    {/* //Action buttons
                    <div className="flex gap-4">
                        <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl">
                            Try Another Evaluation
                        </button>
                        <button className="px-8 py-4 bg-gray-900 text-gray-300 rounded-xl hover:bg-gray-800 transition-all font-semibold border border-gray-800 shadow-sm">
                            View History
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}