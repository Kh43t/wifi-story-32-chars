// Tell a Whole Story in 32 Characters — make.fun entry.
// The program writes one Wi-Fi network name (at most 32 characters)
// to /output/entry.txt. The name is a whole story in one line:
// a proposal, a freeze, and a punchline borrowed from loading screens.
import { mkdirSync, writeFileSync, readFileSync, chmodSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";

// The entry: he proposed, and the narrator answered the way a
// buffering video does — by stalling. Two characters, one event,
// one twist, 29 characters.
const ENTRY = "He proposed. I said buffering";

const MAX_CHARS = 32;

function main(): void {
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // A Wi-Fi name is a single line: no newline or control characters.
  if (/[\u0000-\u001F\u007F]/.test(ENTRY)) {
    throw new Error("entry must not contain control characters");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
  chmodSync(OUT_PATH, 0o644);
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt differs from entry");
  }
  console.log(`wrote ${chars.length} characters to ${OUT_PATH}: ${ENTRY}`);
}

main();
