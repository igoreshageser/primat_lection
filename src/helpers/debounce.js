export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const args = arguments;
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, wait);
    if (callNow) func.apply(this, args);
  };
}
