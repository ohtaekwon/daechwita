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
            // refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
        },
      });
    return client;
  };
})();
export const QueryKeys = {
  all: ["daechwita"] as const,
  RESUMES: () => [...QueryKeys.all, "resumes"] as const,
  SCHEDULES: () => [...QueryKeys.all, "schedules"] as const,
  TOTAL_CHART_RESUMES: () => [...QueryKeys.RESUMES(), "total"] as const,
  TOTAL_CHART_SCHEDULES: () => [...QueryKeys.SCHEDULES(), "total"] as const,
  USER_CHART_RESUMES: () =>
    [...QueryKeys.TOTAL_CHART_RESUMES(), "user"] as const,
  USER_CHART_SCHEDULES: () =>
    [...QueryKeys.TOTAL_CHART_SCHEDULES(), "user"] as const,
  USER_CHART_ALL_RESUMES: (id?: string) =>
    [...QueryKeys.USER_CHART_RESUMES(), "all", id] as const,
};
// export type QueryKeysType = "schedules" | "resumes";
export type QueryKeysType = {
  all: readonly ["daechwita"];
  RESUMES: () => readonly ["daechwita", "resumes"];
  SCHEDULES: () => readonly ["daechwita", "schedules"];
  TOTAL_CHART_RESUMES: () => readonly ["daechwita", "resumes", "total"];
  TOTAL_CHART_SCHEDULES: () => readonly ["daechwita", "schedules", "total"];
  USER_CHART_RESUMES: () => readonly ["daechwita", "resumes", "total", "user"];
  USER_CHART_SCHEDULES: () => readonly [
    "daechwita",
    "schedules",
    "total",
    "user"
  ];
  USER_CHART_ALL_RESUMES: (
    id?: string
  ) => readonly [
    "daechwita",
    "resumes",
    "total",
    "user",
    "all",
    string | undefined
  ];
};
