// Run: node --test lib/rate-limit.test.mjs
import assert from "node:assert/strict";
import { test } from "node:test";
import { allow } from "./rate-limit.ts";

test("blocks after the limit, per key, and recovers when the window passes", () => {
  const hour = 3_600_000;
  for (let i = 0; i < 5; i++) assert.equal(allow("a", 5, hour, 1000 + i), true);
  assert.equal(allow("a", 5, hour, 2000), false);
  assert.equal(allow("b", 5, hour, 2000), true);
  assert.equal(allow("a", 5, hour, 1000 + hour + 10), true);
});
