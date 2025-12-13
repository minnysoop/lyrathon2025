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
        summary: { type: "STRING" },
        signals: {
            type: "OBJECT",
            properties: {
                systemThinking: {
                    type: "NUMBER",
                    minimum: 1,
                    maximum: 5,
                },
                debugging: {
                    type: "NUMBER",
                    minimum: 1,
                    maximum: 5,
                },
                communication: {
                    type: "NUMBER",
                    minimum: 1,
                    maximum: 5,
                },
                riskAwareness: {
                    type: "NUMBER",
                    minimum: 1,
                    maximum: 5,
                },
                required: [
                    "systemThinking",
                    "debugging",
                    "communication",
                    "riskAwareness",
                ],
            },
        },
    },
    required: ["level", "strengths", "gaps", "summary", "signals"],
};