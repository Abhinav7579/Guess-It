import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
const rooms = [];
wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.on("message", (message) => {
        try {
            const { type, roomId } = JSON.parse(message.toString());
            if (type === "createRoom") {
                // check if room already exists
                if (rooms.find((r) => r.room === roomId)) {
                    ws.send(JSON.stringify({ type: "error", msg: "Room already exists" }));
                    return;
                }
                // create new room
                rooms.push({
                    clients: [ws],
                    room: roomId,
                });
                ws.send(JSON.stringify({ type: "roomCreated", roomId }));
                console.log(`Room created: ${roomId}`);
            }
            if (type === "joinRoom") {
                const room = rooms.find((r) => r.room === roomId);
                if (room) {
                    if (room.clients.length < 2) {
                        room.clients.push(ws);
                        ws.send(JSON.stringify({ type: "joinedRoom", roomId }));
                        console.log(`Client joined room: ${roomId}`);
                    }
                }
                else {
                    ws.send(JSON.stringify({ type: "error", msg: "Room not found or is full" }));
                }
            }
        }
        catch (err) {
            console.error("Invalid message:", err);
        }
    });
    ws.on("close", () => {
        console.log("Client disconnected");
        // remove ws from rooms
        for (const room of rooms) {
            room.clients = room.clients.filter((client) => client !== ws);
        }
    });
});
console.log("WebSocket server running on ws://localhost:8080");
//# sourceMappingURL=index.js.map