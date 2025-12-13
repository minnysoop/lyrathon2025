export const ticketSchema = {
  type: "OBJECT",
  properties: {
    title: { type: "STRING" },
    project: { type: "STRING" },
    stack: { type: "STRING" },
    priority: { 
      type: "STRING", 
      enum: ["Low", "Medium", "High", "Critical"] 
    },
    context: { type: "STRING" },
    task: { type: "STRING" },
  },
  required: ["title", "project", "stack", "priority", "context", "task"],
};