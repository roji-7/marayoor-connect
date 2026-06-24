import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteContentMap {
  [key: string]: Record<string, unknown>;
}

export function useSiteContent() {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async (): Promise<SiteContentMap> => {
      const { data, error } = await supabase.from("site_content").select("key,value");
      if (error) throw error;
      const map: SiteContentMap = {};
      for (const row of data ?? []) {
        map[row.key] = (row.value as Record<string, unknown>) ?? {};
      }
      return map;
    },
    staleTime: 60_000,
  });
}

export function useSection<T extends Record<string, unknown>>(key: string, fallback: T): T {
  const { data } = useSiteContent();
  return { ...fallback, ...(data?.[key] as T | undefined) };
}
