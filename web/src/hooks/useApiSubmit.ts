import { ApiResponse } from "@/types/utils";
import { useState } from "react";
import { toast } from "react-toastify";

type FetchFunction<I, O> = (data: I) => Promise<ApiResponse<O>>;

export const useApiSubmit = <I, O>(fetchFunction: FetchFunction<I, O>) => {
  const [apiLoading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse<O> | null>(null);

  const onApiSubmit = async (data: I) => {
    setLoading(true);
    try {
      const result = await fetchFunction(data);
      setApiResponse(result);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      return result;
    } catch (error) {
      toast.error("エラーが発生しました。");
      console.error(error);
      return { success: false, message: "エラーが発生しました。", data: null };
    } finally {
      setLoading(false);
    }
  };

  return { onApiSubmit, apiLoading, apiResponse };
};
