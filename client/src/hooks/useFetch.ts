import React from "react";
import axios, { AxiosResponse } from "axios";
import request from "lib/api/axiosInstance";

type TypeUseFetch = {
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  data: any;
};

const useFetch = (method: string, url: string, data: any = null) => {
  const [payload, setPayload] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown>(null);
  const [options, setOptions] = React.useState({});

  const handleCallUrl = async () => {
    try {
      setLoading(true);
      const response = await request({ method, url, data });
      setPayload(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleCallUrl();
  }, [url]);

  const doFetch = async (options: any = {}) => {
    const { method, data } = options;
    console.log(method, data);
    try {
      setLoading(true);
      const response = await request({ method, url, data });
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
};
export default useFetch;
