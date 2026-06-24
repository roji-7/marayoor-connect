import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type Section = "about" | "vision" | "contact" | "footer";

const DEFAULTS: Record<Section, Record<string, string>> = {
  about: {
    eyebrow: "About Us",
    title_main: "Voice of",
    title_accent: "Marayoor",
    body:
      "Tamilaga Vettri Kazhagam (TVK) Marayoor unit stands as the proud regional wing of Thalapathy Vijay's people-first political movement. We are committed to social justice, quality education, farmer welfare, and a corruption-free Tamil Nadu.",
  },
  vision: {
    eyebrow: "Our Vision",
    title_main: "A New",
    title_accent: "Tamil Nadu",
    body: "Six pillars that guide our work in Marayoor and beyond.",
  },
  contact: {
    eyebrow: "Connect",
    title_main: "Join the",
    title_accent: "Family",
    body: "Follow us and join our WhatsApp community for updates.",
    instagram: "https://www.instagram.com/tvk_marayoor",
    whatsapp: "https://chat.whatsapp.com/IuU6QS5BGxq24sE02gHpeK",
    address: "Marayoor, Idukki District, Kerala — 685620",
    email: "tvk.marayoor@official.in",
    phone: "",
  },
  footer: {
    description: "தமிழக வெற்றிக் கழகம் — Marayoor Unit. Official voice of the movement in Marayoor, Idukki.",
    credit_text: "Developed by Zybeo Tech Studio",
    credit_url: "https://zybeo.tech",
    tagline: "★ Victory for Tamil Nadu ★",
  },
};

function SectionForm({ section }: { section: Section }) {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site_content", section],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", section)
        .maybeSingle();
      return (data?.value as Record<string, string>) ?? null;
    },
  });
  const [form, setForm] = useState<Record<string, string>>(DEFAULTS[section]);
  useEffect(() => {
    if (data) setForm({ ...DEFAULTS[section], ...data });
  }, [data, section]);

  async function save() {
    const { error } = await supabase.from("site_content").upsert({ key: section, value: JSON.parse(JSON.stringify(form)) });
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["site_content"] });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{section}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.keys(DEFAULTS[section]).map((key) => {
          const isLong = key === "body" || key === "description";
          return (
            <div key={key}>
              <Label className="capitalize">{key.replace(/_/g, " ")}</Label>
              {isLong ? (
                <Textarea
                  maxLength={2000}
                  value={form[key] ?? ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              ) : (
                <Input
                  maxLength={500}
                  value={form[key] ?? ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              )}
            </div>
          );
        })}
        <Button onClick={save}>Save</Button>
      </CardContent>
    </Card>
  );
}

export default function ContentEditor() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-tvk-gold">Content</h1>
        <p className="text-sm text-muted-foreground">About, Vision, Contact and Footer copy.</p>
      </div>
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="vision">Vision</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>
        {(["about", "vision", "contact", "footer"] as Section[]).map((s) => (
          <TabsContent key={s} value={s}>
            <SectionForm section={s} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
