module.exports = function maskAccount(acc) {
  return "XXXXXX" + acc.slice(-4);
};
