import React from "react";
import request from "lib/api/axiosInstance";

type method = "get" | "post" | "put" | "delete" | "patch";

function useFetch<T>(method: method, url: string, data?: T | T[]) {
  const [payload, setPayload] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown>(null);
  const [options, setOptions] = React.useState({});

  const handleCallUrl = async () => {
    try {
      setLoading(true);
      const response: T[] = await request({ method, url, data });
      setPayload(response);
      console.log(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleCallUrl();
  }, [url]);

  const doFetch = async <T>(options: any = {}) => {
    const { method, data } = options;
    console.log(method, data);
    try {
      setLoading(true);
      const response: any = await request({ method, url, data });
      setPayload(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    doFetch();
  }, [options]);

  return { payload, loading, error, doFetch };
}
export default useFetch;
