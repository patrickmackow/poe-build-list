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
          async (response) => {
            clearTimeout(timeout);
            const data = await response.json();
            resolve(data);
          },
          (error) => {
            clearTimeout(timeout);
            reject(error);
          }
        );
      });
    },
    [abortController, ms]
  );

  return { fetchWithTimeout };
}

export { useFetchWithTimeout };
