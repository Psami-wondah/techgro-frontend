import axios from "axios";
import React, { useEffect, useState } from "react";

import io from "socket.io-client";

const useSocketIO = () => {
  const socket = io("http://50.116.44.150:8000", {
    transports: ["websocket", "polling", "flashsocket"],
    auth: { chat_id: "201bec1e-2a0a-4afd-a921-b48c5cbf2400" },
  });
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    console.log("connecting...");
    socket.once("connect", () => {
      console.log("Socket Connected");
      setIsConnected(true);
    });

    socket.on("connect_error", (err: { message: string }) => {
      console.log("Socket connection failed: " + err.message);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });
    socket.on("new_message", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("new_message");
    };
  }, []); // eslint-disable-line
  return { isConnected, socket };
};

const Test = () => {
  const [message, setMessage] = useState({
    chat_id: "201bec1e-2a0a-4afd-a921-b48c5cbf2400",
    sender_id: "ce1a77cf-696e-4cbf-9fd7-67c3eb4fbd07",
    content: "",
  });

  const { socket, isConnected } = useSocketIO();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isConnected) {
      console.log(isConnected);
      socket.emit("message", JSON.stringify(message));
      setMessage({ ...message, content: "" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="bhb"
          className="w-1/3 outline-none border-2 border-orange-100"
          id=""
          onChange={(e) => setMessage({ ...message, content: e.target.value })}
          value={message.content}
        ></textarea>
        <button
          className="px-10 py-15 rounded bg-orange-400 text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Test;
