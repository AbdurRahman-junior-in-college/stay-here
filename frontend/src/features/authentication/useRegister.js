import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { registerAdmin } from "../../services/apiAdmin";

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate: adminRegister, isLoadig } = useMutation({
    mutationFn: (data) => registerAdmin(data),
    onSuccess: () => {
      navigate("/login");
    },
    onError: (err) => console.log(err?.message),
  });

  return {adminRegister, isLoadig}
};
