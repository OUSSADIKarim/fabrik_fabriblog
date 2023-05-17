import { useQuery } from "@tanstack/react-query"
import { logout } from "../../api/api"

export const useLoggout = () => {
  const { data } = useQuery({
    queryKey: ["loggout"],
    queryFn: async () => {
      const data = await logout()
      return data
    },
  })
  return data
}
