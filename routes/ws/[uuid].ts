import { define } from "#/utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    const req = ctx.req;
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
      socket.send(ev.data);
    };
    socket.onmessage = (ev) => {
      channel.postMessage(ev.data);
    };
    socket.onclose = () => {
      channel.close();
    };
    return response;
  },
});
