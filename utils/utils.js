const castArray = (data = []) => (Array.isArray(data) ? data : [data]);

module.exports = { castArray };
