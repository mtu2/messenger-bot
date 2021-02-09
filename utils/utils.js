const castArray = (data = []) => (Array.isArray(data) ? data : [data]);

const removeUndefinedFromObj = (obj) =>
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });

module.exports = { castArray, removeUndefinedFromObj };
