"use client";

import { useState } from "react";
import TicketScreenProps from "@/app/props/TicketScreenProps";

export function TicketScreen({
  ticket,
  onCreateLink,
  shareUrl,
  isSaving,
}: TicketScreenProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    if (!shareUrl) return;

    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-foreground text-background px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
          Copied URL to clipboard
        </div>
      )}

      <div className="flex-1 px-6 py-6">
        <div className="w-full max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl mb-2 text-foreground">
              Generated Engineering Ticket
            </h2>
            <p className="text-muted-foreground">
              Based on the job description you provided
            </p>
          </div>

          <div className="space-y-4 mb-6">
              {!shareUrl ? (
                <button
                  onClick={onCreateLink}
                  disabled={isSaving}
                  className="w-full bg-secondary text-secondary-foreground border border-border px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    "Generating Link..."
                  ) : (
                    <>
                      <span>Create Shareable Link</span>
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
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </>
                  )}
                </button>
              ) : (
                <div className="flex gap-2 animate-in fade-in slide-in-from-top-2">
                  <input
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-muted border border-border rounded-lg px-4 text-sm text-muted-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    onClick={handleCopy}
                    disabled={isCopying}
                    className="bg-foreground text-background px-6 py-2 rounded-lg font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>

          <div className="bg-card border border-border rounded-lg p-4 bg-stone-50 dark:bg-muted/20">
            <h3 className="text-2xl m-6 text-foreground text-stone-900">{ticket.title}</h3>

            <div className="flex flex-wrap gap-4 m-6 mb-2 text-sm text-muted-foreground text-stone-900">
              <div>
                <span className="text-foreground text-stone-900">Project:</span>{" "}
                {ticket.project}
              </div>
              <div>
                <span className="text-foreground text-stone-900">Stack:</span> {ticket.stack}
              </div>
              <div>
                <span className="text-foreground text-stone-900">Priority:</span>
                <span className="ml-1 text-destructive text-stone-900">{ticket.priority}</span>
              </div>
            </div>

            <div className="bg-stone-50 dark:bg-muted/20 rounded-lg p-6 mb-6 space-y-6 text-stone-900">
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Context
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-sans text-stone-900">
                        {ticket.context}
                    </p>
                </div>

                <div className="h-px w-full bg-border/20" />

                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Task
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-sans text-stone-900">
                        {ticket.task}
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}