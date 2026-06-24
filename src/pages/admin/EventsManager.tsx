import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface EventRow {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  image_url: string | null;
  published: boolean;
  sort_order: number;
}

const EMPTY: Omit<EventRow, "id"> = {
  title: "",
  description: "",
  event_date: "",
  image_url: "",
  published: true,
  sort_order: 0,
};

export default function EventsManager() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin_events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("sort_order")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as EventRow[];
    },
  });
  const [editing, setEditing] = useState<EventRow | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  }
  function openEdit(row: EventRow) {
    setEditing(row);
    setForm({
      title: row.title,
      description: row.description ?? "",
      event_date: row.event_date ?? "",
      image_url: row.image_url ?? "",
      published: row.published,
      sort_order: row.sort_order,
    });
    setOpen(true);
  }
  async function save() {
    if (!form.title.trim()) return toast.error("Title required");
    const payload = {
      ...form,
      event_date: form.event_date || null,
      image_url: form.image_url || null,
      description: form.description || null,
    };
    const res = editing
      ? await supabase.from("events").update(payload).eq("id", editing.id)
      : await supabase.from("events").insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["admin_events"] });
    qc.invalidateQueries({ queryKey: ["public_events"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin_events"] });
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-tvk-gold">Events</h1>
          <p className="text-sm text-muted-foreground">Create and manage public events.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" /> New event</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit event" : "New event"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input maxLength={200} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea maxLength={2000} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Date</Label><Input type="date" value={form.event_date ?? ""} onChange={(e) => setForm({ ...form, event_date: e.target.value })} /></div>
                <div><Label>Sort order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
              </div>
              <ImageUpload value={form.image_url || null} onChange={(url) => setForm({ ...form, image_url: url ?? "" })} folder="events" />
              <div className="flex items-center gap-2">
                <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
                <Label>Published</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={save}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
      <div className="space-y-3">
        {data?.map((row) => (
          <Card key={row.id}>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {row.image_url && <img src={row.image_url} alt="" className="h-12 w-12 rounded object-cover" />}
                <div>
                  <CardTitle className="text-base">{row.title}</CardTitle>
                  <div className="text-xs text-muted-foreground">
                    {row.event_date ?? "No date"} {!row.published && "• Draft"}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => openEdit(row)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => remove(row.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardHeader>
          </Card>
        ))}
        {data && data.length === 0 && <p className="text-sm text-muted-foreground">No events yet.</p>}
      </div>
    </div>
  );
}
