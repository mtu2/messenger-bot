export const castArray = <T>(data: T | T[]): T[] =>
  Array.isArray(data) ? data : [data];

export const removeUndefinedFromObj = (obj: Record<string, any>): void =>
  Object.keys(obj).forEach((key: string): void => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
