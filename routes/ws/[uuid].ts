import { Handlers } from "https://raw.githubusercontent.com/lucacasonato/fresh/main/server.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const { socket, response } = Deno.upgradeWebSocket(req);
    if (!socket) throw new Error("unreachable");

    const uuid = ctx.params["uuid"];
    if (typeof BroadcastChannel === "undefined") {
      socket.onmessage = (ev) => {
        socket.send(ev.data);
      };
      return response;
    }
    const channel = new BroadcastChannel(uuid);
    channel.onmessage = (ev) => {
      console.log('channel -> socket', ev.data);
      socket.send(ev.data);
    };
    socket.onmessage = (ev) => {
      console.log('socket -> channel', ev.data);
      channel.postMessage(ev.data);
    };
    socket.onclose = () => {
      channel.close();
    };
    return response;
  },
};
