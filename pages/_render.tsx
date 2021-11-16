import {
  RenderContext,
  RenderFn,
} from "https://raw.githubusercontent.com/lucacasonato/fresh/main/server.ts";

export function render(ctx: RenderContext, render: RenderFn) {
  ctx.lang = "en";
  render();
}
