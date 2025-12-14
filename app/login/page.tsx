'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase/config';

export default function Login() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/dashboard');
            } else {
                setIsCheckingAuth(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
            router.push('/dashboard');
        } catch (err: any) {
            console.error(err);
            setError("Failed to sign in. Please check your credentials.");
            setIsLoading(false);
        }
    };

    if (isCheckingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                 <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"/>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-black px-4 font-sans text-zinc-100">
            
            {/* --- BACK BUTTON --- */}
            <Link 
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M19 12H5"/>
                    <path d="m12 19-7-7 7-7"/>
                </svg>
                Back to Home
            </Link>

            <div className="w-full max-w-md">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        Enter your credentials to access the recruiter dashboard.
                    </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-none">
                    
                    {error && (
                        <div className="mb-6 p-3 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-2 text-sm text-red-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        
                        <div className="space-y-2">
                            <label 
                                htmlFor="email" 
                                className="block text-xs font-bold text-zinc-500 uppercase tracking-wider"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                                className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label 
                                    htmlFor="password" 
                                    className="block text-xs font-bold text-zinc-500 uppercase tracking-wider"
                                >
                                    Password
                                </label>
                                <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative flex items-center justify-center gap-2 bg-white text-zinc-900 px-6 py-3.5 rounded-xl font-semibold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:ring-4 focus:ring-zinc-800"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-900" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="16" 
                                        height="16" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        className="transition-transform group-hover:translate-x-1"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}