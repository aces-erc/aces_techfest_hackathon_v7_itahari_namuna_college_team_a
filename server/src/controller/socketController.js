import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to get the OpenAI response
const openai_response = async (data) => {
  try {

    const completion = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:mern-stack-developer:arogenai:AdgqBSNs",
      messages: [{ role: "user", content: data }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error from OpenAI:", error);
    return "Error fetching response from OpenAI.";
  }
};

export default function socketController(io) {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for "send_prompt" events
    socket.on("send_prompt", async (data) => {
      console.log("Received prompt:", data); // Log the prompt received from the client

      try {
        // Wait for the OpenAI response
        const response = await openai_response(data);

        console.log("OpenAI Response:", response);

        // Emit the response to the client
        socket.emit("response", response);
      } catch (error) {
        console.error("Error processing prompt:", error);

        // Emit an error message to the client
        socket.emit("response", "Failed to process the prompt. Please try again.");
      }
    });

    // Handle disconnection
    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${socket.id} due to ${reason}`);
    });
  });
}
