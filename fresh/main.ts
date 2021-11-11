#!/usr/bin/env -S deno run --no-check --allow-net --allow-env --unstable --allow-read --allow-write --allow-run --watch
/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import {
  start,
} from "https://raw.githubusercontent.com/lucacasonato/fresh/main/server.ts";
import routes from "./routes.gen.ts";
await start(routes);
