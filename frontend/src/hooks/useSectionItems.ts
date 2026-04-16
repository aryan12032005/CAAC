import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/adminApi";

export type SectionItem = {
  _id: string;
  section: string;
  title: string;
  subtitle?: string;
  description?: string;
  link?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
};

export const useSectionItems = (section: string) => {
  const { data: items = [], isLoading: loading, error } = useQuery({
    queryKey: ["sectionItems", section],
    queryFn: async () => {
      const data = await apiRequest<SectionItem[]>(`/api/sections/${section}`);
      return data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch on tab switch to avoid spamming the backend
  });

  return { items, loading, error: error instanceof Error ? error.message : null };
};
