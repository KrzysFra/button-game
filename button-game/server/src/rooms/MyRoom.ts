import { Room, Client, CloseCode } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState.js";

export class MyRoom extends Room<{ state: MyRoomState }> {
 maxClients = 4;
  state = new MyRoomState();
 
  messages = {
    move: (client: Client, message: { x: number, y: number }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player) { return; }
 
      player.x = message.x;
      player.y = message.y;
    },
  };

  onCreate(options: any) {
    /**
     * Called when a new room is created.
     */
  }

  onJoin(client: Client, options: any) {
    this.state.players.set(client.sessionId, new Player());
    console.log("chat", `${client.sessionId} joined.`);
    this.broadcast("chat", `${client.sessionId} joined.`);
  }
 
  onLeave(client: Client, code: CloseCode) {
    this.state.players.delete(client.sessionId);
    this.broadcast("chat", `${client.sessionId} left.`);
  }

  onDispose() {
    /**
     * Called when the room is disposed.
     */
    console.log("room", this.roomId, "disposing...");
  }

}
