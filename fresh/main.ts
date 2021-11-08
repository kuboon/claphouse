/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import {
  Routes,
  ServerContext,
} from "https://raw.githubusercontent.com/lucacasonato/fresh/main/server.ts";
import routes from "./routes.gen.ts";
import { listenAndServe } from "https://deno.land/std@0.108.0/http/server.ts";

async function start(routes: Routes) {
  const ctx = await ServerContext.fromRoutes(routes);
  console.log("Server listening on http://localhost:8000");
  await listenAndServe(":8000", async (req) => {
    console.log(req.method, req.url)
    if (req.method === "GET" && req.url.includes("/ws/")) {
      const { socket, response } = Deno.upgradeWebSocket(req);
      if (socket) {
        const uuid = req.url.split('/').at(-1)!
        const channel = new BroadcastChannel(uuid);
        channel.onmessage = (ev) => {
          socket.send(ev.data)
        }
        socket.onmessage = (ev) => {
          channel.postMessage(ev.data)
        }
        return response
      }
    }
    return ctx.handler()(req);
  });
}
await start(routes);
