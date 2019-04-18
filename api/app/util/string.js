module.exports = {
  isStringVaidUrl: string => {
    try {
      // eslint-disable-next-line no-new
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  },
};
