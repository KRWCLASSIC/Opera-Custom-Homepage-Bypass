class WebSocketClient {
    constructor(url) {
        this.url = url;
        this.socket = null;
        this.reconnectInterval = 5000;
        this.messageQueue = [];
        this.connect();
    }

    connect() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log("WebSocket connection established");
            this.flushMessageQueue();
        };

        this.socket.onmessage = (event) => {
            console.log("Message from server:", event.data);
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        this.socket.onclose = (event) => {
            console.warn("WebSocket connection closed. Retrying...");
            setTimeout(() => this.connect(), this.reconnectInterval);
        };
    }

    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.warn("Socket not ready, queuing message:", message);
            this.messageQueue.push(message);
        }
    }

    flushMessageQueue() {
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.sendMessage(message);
        }
    }

    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

// Initialize WebSocketClient on page load
document.addEventListener("DOMContentLoaded", () => {
    const wsClient = new WebSocketClient("ws://localhost:8765");

    wsClient.sendMessage("new_tab_opened");

    window.onbeforeunload = () => {
        wsClient.close();
    };
});
