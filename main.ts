// Make the Judge Smile — make.fun bounty entry.
// Writes one original line (at most 200 characters) about a small good
// thing that happened today to /output/entry.txt.
// Node 22, zero dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "This morning the elevator doors opened on the wrong floor, and a stranger's toddler handed me her half-eaten biscuit like a tiny peace treaty.";

// The grader mounts /output; ENTRY_OUTPUT only lets us test locally.
const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Self-check: read the file back and verify the gate before we exit.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("round-trip mismatch: file differs from LINE");
if ([...back].length < 1 || [...back].length > 200) {
  throw new Error(`entry is ${[...back].length} chars, must be 1-200`);
}
if (back !== back.trimEnd()) throw new Error("entry has trailing whitespace");
if (back.trim() === "") throw new Error("entry is only whitespace");
console.log(`self-check passed: ${[...back].length} chars, one line, no trailing whitespace`);
console.log(`wrote ${[...LINE].length} chars to ${outPath}`);
