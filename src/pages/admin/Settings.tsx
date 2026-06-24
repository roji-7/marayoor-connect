import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminSettings() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function updateEmail() {
    if (!email.trim()) return;
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ email: email.trim() });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Email updated. Confirm via the link sent to the new address if required.");
  }
  async function updatePassword() {
    if (password.length < 6) return toast.error("Password must be 6+ characters");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    setPassword("");
    toast.success("Password updated");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-tvk-gold">Account Settings</h1>
        <p className="text-sm text-muted-foreground">Change your admin login email and password.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>Current: {user?.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>New email</Label>
            <Input type="email" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button onClick={updateEmail} disabled={busy}>Update email</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Password</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>New password</Label>
            <Input type="password" minLength={6} maxLength={100} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button onClick={updatePassword} disabled={busy}>Update password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
