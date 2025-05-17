import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { registerUser } from "../../services/apiAdmin";

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate: userRegister, isLoading } = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      navigate("/auth");
    },
    onError: (err) => console.log(err?.message),
  });

  return { userRegister, isLoading };
};
