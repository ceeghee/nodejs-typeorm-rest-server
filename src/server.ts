import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { Message } from './model';

export class SocketServer {
    public static readonly PORT:number = 3000;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private socketID: any;
    private socketMessage: string;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || SocketServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            this.socketID = socket.id
            console.log('Connected client on socket id %s.', socket.id);
            this.io.sockets.emit("broadcast","this is a broadcast");
            socket.on("message", (m: Message) => {
                     console.log('[server](message)(from): %s', JSON.stringify(m), this.socketID);
            // this.io.sockets.emit('message', m);
                    this.io.to(this.socketID).emit('message', m+" 2");
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}