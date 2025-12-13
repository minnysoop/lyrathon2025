'use client'

import { useState } from "react";
import { LandingScreen } from "./components/LandingScreen";
import { TicketScreen } from "./components/TicketScreen";
import { generate } from "@/app/api/generate";
import { db } from "@/app/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import Ticket from "@/app/types/Ticket"
import { Header } from "./components/Header";

type Screen = "landing" | "ticket";

async function generateTicket(jobDescription: string): Promise<Ticket> {
    return await generate(jobDescription)
}

export default function Ticketmaster() {
    const [screen, setScreen] = useState<Screen>("landing");
    const [jobDescription, setJobDescription] = useState("");
    const [ticket, setTicket] = useState<Ticket | null>(null);

    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleGenerateTicket = async () => {
        const generatedTicket = await generateTicket(jobDescription);
        setTicket(generatedTicket);
        setScreen("ticket");
    };

    const handleCreateLink = async () => {
        if (!ticket) return;
        setIsSaving(true);

        try {
            const docRef = await addDoc(collection(db, "tickets"), {
                ...ticket,
                createdAt: new Date().toISOString(),
            });

            const url = `${window.location.origin}/solve/${docRef.id}`;
            setShareUrl(url);
            
            await navigator.clipboard.writeText(url);

        } catch (error) {
            console.error("Error creating link:", error);
            alert("Failed to save ticket.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <Header />
            {screen === "landing" && (
                <LandingScreen
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                    onGenerate={handleGenerateTicket}
                />
            )}

            {screen === "ticket" && ticket && (
                <TicketScreen
                ticket={ticket}
                onCreateLink={handleCreateLink} 
                shareUrl={shareUrl}
                isSaving={isSaving}
            />
            )}
        </div>
    );
}
