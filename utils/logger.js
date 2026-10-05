function info(message) {
  console.error(`[INFO] ${message}`);
}

function error(message) {
  console.error(`[ERROR] ${message}`);
}

module.exports = { info, error };
