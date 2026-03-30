const list = {
  clap: { button: "👏", files: ["clap0.m4a", "clap1.m4a", "clap2.m4a", "clap3.m4a"] },
  laugh: { button: "🤣", files: ["laugh0.m4a", "laugh1.m4a", "laugh2.m4a"] },
  hee: { button: "💡", files: ["hee0.m4a"] },
};

function original() {
  return Object.entries(list).map(([tag, sound]) => {
    return {
      tag,
      button: sound.button,
      onClick: () => {
        // ws.send(tag);
        // play(tag);
      }
    };
  });
}

const LIST_ENTRIES = Object.entries(list);
function semiOptimized() {
  return LIST_ENTRIES.map(([tag, sound]) => {
    return {
      tag,
      button: sound.button,
      onClick: () => {
        // ws.send(tag);
        // play(tag);
      }
    };
  });
}

const PRE_MAPPED = Object.entries(list).map(([tag, sound]) => {
    return {
      tag,
      button: sound.button,
    };
});

function fullyOptimized() {
  return PRE_MAPPED.map(item => {
    return {
        ...item,
        onClick: () => {}
    }
  });
}

const ITERATIONS = 1_000_000;

console.time("Original");
for (let i = 0; i < ITERATIONS; i++) {
  original();
}
console.timeEnd("Original");

console.time("Semi-Optimized");
for (let i = 0; i < ITERATIONS; i++) {
  semiOptimized();
}
console.timeEnd("Semi-Optimized");

console.time("Fully-Optimized");
for (let i = 0; i < ITERATIONS; i++) {
  fullyOptimized();
}
console.timeEnd("Fully-Optimized");
