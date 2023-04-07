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
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: false,
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
  CHARTS: () => [...QueryKeys.all, "charts"] as const,
  TEMP: () => [...QueryKeys.all, "temp"] as const,

  TOTAL_CHART_RESUMES: () =>
    [...QueryKeys.CHARTS(), "total", "resumes"] as const,
  TOTAL_CHART_SCHEDULES: () =>
    [...QueryKeys.CHARTS(), "total", "schedules"] as const,

  USER_CHART_RESUMES: () => [...QueryKeys.CHARTS(), "user", "resumes"] as const,
  USER_CHART_SCHEDULES: () =>
    [...QueryKeys.CHARTS(), "user", "schedules"] as const,

  // 전체
  TOTAL_CHART_SCHEDULES_BY_CATEGORY: (category: string) =>
    [...QueryKeys.TOTAL_CHART_SCHEDULES(), { category: category }] as const,
  TOTAL_CHART_RESUMES_BY_CATEGORY: (category: string) =>
    [...QueryKeys.TOTAL_CHART_RESUMES(), { category: category }] as const,

  // 유저
  USER_CHART_SCHEDULES_BY_CATEGORY: (category: string) =>
    [...QueryKeys.USER_CHART_SCHEDULES(), { category: category }] as const,
  USER_CHART_RESUMES_BY_CATEGORY: (category: string) =>
    [...QueryKeys.USER_CHART_RESUMES(), { category: category }] as const,

  USER_CHART_ALL_RESUMES: () =>
    [...QueryKeys.USER_CHART_RESUMES(), "all"] as const,
};

export type QueryKeysType = {
  all: readonly ["daechwita"];
  RESUMES: () => readonly ["daechwita", "resumes"];
  SCHEDULES: () => readonly ["daechwita", "schedules"];
  CHARTS: () => readonly ["daechwita", "charts"];
  // 전체
  TOTAL_CHART_RESUMES: () => readonly [
    "daechwita",
    "charts",
    "total",
    "resumes"
  ];
  TOTAL_CHART_SCHEDULES: () => readonly [
    "daechwita",
    "charts",
    "total",
    "schedules"
  ];

  // 유저
  USER_CHART_RESUMES: () => readonly ["daechwita", "charts", "user", "resumes"];
  USER_CHART_SCHEDULES: () => readonly [
    "daechwita",
    "charts",
    "user",
    "schedules"
  ];

  // 전체 카테고리
  TOTAL_CHART_SCHEDULES_BY_CATEGORY: (category: string) => readonly [
    "daechwita",
    "charts",
    "total",
    "schedules",
    {
      readonly category: string;
    }
  ];
  TOTAL_CHART_RESUMES_BY_CATEGORY: (category: string) => readonly [
    "daechwita",
    "charts",
    "total",
    "resumes",
    {
      readonly category: string;
    }
  ];
  // 유저 카테고리
  USER_CHART_SCHEDULES_BY_CATEGORY: (category: string) => readonly [
    "daechwita",
    "charts",
    "user",
    "schedules",
    {
      readonly category: string;
    }
  ];
  USER_CHART_RESUMES_BY_CATEGORY: (category: string) => readonly [
    "daechwita",
    "charts",
    "user",
    "resumes",
    {
      readonly category: string;
    }
  ];

  USER_CHART_ALL_RESUMES: () => readonly [
    "daechwita",
    "charts",
    "user",
    "resumes",
    "all"
  ];
};
