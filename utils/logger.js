function info(message) {
  console.info(`[INFO] ${message}`);
}

function error(message) {
  console.error(`[ERROR] ${message}`);
}

module.exports = { info, error };
