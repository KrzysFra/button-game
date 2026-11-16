import { Client, CloseCode, Room } from "colyseus"
import { ButtonGamePhase, ButtonGamePlayer, ButtonGameRoomState } from "../../shared/button-game-state.js"
import { sleep } from "../../shared/utils.js"

export class ButtonGameRoom extends Room<{ state: ButtonGameRoomState }> {
  maxClients = 8;
  state = new ButtonGameRoomState();

  endOfPlayingTimerId: NodeJS.Timeout | undefined = undefined;

  messages = {
    "pressed": (client: Client, data: boolean) => {
      const player = this.state.players.get(client.sessionId)
      player.isPressed = data

      if ([
        ButtonGamePhase.WAITING_FOR_START.valueOf(),
        ButtonGamePhase.WAITING_FOR_RESET.valueOf()
      ].includes(this.state.phase)
      ) {
        const allPlayersPressed = this.state.players.values().filter(p => !p.isCPU).reduce((p, v) => p && v.isPressed, true)
        if (allPlayersPressed) {
          this.state.phase = ButtonGamePhase.PLAYING
          this.state.delay = (1 + Math.random() + Math.random()) * 1000
          this.endOfPlayingTimerId = setTimeout(() => { this.phasePlayEnd() }, 10000)


          // CPUs simulate behaviour
          Array.from(this.state.players.entries()).filter(([_, p]) => p.isCPU).forEach(([sId, p]) => {
            p.isPressed = true
            const cpuTime = (1 + Math.random() + Math.random()) * 1000
            const skew = 500
            setTimeout(() => {
              this.setMyTime(sId, cpuTime - this.state.delay + skew)
              p.isPressed = false
            }, 2000 + cpuTime + skew)
          })
        }
      }
    },
    "hover": (client: Client, data: boolean) => {
      const player = this.state.players.get(client.sessionId)
      player.isHover = data
    },
    "cpu-add": () => {
      this.addCPU()
    },
    "cpu-rem": () => {
      if (this.state.amountCPUs <= 0) return
      this.state.amountCPUs--
      this.state.players.delete("CPU" + this.state.amountCPUs)
    },
    "my-time": (client: Client, data: number) => {
      this.setMyTime(client.sessionId, data)
    },
    "start-phase-end": () => {
      this.phasePlayEnd()
    }
  };

  onCreate(options: any) {
    console.log("room", this.roomId, "creating...")
    this.addCPU()
    this.addCPU()
    this.addCPU()
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

  addCPU() {
    const newCPU = new ButtonGamePlayer()
    newCPU.name = "CPU" + this.state.amountCPUs
    newCPU.isCPU = true
    this.state.players.set(newCPU.name, newCPU)
    this.state.amountCPUs++
  }

  setMyTime(clientId: string, time: number) {
    const player = this.state.players.get(clientId)
    if (player.myTime != undefined) return

    player.myTime = time

    // all my-times received
    if (Array.from(this.state.players).reduce((p, [_, pl]) => p && pl.myTime != undefined, true)) {
      this.phasePlayEnd()
    }
  }

  async phasePlayEnd() {
    if (this.endOfPlayingTimerId) {
      clearTimeout(this.endOfPlayingTimerId)
      this.endOfPlayingTimerId = undefined
    }

    this.state.phase = ButtonGamePhase.CONCLUSION_CALCULATION
    await sleep(2000) // pause for effect

    const playingPlayers = Array.from(this.state.players.entries())
      .filter(([_, v]) => { return !v.isEliminated })

    // eliminate early players
    Array.from(playingPlayers)
      .filter(([_, p]) => p.myTime < 0)
      .forEach(([_, p]) => p.isEliminated = true)

    if (this.state.players.values().reduce((p, pl) => !pl.isEliminated ? p + 1 : p, 0) <= 1) {
      this.state.phase = ButtonGamePhase.CONCLUSION_RESULT
      await sleep(2000) // pause for effect
      this.state.phase = ButtonGamePhase.GAME_END
      return
    }

    // eliminate slowest player
    const sortedPlayers = Array.from(playingPlayers)
      .filter(([_, p]) => p.myTime >= 0)
      .sort(([_1, v1]: any, [_2, v2]: any) => v1.myTime - v2.myTime)

    sortedPlayers[sortedPlayers.length - 1][1].isEliminated = true

    if (this.state.players.values().reduce((p, pl) => !pl.isEliminated ? p + 1 : p, 0) <= 1) {
      this.state.phase = ButtonGamePhase.CONCLUSION_RESULT
      await sleep(2000) // pause for effect
      this.state.phase = ButtonGamePhase.GAME_END
      return
    }

    this.state.phase = ButtonGamePhase.CONCLUSION_RESULT
    await sleep(2000) // pause for effect

    // reset
    this.state.phase = ButtonGamePhase.WAITING_FOR_RESET
    this.state.players.values().forEach(p => p.myTime = undefined)
  }
}
