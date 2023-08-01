interface ServerToClient {
    callAlert: (callId: string) => void // socket server will use this function to send Alerts to front-end
}

interface ClientToServer {
    sendCallAlert: (callID: string, company: string) => void // backend will use it to notify socket server
}

export { ServerToClient, ClientToServer }