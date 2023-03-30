import { QueryClient } from "react-query";

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 60 * 30 * 1000,
            staleTime: 0,
            // refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
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
  USER_CHART_ALL_RESUMES: (id?: string) => ["user", "resumes", "all", id],
} as const;

export type QueryKeysType = "schedules" | "resumes";
