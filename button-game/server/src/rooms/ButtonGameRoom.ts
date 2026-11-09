import { Client, CloseCode, Room } from "colyseus"
import { ButtonGameRoomState, ButtonGamePlayer } from "../../shared/button-game-state.js"

export class ButtonGameRoom extends Room<{ state: ButtonGameRoomState }> {
  maxClients = 8;
  state = new ButtonGameRoomState();

  messages = {
    "press-my-button": (client: Client, data: number) => {
      const player = this.state.players.get(client.sessionId)
      if (player.hasPressed) return
    }
  };

  onCreate(options: any) {
    /**
     * Called when a new room is created.
     */
  }

  onJoin(client: Client, options: any) {
    const newPlayer = new ButtonGamePlayer()
    newPlayer.name = (this.state.players.size + 1).toString()
    this.state.players.set(client.sessionId, newPlayer)
  }

  onLeave(client: Client, code: CloseCode) {
    this.state.players.delete(client.sessionId)
  }

  onDispose() {
    /**
     * Called when the room is disposed.
     */
    console.log("room", this.roomId, "disposing...")
  }

}
