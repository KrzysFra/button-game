import { Client } from "@colyseus/sdk";
import { useRoom } from "@colyseus/react";
 
const client = new Client("ws://localhost:2567");
 
function Game() {
  const { room, error, isConnecting } = useRoom(
    () => client.joinOrCreate("game_room"),
  );
 
  if (isConnecting) return <p>Connecting...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
  return <GameView room={room} />;
}