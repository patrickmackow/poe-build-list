const fetchWithTimeout = (url, abortController, ms) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      abortController.abort("Timeout");
      reject("Timeout");
    }, ms);

    fetch(url, { signal: abortController.signal }).then(res => {
      clearTimeout(timeout);
      resolve(res);
    });
  });
};

export default fetchWithTimeout;
