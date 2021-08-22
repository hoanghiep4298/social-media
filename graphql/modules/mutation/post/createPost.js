module.exports = async (args, context) => {
  try {
    console.log(hello)
    return 1;
  } catch (err) {
    throw new Error(err);
  }
}