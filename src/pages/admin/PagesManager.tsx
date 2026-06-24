import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface PageRow {
  id: string;
  slug: string;
  title: string;
  body: string | null;
  published: boolean;
  show_in_nav: boolean;
  nav_order: number;
}

const EMPTY = { slug: "", title: "", body: "", published: true, show_in_nav: true, nav_order: 0 };

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

export default function PagesManager() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin_pages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pages").select("*").order("nav_order");
      if (error) throw error;
      return data as PageRow[];
    },
  });
  const [editing, setEditing] = useState<PageRow | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  function openNew() { setEditing(null); setForm(EMPTY); setOpen(true); }
  function openEdit(row: PageRow) {
    setEditing(row);
    setForm({ slug: row.slug, title: row.title, body: row.body ?? "", published: row.published, show_in_nav: row.show_in_nav, nav_order: row.nav_order });
    setOpen(true);
  }
  async function save() {
    if (!form.title.trim()) return toast.error("Title required");
    const slug = (form.slug || slugify(form.title)).trim();
    if (!slug) return toast.error("Invalid slug");
    const payload = { ...form, slug, body: form.body || null };
    const res = editing
      ? await supabase.from("pages").update(payload).eq("id", editing.id)
      : await supabase.from("pages").insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["admin_pages"] });
    qc.invalidateQueries({ queryKey: ["public_pages_nav"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this page?")) return;
    const { error } = await supabase.from("pages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin_pages"] });
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-tvk-gold">Pages</h1>
          <p className="text-sm text-muted-foreground">Create custom pages and add them to the navigation.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button onClick={openNew}><Plus className="mr-2 h-4 w-4" /> New page</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editing ? "Edit page" : "New page"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input maxLength={200} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div>
                <Label>Slug (URL)</Label>
                <Input maxLength={80} placeholder="auto from title" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} />
                <p className="mt-1 text-xs text-muted-foreground">Page URL: /p/{form.slug || slugify(form.title) || "..."}</p>
              </div>
              <div><Label>Body</Label><Textarea maxLength={10000} rows={10} value={form.body ?? ""} onChange={(e) => setForm({ ...form, body: e.target.value })} /></div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
                  <Label>Published</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.show_in_nav} onCheckedChange={(v) => setForm({ ...form, show_in_nav: v })} />
                  <Label>In nav</Label>
                </div>
                <div><Label>Nav order</Label><Input type="number" value={form.nav_order} onChange={(e) => setForm({ ...form, nav_order: Number(e.target.value) })} /></div>
              </div>
            </div>
            <DialogFooter><Button onClick={save}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
      <div className="space-y-3">
        {data?.map((row) => (
          <Card key={row.id}>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base">{row.title}</CardTitle>
                <div className="text-xs text-muted-foreground">
                  /p/{row.slug} {!row.published && "• Draft"} {row.show_in_nav && "• in nav"}
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/p/${row.slug}`} target="_blank"><Button size="icon" variant="ghost"><ExternalLink className="h-4 w-4" /></Button></Link>
                <Button size="icon" variant="ghost" onClick={() => openEdit(row)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => remove(row.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardHeader>
          </Card>
        ))}
        {data && data.length === 0 && <p className="text-sm text-muted-foreground">No pages yet.</p>}
      </div>
    </div>
  );
}
