export const castArray = (data = []) => (Array.isArray(data) ? data : [data]);

export const removeUndefinedFromObj = (obj: any) =>
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
