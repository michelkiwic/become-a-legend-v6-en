import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const output = new URL("../metanet-dist/", import.meta.url);

test("the static site uses the domain root and blocks indexing", async () => {
  const [html, layout] = await Promise.all([
    readFile(new URL("index.html", output), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.match(layout, /robots:\s*\{/);
  assert.match(layout, /index:\s*false/);
  assert.match(layout, /follow:\s*false/);
  assert.doesNotMatch(html, /\/become-a-legend-v6-en\/|\/src\//);

  const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^" ]+)"/g)];
  assert.ok(assets.length >= 2);
  for (const [, path] of assets) await access(new URL(path.slice(1), output));
});

test("the server config protects every response and preserves certificate renewal", async () => {
  const config = await readFile(new URL(".htaccess", output), "utf8");
  assert.match(config, /Header always set X-Robots-Tag "noindex, nofollow"/);
  assert.match(config, /acme-challenge/);
  assert.match(config, /https:\/\/www\.become-a-legend\.com/);
  assert.match(config, /Options -Indexes/);
});

test("referenced media and all video wall clips are deployed", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const references = [
    ...page.matchAll(/['"]([^'"`\n]+\.(?:webp|png|jpg|svg|mp4|webm|pdf))(?:\?[^'"]*)?['"]/g),
  ];
  assert.ok(references.length > 20);
  for (const [, file] of references) await access(new URL(file, output));
  for (let i = 1; i <= 12; i += 1) {
    await access(new URL(`video-wall/clip-${String(i).padStart(2, "0")}.webm`, output));
  }
});

test("the published branch contains no source or credentials", async () => {
  const files = await readdir(output);
  for (const name of [".git", ".env", "node_modules", "app", "package.json", ".github"]) {
    assert.ok(!files.includes(name), `${name} must not be published`);
  }
});
