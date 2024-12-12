export default function socketController(io) {
  io.on("connection", async (socket) => {
    socket.on("send_prompt", async (data) => {
      
      const response = "This is an AI Dataset trained by Itahari Namuna College Team A to provide personalized health insights and actionable recommendations, including pain relief methods, medical treatment options, and preventive measures."

      socket.emit("response", response);
    });

    socket.on("disconnect", (reason) => {
      console.log("disconnected " + socket.id + " due to " + reason);
    });
  });
}
