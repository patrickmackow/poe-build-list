import React from "react";

function useFetchWithTimeout(ms) {
  const { current: abortController } = React.useRef(new AbortController());

  const fetchWithTimeout = React.useCallback(
    (url) => {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          abortController.abort("Timeout");
          reject("Timeout");
        }, ms);

        fetch(`/api/${url}`, { signal: abortController.signal }).then(
          (res) => {
            clearTimeout(timeout);
            resolve(res);
          },
          (err) => {
            clearTimeout(timeout);
            reject(err);
          }
        );
      });
    },
    [abortController, ms]
  );

  return { fetchWithTimeout };
}

export { useFetchWithTimeout };
