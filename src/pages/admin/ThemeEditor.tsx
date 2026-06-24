import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface ThemeRow {
  primary_color: string | null;
  accent_color: string | null;
  background_color: string | null;
  gold_color: string | null;
  red_color: string | null;
}

const FIELDS: { key: keyof ThemeRow; label: string; help: string }[] = [
  { key: "red_color", label: "TVK Red", help: "Primary brand red — used for accents, buttons, glow." },
  { key: "gold_color", label: "TVK Gold", help: "Headings and highlights." },
  { key: "background_color", label: "Background", help: "Page background." },
  { key: "primary_color", label: "Primary", help: "Default primary button color." },
  { key: "accent_color", label: "Accent", help: "Secondary accent color." },
];

// Convert hex -> oklch is complex. We accept any valid CSS color string.
export default function ThemeEditor() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["theme_settings_admin"],
    queryFn: async () => {
      const { data } = await supabase.from("theme_settings").select("*").eq("id", 1).maybeSingle();
      return data as ThemeRow | null;
    },
  });
  const [form, setForm] = useState<ThemeRow>({
    primary_color: null,
    accent_color: null,
    background_color: null,
    gold_color: null,
    red_color: null,
  });
  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  async function save() {
    const { error } = await supabase.from("theme_settings").update(form).eq("id", 1);
    if (error) return toast.error(error.message);
    toast.success("Theme saved — reload the public site to see changes");
    qc.invalidateQueries({ queryKey: ["theme_settings"] });
    qc.invalidateQueries({ queryKey: ["theme_settings_admin"] });
  }
  async function reset() {
    setForm({ primary_color: null, accent_color: null, background_color: null, gold_color: null, red_color: null });
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-tvk-gold">Theme Colors</h1>
        <p className="text-sm text-muted-foreground">
          Override the site's brand colors. Accepts any CSS color (hex like <code>#dc2626</code> or
          <code> oklch(...)</code>). Leave blank to use the default.
        </p>
      </div>
      <Card>
        <CardHeader><CardTitle>Colors</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {FIELDS.map((f) => (
            <div key={f.key} className="grid gap-2 sm:grid-cols-[1fr_auto_auto] sm:items-end">
              <div>
                <Label>{f.label}</Label>
                <Input
                  placeholder="#dc2626"
                  maxLength={50}
                  value={form[f.key] ?? ""}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value || null })}
                />
                <p className="mt-1 text-xs text-muted-foreground">{f.help}</p>
              </div>
              <input
                type="color"
                aria-label={`${f.label} picker`}
                value={form[f.key] && form[f.key]!.startsWith("#") ? form[f.key]! : "#000000"}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="h-10 w-14 cursor-pointer rounded border border-border bg-transparent"
              />
              <div
                className="h-10 w-14 rounded border border-border"
                style={{ background: form[f.key] || "transparent" }}
              />
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Button onClick={save}>Save theme</Button>
        <Button variant="outline" onClick={reset}>Reset to defaults</Button>
      </div>
    </div>
  );
}
