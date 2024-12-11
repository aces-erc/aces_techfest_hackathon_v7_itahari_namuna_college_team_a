export default function socketController(io) {
  io.on("connection", async (socket) => {
    socket.on("send_prompt", async (data) => {
      const index = Number(data);
      //console.log(index);
      socket.emit("response", resultObj);
      console.log("Invalid folder index received");
    });

    socket.on("disconnect", (reason) => {
      console.log("disconnected " + socket.id + " due to " + reason);
    });
  });
}
