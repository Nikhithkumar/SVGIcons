import { useQuery } from "@tanstack/react-query";
import { getApi } from "../Api";

export const useGetImages = () => {
  const { data: imagesData, isLoading, isError, refetch: refetchGetAllImages } = useQuery({
    queryKey: ['allImages'],
    queryFn: async () => {
      try {
        const data = await getApi('https://picsum.photos/v2/list?page=1&limit=10');
        return data;
      } catch (error) {
        throw new Error("Error fetching images data");
      }
    }
  });

  return {
    imagesData,
    isLoading,
    isError,
    refetchGetAllImages,
  };
};
