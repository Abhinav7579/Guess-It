import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const socket = new WebSocket("ws://localhost:8080");

const Start = () => {
  const [showInput, setShowInput] = useState(false);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "roomCreated") {
        alert("Room created");
        setRoomId(data.roomId);
        navigate(`/game/${data.roomId}`);
      }

      if (data.type === "joinedRoom") {
        navigate(`/game/${data.roomId}`);
      }

      if (data.type === "error") {
        alert(data.message);
      }
    };
  }, [navigate]);

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8);
    socket.send(JSON.stringify({ type: "createRoom", roomId: newRoomId }));
  };

  const joinRoom = () => {
    socket.send(JSON.stringify({ type: "joinRoom", roomId }));
  };

  return (
    <div
      className="h-screen bg-cover relative flex flex-col"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div>
        <h1 className="text-4xl p-1 font-extrabold tracking-tight">
          <span className="text-white">Guess</span>{" "}
          <span className="text-red-600">It</span>
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center h-full">
        <div
          className="bg-red-700 text-xl flex items-center justify-center text-white font-bold w-[200px] h-[70px] rounded-2xl hover:scale-105 cursor-pointer hover:bg-red-900 transition"
          onClick={createRoom}
        >
          Create a Room
        </div>

        <div
          className="bg-blue-700 text-xl m-8 flex items-center justify-center text-white font-bold w-[200px] h-[70px] rounded-2xl hover:scale-105 cursor-pointer hover:bg-blue-900 transition"
          onClick={() => setShowInput(true)}
        >
          Join a Room
        </div>

        {showInput && (
          <div>
            <input
              className="text-black p-2 bg-white"
              type="text"
              placeholder="Enter Room ID"
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button
              className="bg-blue-700 p-2 cursor-pointer hover:bg-red-500 text-white font-bold m-1"
              onClick={joinRoom}
            >
              Join
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Start;
