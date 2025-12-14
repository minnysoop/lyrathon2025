import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center font-sans text-white">
      
      <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Pill Badge */}
        <div className="mx-auto w-fit rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
          ✨ The Future of Technical Hiring
        </div>

        {/* H1 Heading */}
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
          Assess Engineers on <br />
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Real-World Impact.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto max-w-2xl text-lg text-zinc-400 sm:text-xl">
          Move beyond abstract algorithms. Transform your job descriptions into 
          <span className="font-semibold text-white"> realistic engineering challenges </span> 
          that let candidates showcase how they actually solve problems, write code, and build systems.
        </p>

        {/* CTA Button - Note: In dark mode, the button is WHITE with BLACK text */}
        <div className="flex justify-center pt-6">
          <Link
            href="/ticketmaker"
            className="group relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-zinc-900 transition-all hover:bg-zinc-200 hover:ring-4 hover:ring-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 shadow-lg"
          >
            Try it out
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
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Secondary Link */}
        <div className="text-m text-zinc-400 font-medium">
            Are you a recruiter?{' '}
            <Link 
              href="/login" 
              className="text-zinc-200 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Sign in
            </Link>
          </div>
      </div>
    </div>
  );
}