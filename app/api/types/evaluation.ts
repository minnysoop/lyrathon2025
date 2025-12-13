export const evaluationSchema = {
    type: "OBJECT",
    properties: {
        level: { 
            type: "STRING", 
            enum: ["Junior", "Mid-Level", "Senior", "Staff"] 
        },
        strengths: { 
            type: "ARRAY", 
            items: { type: "STRING" } 
        },
        gaps: { 
            type: "ARRAY", 
            items: { type: "STRING" } 
        },
        summary: { type: "STRING" }
    },
    required: ["level", "strengths", "gaps", "summary"]
};