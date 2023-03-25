import { QueryClient } from "react-query";

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: Infinity,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();

export const QueryKeys = {
  RESUMES: (id?: string) => ["resumes", id],
  SCHEDULES: "schedules",
  TOTAL_CHART: (id?: string) => ["total", id],
  USER_CHART: (id?: string) => ["user", id],
} as const;

export type QueryKeysType = "schedules" | "resumes";
