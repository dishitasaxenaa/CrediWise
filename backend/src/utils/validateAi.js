module.exports = function validateAI(data) {
  const total =
    data.green_percentage +
    data.carbon_percentage +
    data.neutral_percentage;

  if (total < 99 || total > 101) {
    throw new Error("Invalid AI percentages");
  }
};
