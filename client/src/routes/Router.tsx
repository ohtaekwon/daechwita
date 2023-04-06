import React from "react";
import AuthCompletedRouter from "./AuthCompletedRouter";
import DefaultRouter from "./DefaultRouter";
import { QueryClientProvider, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getClient } from "queryClient";

const queryClient = getClient();

function AuthProvider({
  isLoggedIn,
  children,
}: React.PropsWithChildren<{ isLoggedIn: boolean }>) {
  React.useEffect(() => {
    // 로그인하지 않은 경우 모든 쿼리 캐시 지우기
    if (!isLoggedIn) {
      queryClient.invalidateQueries();
    }
  }, [isLoggedIn, queryClient]);

  return <>{children}</>;
}

const Router = ({ isLoggedIn }: { isLoggedIn: Boolean }) => {
  return (
    <>
      {isLoggedIn && (
        <QueryClientProvider client={queryClient}>
          <AuthProvider isLoggedIn>
            <AuthCompletedRouter />
            <ReactQueryDevtools />
          </AuthProvider>
        </QueryClientProvider>
      )}

      {!isLoggedIn && <DefaultRouter />}
    </>
  );
};
export default Router;
