const fs = require("node:fs");
const path = require("node:path");

function loadJson(relativePath) {
  const filePath = path.resolve(__dirname, "..", relativePath);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

module.exports = { loadJson };
