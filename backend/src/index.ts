import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

type Room = {
  clients: WebSocket[];
  room: string;
  numbers: { [clientId: string]: number }; // player -> their secret number
  turnIndex: number; // 0 or 1
  min: number;
  max: number;
  gameOver: boolean;
};

const rooms: Room[] = [];

// helper to map WebSocket to an ID
function getClientId(ws: WebSocket) {
  return (ws as any)._socket.remotePort.toString(); // quick unique id
}

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());
      const { type, roomId } = data;

      if (type === "createRoom") {
        if (rooms.find((r) => r.room === roomId)) {
          ws.send(JSON.stringify({ type: "error", msg: "Room already exists" }));
          return;
        }

        rooms.push({
          clients: [ws],
          room: roomId,
          numbers: {},
          turnIndex: 0,
          min: 1,
          max: 100,
          gameOver: false,
        });

        ws.send(JSON.stringify({ type: "roomCreated", roomId }));
        console.log(`Room created: ${roomId}`);
      }

     if (type === "joinRoom") {
  const room = rooms.find((r) => r.room === roomId);
  if (!room) {
    ws.send(JSON.stringify({ type: "error", msg: "Room not found" }));
    return;
  }

  if (room.clients.length >= 2) {
    ws.send(JSON.stringify({ type: "error", msg: "Room full" }));
    return;
  }

  // Add new player
  room.clients.push(ws);
  ws.send(JSON.stringify({ type: "joinedRoom", roomId }));
  console.log(`Client joined room: ${roomId}`);

  // ✅ If 2 players now → notify both
  if (room.clients.length === 2) {
    room.clients.forEach((client, i) => {
      client.send(
        JSON.stringify({
          type: "roomReady", // ✅ matches your Game.tsx
          turn: i === room.turnIndex, // first player's turn
        })
      );
    });
    console.log(`Room ${roomId} is now full → game can start`);
  }
}


      if (type === "guess") {
        const room = rooms.find((r) => r.room === roomId);
        if (!room || room.gameOver) return;

        const playerIndex = room.clients.indexOf(ws);
        if (playerIndex !== room.turnIndex) {
          ws.send(JSON.stringify({ type: "error", msg: "Not your turn" }));
          return;
        }

        const opponentIndex = playerIndex === 0 ? 1 : 0;
const opponentWs = room.clients[opponentIndex];

if (!opponentWs) {
  console.error("Opponent not found in room");
  return;
}

const opponentId = getClientId(opponentWs);
const opponentNumber = room.numbers[opponentId];

        const guess = data.guess;
        if (guess === opponentNumber) {
          room.clients.forEach((client, i) => {
            client.send(JSON.stringify({
              type: "win",
              winner: playerIndex + 1,
            }));
          });
          room.gameOver = true;
          return;
        }

        // update range
        if (guess > opponentNumber!) {
          room.max = Math.min(room.max, guess);
        } else {
          room.min = Math.max(room.min, guess);
        }

        // switch turn
        room.turnIndex = opponentIndex;

        // notify both players
        room.clients.forEach((client, i) => {
          client.send(JSON.stringify({
            type: "rangeUpdate",
            min: room.min,
            max: room.max,
            turn: i === room.turnIndex,
          }));
        });
      }
    } catch (err) {
      console.error("Invalid message:", err);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    for (const room of rooms) {
      room.clients = room.clients.filter((client) => client !== ws);
    }
  });
});

console.log("WebSocket server running on ws://localhost:8080");
