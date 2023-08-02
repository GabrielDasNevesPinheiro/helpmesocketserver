import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { ClientToServer, ServerToClient } from "./SocketActions";
import { config } from "dotenv";

config();

const port = process.env.PORT || 3000

const app = express();
const httpServer = createServer(app);
const socketServer = new Server<ClientToServer, ServerToClient>(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

socketServer.on("connection", (socket) => {

    const room = socket.handshake.auth.token; // all connected users must have his company room
    if(room) socket.join(room); // server side connection will not have room.
    console.log(`Socket connected in ${room}`);

    socket.on("sendCallAlert", (callID, company) => { // when back end (server side) register a new call, it will send an alert to front-end
        console.log(`ALERTA DE ${company} DO CHAMADO ${callID}`);
        socket.to(company).emit("callAlert", callID);

    });

})

setTimeout(() => {
    console.log("KEEP ALIVE TASK");
}, 15000);

httpServer.listen(port, () => {
    console.log(`Socket server ON IN ${port}`);
});