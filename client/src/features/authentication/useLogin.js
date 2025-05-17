import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userLogin as userLoginApi } from "../../services/apiAdmin";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: userLogin, isLoading: isLoging } = useMutation({
    mutationFn: ({ password, email }) => userLoginApi({ password, email }),
    onSuccess: (data) => {
      localStorage.setItem("userToken", data?.token);
      navigate("/");
      queryClient.setQueryData(["user"], data?.admin);
    },
    onError: (error) => console.log(error),
  });
  return { userLogin, isLoging };
};
