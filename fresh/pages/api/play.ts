import { HandlerContext } from "https://raw.githubusercontent.com/lucacasonato/fresh/main/server.ts";

export const handler = (ctx: HandlerContext): Response => {
  const url = new URL(ctx.req.url);
  const uuid = url.searchParams.get("uuid");
  const tag = url.searchParams.get("tag");
  if (!uuid || !tag) return new Response(null, { status: 400 });
  const channel = new BroadcastChannel(uuid);
  channel.postMessage(tag);
  return new Response(JSON.stringify({ ok: true }));
};
