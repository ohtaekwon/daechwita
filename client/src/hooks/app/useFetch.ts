import { AxiosResponse } from "axios";
import { authInstance } from "lib/apis/utils/instance";
import authFetch from "lib/apis/utils/interceptors";
import React from "react";

type method = "get" | "post" | "put" | "delete" | "patch";

function useFetch<T>(url: string) {
  const [payload, setPayload] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown>(null);

  const handleFetch = async () => {
    try {
      setLoading(true);
      const response = await authInstance
        .get(url)
        .then((res: AxiosResponse) => {
          if (!res) {
            throw res;
          }
          setPayload(res.data);
        });
      console.log(response);
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
