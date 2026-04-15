import { useEffect, useState } from "react";
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
  const [items, setItems] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiRequest<SectionItem[]>(`/api/sections/${section}`);
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [section]);

  return { items, loading, error };
};
