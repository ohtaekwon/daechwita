import { AxiosResponse } from "axios";
import { getDocumentsList } from "lib/apis/service/getDocumentsList";
import { authInstance } from "lib/apis/utils/instance";
import React from "react";

type method = "get" | "post" | "put" | "delete" | "patch";

type URL = "documents" | "schedules";

function useFetch<T>(url: URL) {
  const [payload, setPayload] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown>(null);

  const handleFetch = async () => {
    try {
      setLoading(true);

      await authInstance
        .get(`/${url}`)
        .then((res: AxiosResponse) => {
          if (res.status !== 200) {
            throw Error("응답을 받을 수 없습니다.");
          }
          return res.data;
        })
        .then((res) => setPayload(res as any));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleFetch();
  }, [url]);

  return [payload, loading, error];
}
export default useFetch;
