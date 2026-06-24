import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";

interface HeroData {
  badge: string;
  title_main: string;
  title_accent: string;
  tagline: string;
  subtitle: string;
  cta_primary_label: string;
  cta_primary_href: string;
  cta_secondary_label: string;
  cta_secondary_href: string;
  video_url: string;
  poster_url: string;
}

const DEFAULTS: HeroData = {
  badge: "Official Website",
  title_main: "TVK",
  title_accent: "MARAYOOR",
  tagline: "தமிழக வெற்றிக் கழகம் — Marayoor Unit",
  subtitle: "Victory for Tamil Nadu. Strength of the People. Voice of Marayoor.",
  cta_primary_label: "Get Member ID",
  cta_primary_href: "#member",
  cta_secondary_label: "Learn More",
  cta_secondary_href: "#about",
  video_url: "",
  poster_url: "",
};

export default function HeroEditor() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site_content", "hero"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "hero").maybeSingle();
      return (data?.value as unknown as HeroData) ?? null;
    },
  });
  const [form, setForm] = useState<HeroData>(DEFAULTS);
  useEffect(() => {
    if (data) setForm({ ...DEFAULTS, ...data });
  }, [data]);

  async function save() {
    const { error } = await supabase.from("site_content").upsert({ key: "hero", value: JSON.parse(JSON.stringify(form)) });
    if (error) return toast.error(error.message);
    toast.success("Hero saved");
    qc.invalidateQueries({ queryKey: ["site_content"] });
  }

  const set = <K extends keyof HeroData>(k: K, v: HeroData[K]) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-tvk-gold">Hero Section</h1>
        <p className="text-sm text-muted-foreground">Edit the homepage hero video and headline.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Text</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Badge</Label><Input maxLength={50} value={form.badge} onChange={(e) => set("badge", e.target.value)} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Title main</Label><Input maxLength={30} value={form.title_main} onChange={(e) => set("title_main", e.target.value)} /></div>
            <div><Label>Title accent</Label><Input maxLength={30} value={form.title_accent} onChange={(e) => set("title_accent", e.target.value)} /></div>
          </div>
          <div><Label>Tagline (Tamil)</Label><Input maxLength={120} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} /></div>
          <div><Label>Subtitle</Label><Textarea maxLength={200} value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Primary CTA text</Label><Input maxLength={30} value={form.cta_primary_label} onChange={(e) => set("cta_primary_label", e.target.value)} /></div>
            <div><Label>Primary CTA link</Label><Input maxLength={200} value={form.cta_primary_href} onChange={(e) => set("cta_primary_href", e.target.value)} /></div>
            <div><Label>Secondary CTA text</Label><Input maxLength={30} value={form.cta_secondary_label} onChange={(e) => set("cta_secondary_label", e.target.value)} /></div>
            <div><Label>Secondary CTA link</Label><Input maxLength={200} value={form.cta_secondary_href} onChange={(e) => set("cta_secondary_href", e.target.value)} /></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Media</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Video URL (mp4)</Label>
            <Input maxLength={500} placeholder="https://...mp4" value={form.video_url} onChange={(e) => set("video_url", e.target.value)} />
            <p className="mt-1 text-xs text-muted-foreground">Leave empty to keep the default video.</p>
          </div>
          <ImageUpload label="Poster image (shown while video loads)" value={form.poster_url || null} onChange={(url) => set("poster_url", url ?? "")} folder="hero" />
        </CardContent>
      </Card>
      <Button onClick={save}>Save changes</Button>
    </div>
  );
}
