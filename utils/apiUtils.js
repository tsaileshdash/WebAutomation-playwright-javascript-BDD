const assert = require("node:assert/strict");

function assertStatus(response, expectedStatus) {
  assert.equal(
    response.status(),
    expectedStatus,
    `Expected HTTP ${expectedStatus}, received HTTP ${response.status()}`
  );
}

async function parseJson(response) {
  try {
    return await response.json();
  } catch (error) {
    throw new Error(`Expected a JSON response: ${error.message}`, { cause: error });
  }
}

module.exports = { assertStatus, parseJson };
