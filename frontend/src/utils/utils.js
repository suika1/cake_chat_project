export function getDocHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );
}

export const tr = (str, length) => {
  if (!str) return;
  if (str.length < length) return str;

  return str.slice(0, length) + '...';
}
