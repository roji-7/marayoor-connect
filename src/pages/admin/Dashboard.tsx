import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Newspaper, FilePlus } from "lucide-react";
import { Link } from "react-router-dom";

function useCount(table: "events" | "news" | "pages") {
  return useQuery({
    queryKey: ["count", table],
    queryFn: async () => {
      const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });
}

export default function AdminDashboard() {
  const events = useCount("events");
  const news = useCount("news");
  const pages = useCount("pages");

  const cards = [
    { label: "Events", count: events.data, icon: CalendarDays, to: "/admin/events" },
    { label: "News items", count: news.data, icon: Newspaper, to: "/admin/news" },
    { label: "Custom pages", count: pages.data, icon: FilePlus, to: "/admin/pages" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-tvk-gold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage everything on the TVK Marayoor website.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} to={c.to}>
            <Card className="transition hover:border-tvk-gold">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {c.label}
                </CardTitle>
                <c.icon className="h-5 w-5 text-tvk-gold" />
              </CardHeader>
              <CardContent>
                <div className="font-display text-3xl text-foreground">{c.count ?? "—"}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
