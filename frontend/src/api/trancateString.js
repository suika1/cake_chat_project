export default (str, length) => {
  if (!str || !length) return;
  if (str.length < length) return str;

  return str.slice(0, length) + '...';
}