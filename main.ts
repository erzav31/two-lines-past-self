// Two Lines to Your Past Self — entry program.
// Writes exactly two lines (one sentence each) to /output/entry.txt.
// Deterministic: constant text, no timestamps, no randomness, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Don't laugh when your little sister holds up the lopsided cake she baked for Mum's birthday on the kitchen floor at six o'clock.\n" +
  "That laugh is why she never bakes again, and her baking is the one thing that still brings the whole family to the same table.\n";

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 280
// characters, not only white space; exactly two lines, one sentence each.
const lines = ENTRY.trimEnd().split("\n");
if (lines.length !== 2) {
  throw new Error(`expected exactly 2 lines, got ${lines.length}`);
}
for (const line of lines) {
  const sentences = line.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`each line must be a single sentence: ${JSON.stringify(line)}`);
  }
}
if (ENTRY.length < 1 || ENTRY.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${ENTRY.length}`);
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${outPath} (${ENTRY.length} characters, 2 lines)`);
