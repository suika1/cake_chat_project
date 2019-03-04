//
// export function arraysEqual(a, b) {
//     if (a === b) return true;
//     if (a == null || b == null) return false;
//     if (a.length !== b.length) return false;
//
//     for (let i = 0; i < a.length; ++i) {
//         if (a[i] !== b[i]) return false;
//     }
//     return true;
// }

export function getDocHeight() {
  console.log(`now it's :: `) ||
    console.log(
      Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )
    );
  return Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
}
