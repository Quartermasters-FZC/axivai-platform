import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/** Size of a public SVG from its viewBox, for reserving space before it loads. */
function readSize(publicPath: string) {
  const svg = readFileSync(path.join(process.cwd(), "public", publicPath), "utf8");
  const m = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!m) throw new Error(`No viewBox in ${publicPath}`);
  return { src: `/${publicPath}`, width: Number(m[1]), height: Number(m[2]) };
}

/**
 * Landscape variant `<dir>/<name>.svg`, plus `<dir>/<name>-portrait.svg` when it exists.
 * A phone video `video/<dir>/<name>-portrait.mp4` (poster `<name>-portrait.jpg` beside it, size from
 * `<name>-portrait.json`) replaces the portrait SVG on phones when present.
 * Server-only (reads the filesystem at render time).
 */
export function diagramVariants(dir: string, name: string) {
  const exists = (p: string) => existsSync(path.join(process.cwd(), "public", p));
  const landscape = readSize(`${dir}/${name}.svg`);
  const portraitPath = `${dir}/${name}-portrait.svg`;
  const portrait = exists(portraitPath) ? readSize(portraitPath) : undefined;
  const videoBase = `video/${dir.replace(/^images\//, "")}/${name}-portrait`;
  const portraitVideo = exists(`${videoBase}.mp4`)
    ? {
        src: `/${videoBase}.mp4`,
        poster: exists(`${videoBase}.jpg`) ? `/${videoBase}.jpg` : undefined,
        ...(JSON.parse(readFileSync(path.join(process.cwd(), "public", `${videoBase}.json`), "utf8")) as { width: number; height: number }),
      }
    : undefined;
  return { landscape, portrait, portraitVideo };
}
