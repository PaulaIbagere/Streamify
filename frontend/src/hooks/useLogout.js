import { useMutation, useQueryClient } from "@tanstack/react-query";
import login from "../lib/api"

const useLogout = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: logout,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["authUser"]})
    })
  return {mutate:logoutMutation}
}

export default useLogout