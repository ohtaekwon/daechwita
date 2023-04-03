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

  TOTAL_CHART_RESUMES: () => [...QueryKeys.RESUMES(), "total"] as const,
  TOTAL_CHART_SCHEDULES: () => [...QueryKeys.SCHEDULES(), "total"] as const,

  USER_CHART_RESUMES: () => [...QueryKeys.RESUMES(), "user"] as const,
  USER_CHART_SCHEDULES: () => [...QueryKeys.SCHEDULES(), "user"] as const,

  //
  TOTAL_CHART_SCHEDULES_BY_CATEGORY: (category: string) =>
    [...QueryKeys.TOTAL_CHART_SCHEDULES(), { category: category }] as const,
  TOTAL_CHART_RESUMES_BY_CATEGORY: (category: string) =>
    [...QueryKeys.TOTAL_CHART_RESUMES(), { category: category }] as const,

  //
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
  // 전체
  TOTAL_CHART_RESUMES: () => readonly ["daechwita", "resumes", "total"];
  TOTAL_CHART_SCHEDULES: () => readonly ["daechwita", "schedules", "total"];
  // 유저
  USER_CHART_RESUMES: () => readonly ["daechwita", "resumes", "user"];
  USER_CHART_SCHEDULES: () => readonly ["daechwita", "schedules", "user"];
  // 전체 - 카테고리
  TOTAL_CHART_SCHEDULES_BY_CATEGORY: (category: string) => readonly [
    "daechwita",
    "schedules",
    "total",
    {
      readonly category: string;
    }
  ];
  TOTAL_CHART_RESUMES_BY_CATEGORY: (category: string) => readonly [
    "daechwita",
    "resumes",
    "total",
    {
      readonly category: string;
    }
  ];
  // 유저 - 카테고리
  USER_CHART_SCHEDULES_BY_CATEGORY: (category: string) => readonly [
    "daechwita",
    "schedules",
    "user",
    {
      readonly category: string;
    }
  ];
  USER_CHART_RESUMES_BY_CATEGORY: (category: string) => readonly [
    "daechwita",
    "resumes",
    "user",
    {
      readonly category: string;
    }
  ];

  // 유저 - 전체(임시/완료)
  USER_CHART_ALL_RESUMES: () => readonly [
    "daechwita",
    "resumes",
    "user",
    "all"
  ];
};
