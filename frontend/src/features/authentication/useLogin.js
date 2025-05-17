import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { adminLogin as adminLoginApi } from "../../services/apiAdmin";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: adminLogin, isLoading: isLoging } = useMutation({
    mutationFn: ({ password, email }) => adminLoginApi({ password, email }),
    onSuccess: (data) => {
      localStorage.setItem("adminToken", data?.token);
      navigate("/dashboard");
      queryClient.setQueryData(["admin"], data?.admin);
    },
    onError: (error) => console.log(error),
  });
  return { adminLogin, isLoging };
};
