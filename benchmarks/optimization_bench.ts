const list = {
  clap: { button: "👏", files: ["clap0.m4a", "clap1.m4a", "clap2.m4a", "clap3.m4a"] },
  laugh: { button: "🤣", files: ["laugh0.m4a", "laugh1.m4a", "laugh2.m4a"] },
  hee: { button: "💡", files: ["hee0.m4a"] },
};

Deno.bench("Original: Object.entries(list).map inside", () => {
  // Simulate what happens in render
  const _nodes = Object.entries(list).map(([tag, sound]) => {
    return {
      tag,
      button: sound.button,
      onClick: () => {
        // ws.send(tag);
        // play(tag);
      }
    };
  });
});

const LIST_ENTRIES = Object.entries(list);
Deno.bench("Optimized: Use LIST_ENTRIES.map", () => {
  const _nodes = LIST_ENTRIES.map(([tag, sound]) => {
    return {
      tag,
      button: sound.button,
      onClick: () => {
        // ws.send(tag);
        // play(tag);
      }
    };
  });
});

const PRE_MAPPED = Object.entries(list).map(([tag, sound]) => {
    return {
      tag,
      button: sound.button,
      onClick: (tag: string) => {
        // ws.send(tag);
        // play(tag);
      }
    };
});

Deno.bench("Fully Optimized: Use PRE_MAPPED", () => {
  const _nodes = PRE_MAPPED;
});
