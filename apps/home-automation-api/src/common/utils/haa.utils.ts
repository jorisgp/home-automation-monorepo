export const toPlainObject = (object: any): any => {
  return JSON.parse(JSON.stringify(object));
};
