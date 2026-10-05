import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const reportsDirectory = resolve(projectRoot, "reports");
const jsonReportPath = resolve(reportsDirectory, "cucumber.json");
const progressReportPath = resolve(reportsDirectory, "cucumber-progress.txt");
const tags = process.argv.slice(2);

await mkdir(reportsDirectory, { recursive: true });

const cucumber = spawn(
  "npm",
  [
    "exec",
    "--",
    "cucumber-js",
    ...tags,
    "--format",
    `progress:${progressReportPath}`,
    "--format",
    "json"
  ],
  {
    cwd: projectRoot,
    stdio: ["inherit", "pipe", "inherit"]
  }
);

const exitResult = new Promise((resolveExit, rejectExit) => {
  cucumber.once("error", rejectExit);
  cucumber.once("close", (code, signal) => resolveExit({ code, signal }));
});

try {
  await pipeline(cucumber.stdout, createWriteStream(jsonReportPath));
} catch (error) {
  cucumber.kill();
  throw error;
}

const { code, signal } = await exitResult;
if (signal) {
  throw new Error(`Cucumber was terminated by signal ${signal}`);
}

const json = await readFile(jsonReportPath, "utf8");
const features = JSON.parse(json);
if (!Array.isArray(features) || features.length === 0) {
  throw new Error("Cucumber produced an empty or invalid JSON report");
}

console.info(`Cucumber JSON report saved for ${features.length} feature(s).`);

if (code !== 0) {
  process.exitCode = code ?? 1;
}
