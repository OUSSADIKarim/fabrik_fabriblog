import { useQuery } from "@tanstack/react-query"
import { getCsrf } from "../../api/api"

export const useCsrf = () => {
  const { data } = useQuery({
    queryKey: ["csrf"],
    queryFn: async () => {
      const data = await getCsrf()
      return data
    },
  })
  return data
}
