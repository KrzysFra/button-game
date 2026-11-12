import { Client, CloseCode, Room } from "colyseus"
import { ButtonGameRoomState, ButtonGamePlayer } from "../../shared/button-game-state.js"

export class ButtonGameRoom extends Room<{ state: ButtonGameRoomState }> {
  maxClients = 8;
  state = new ButtonGameRoomState();

  messages = {
    "pressed": (client: Client, data: boolean) => {
      const player = this.state.players.get(client.sessionId)
      player.isPressed = data
    },
    "hover": (client: Client, data: boolean) => {
      const player = this.state.players.get(client.sessionId)
      player.isHover = data
    },
    "cpu-add": (client: Client, data: boolean) => {
      const newCPU = new ButtonGamePlayer()
      newCPU.name = "CPU" + this.state.amountCPUs
      this.state.players.set(newCPU.name, newCPU)
      this.state.amountCPUs++
    },
    "cpu-rem": (client: Client, data: boolean) => {
      if (this.state.amountCPUs <= 0) return
      this.state.amountCPUs--
      this.state.players.delete("CPU" + this.state.amountCPUs)
    },
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
