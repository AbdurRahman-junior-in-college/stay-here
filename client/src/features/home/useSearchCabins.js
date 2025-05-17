import { useMutation, useQuery } from "@tanstack/react-query";
import { getSearch } from "../../services/apiAdmin";
import { useDarkMode } from "../conext/DarkModeContext";

// export const useSearchCabins = () => {
//   const { searchQuery } = useDarkMode();
//   const { data: cabins, isLoading } = useQuery({
//     queryKey: ["search-cabins"],
//     queryFn: () => getSearch(searchQuery),
//   });

//   return { cabins, isLoading };
// };

export const useSearchCabins = () => {
  const { mutate: getSearchCabins, isLoading } = useMutation({
    mutationFn: (searchQuery) => getSearch(searchQuery),
    // onSuccess: (data) => {
    //     console.log("Get Cabins", data)
    // }
  });

  return {getSearchCabins, isLoading}
};
