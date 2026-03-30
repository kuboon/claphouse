import { createDefine } from "fresh";

// Setup, do this once in a file and import it everywhere else.
export const define = createDefine<{ foo: string }>();
