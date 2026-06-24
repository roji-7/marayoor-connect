import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ThemeRow {
  primary_color: string | null;
  accent_color: string | null;
  background_color: string | null;
  gold_color: string | null;
  red_color: string | null;
}

const VAR_MAP: Record<keyof ThemeRow, string[]> = {
  primary_color: ["--primary", "--ring"],
  accent_color: ["--accent"],
  background_color: ["--background", "--tvk-black"],
  gold_color: ["--tvk-gold", "--accent"],
  red_color: ["--tvk-red", "--tvk-red-glow", "--primary", "--destructive"],
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data } = useQuery({
    queryKey: ["theme_settings"],
    queryFn: async () => {
      const { data } = await supabase
        .from("theme_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      return data as ThemeRow | null;
    },
    staleTime: 60_000,
  });

  useEffect(() => {
    if (!data) return;
    const root = document.documentElement;
    (Object.keys(VAR_MAP) as (keyof ThemeRow)[]).forEach((field) => {
      const val = data[field];
      if (val) {
        VAR_MAP[field].forEach((cssVar) => root.style.setProperty(cssVar, val));
      }
    });
  }, [data]);

  return <>{children}</>;
}
