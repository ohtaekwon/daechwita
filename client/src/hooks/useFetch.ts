import React from "react";
import axios, { AxiosResponse } from "axios";
import request from "lib/api/axiosInstance";

type TypeUseFetch = {
  method: string;
  url: string;
  data: any;
};

const useFetch = (method: string, url: string, data: any = null) => {
  const [payload, setPayload] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown>(null);

  const handleCallUrl = async () => {
    try {
      setLoading(true);
      const prePayload = await request({ method, url, data });
      setPayload(prePayload);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleCallUrl();
  }, [url]);

  return { payload, loading, error };
};
export default useFetch;
