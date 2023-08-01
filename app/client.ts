import { io, Socket } from "socket.io-client";
import { ClientToServer, ServerToClient } from "./SocketActions";

const company = "helpme";

const socket: Socket<ServerToClient, ClientToServer> = io("http://localhost:3001", {
    auth: {
        token: company
    }
});


socket.on("connect", () => { 
    console.log("CONNECTED TO SERVER");
});
