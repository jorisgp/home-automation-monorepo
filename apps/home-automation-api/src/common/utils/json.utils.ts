export const safeStringify = (value, space = 2) => {
  const seen = new WeakSet();

  return JSON.stringify(
    value,
    (key, val) => {
      if (typeof val === 'object' && val !== null) {
        if (seen.has(val)) {
          return '[Circular]'; // mark circular refs instead of throwing
        }
        seen.add(val);
      }

      if (typeof val === 'function') {
        return `[Function: ${val.name || 'anonymous'}]`;
      }

      if (typeof val === 'symbol') {
        return val.toString();
      }

      if (typeof val === 'bigint') {
        return val.toString();
      }

      return val;
    },
    space
  );
};
