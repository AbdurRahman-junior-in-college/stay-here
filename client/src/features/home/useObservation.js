import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMyObservation } from "../../services/apiAdmin";



export const useObservation= () => {
    const queryClient = useQueryClient();
  
    const { mutate: observationPost, isLoading } = useMutation({
        //this is the api call and will recieve the observation param
      mutationFn:  postMyObservation, 
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        // navigate("/");
      },
      onError: (error) => console.log(error?.message),
    });
  
    return { observationPost, isLoading };
  };