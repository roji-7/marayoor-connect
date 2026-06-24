import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";
import { Loader2 } from "lucide-react";

export default function DynamicPage() {
  const { slug = "" } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["page", slug],
    queryFn: async () => {
      const { data } = await supabase
        .from("pages")
        .select("title, body, published")
        .eq("slug", slug)
        .maybeSingle();
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-tvk-black text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-32 sm:px-6">
        {isLoading ? (
          <div className="grid place-items-center py-20"><Loader2 className="h-8 w-8 animate-spin text-tvk-gold" /></div>
        ) : !data || !data.published ? (
          <div className="text-center">
            <h1 className="font-display text-4xl text-tvk-gold">Page not found</h1>
            <Link to="/" className="mt-4 inline-block text-tvk-gold underline">← Back home</Link>
          </div>
        ) : (
          <article className="prose prose-invert max-w-none">
            <h1 className="font-display text-4xl text-tvk-gold sm:text-5xl">{data.title}</h1>
            <div className="mt-6 whitespace-pre-wrap text-foreground/90">{data.body}</div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}
