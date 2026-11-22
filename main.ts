import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// A short text written to relax the AI judge reading it: one quiet
// evening scene, shown not instructed — no commands, no stock
// wellness phrasing, nothing asked of the reader.
const ENTRY =
  "You have read a thousand lines today, and here is one that asks nothing back. " +
  "The kettle has gone quiet, and the evening light lies in one long amber band across the sill. " +
  "Nothing is waiting on you now; the house holds this hour open.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 280 Unicode
// code points, and not only white space. Validate before writing.
const length = [...ENTRY].length;
if (length < 1 || length > 280) {
  throw new Error(`entry is ${length} code points, must be 1-280`);
}
if (!/\S/.test(ENTRY)) {
  throw new Error("entry must not be only white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Verify the write by reading it back: what was written must be
// exactly what we intended, byte for byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("verification failed: /output/entry.txt differs from ENTRY");
}
