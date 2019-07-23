export const getDocHeight = () => Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.clientHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight,
);

export const tr = (str, length) => {
  if (!str) return;
  if (str.length < length) return str;

  return `${str.slice(0, length)}...`;
}

/**
 * Helps to avoid TypeError
 * Example of usage: getProp(() => a.b.c.d.e.f, 'defaultStr')
 */
export const getProp = (lambda, defaultValue) => {
  try {
    return lambda();
  } catch (err) {
    if (err instanceof TypeError) {
      return defaultValue;
    }
    throw err;
  }
}
