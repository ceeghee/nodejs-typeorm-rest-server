import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';



export class GameController{

	private io: SocketIO.Server;
	private socket;
	private addValue : number;
	private socketID: any;

	constructor(socket, io : SocketIO.Server){
		this.socket = socket
		this.io = io;
	}

	// private Init(){
	// 	// this.io = 
	// }

	public start() : void {
		console.log(this.socket.id);
		this.io.to(this.socket.id).emit("instruction","Welcome to a Basic Math Game, Reply with Addition or Subtraction and a number to Begin")
		this.socket.on("addition", (data)=>{
			this.addValue = parseInt(data);
			this.socket.emit("add-question","what is "+this.addValue+" * 2");
		});

		this.socket.on("add-anwser",(data : number)=>{
			(2 * this.addValue) == data ? this.socket.emit("report","Congrats!!!, you got the Answer Right") : this.socket.emit("report","wrong answer") 
		})
		this.socket.on("subtraction",(data)=>{

		});
	}
}