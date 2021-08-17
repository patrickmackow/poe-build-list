import { useQuery } from "react-query";
import { useFetchWithTimeout } from "utils/fetch";

function useLatestVersion() {
  const fetchWithTimeout = useFetchWithTimeout(5000);
  return useQuery("latestVersion", () =>
    fetchWithTimeout("version").then((data) => data.version)
  );
}

function useBuilds() {
  const fetchWithTimeout = useFetchWithTimeout(5000);
  return useQuery("builds", () => fetchWithTimeout(`builds`));
}

function useClassBuilds(gameClass) {
  const fetchWithTimeout = useFetchWithTimeout(5000);
  return useQuery(gameClass, () => fetchWithTimeout(`builds/${gameClass}`));
}

function useTagBuilds(tag) {
  const fetchWithTimeout = useFetchWithTimeout(5000);
  return useQuery(tag, () => fetchWithTimeout(`tags/${tag}`));
}

function useTags() {
  const fetchWithTimeout = useFetchWithTimeout(5000);
  return useQuery("tags", () => fetchWithTimeout(`tags`));
}

export { useLatestVersion, useBuilds, useClassBuilds, useTagBuilds, useTags };
