import { QueryClient } from "react-query";

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 60 * 30 * 1000,
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
  TOTAL_CHART_SCHEDULES: (id?: string) => ["total", "schedules", id],
  TOTAL_CHART_RESUMES: (id?: string) => ["total", "resumes", id],
  USER_CHART_SCHEDULES: (id?: string) => ["user", "schedules", id],
  USER_CHART_RESUMES: (id?: string) => ["user", "resumes", id],
} as const;

export type QueryKeysType = "schedules" | "resumes";
