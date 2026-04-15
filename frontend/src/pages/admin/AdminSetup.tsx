import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ShieldAlert, Loader2 } from "lucide-react";

const AdminSetup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSetup = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest<{ _id: string; username: string; token: string }>("/api/admin/setup", {
        method: "POST",
        body: { username, password },
      });

      login(data);
      toast({
        title: "Super admin created",
        description: "Your account is ready. Welcome to the admin dashboard.",
      });
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Setup failed",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center p-4 bg-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[80px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
            <ShieldAlert className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Initial Setup</h1>
          <p className="text-muted-foreground mt-2">Secure your CAAC admin portal</p>
        </div>

        <Card className="w-full border-muted shadow-xl shadow-emerald-900/5 p-2 backdrop-blur-sm bg-background/95">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl text-center">Super Admin Setup</CardTitle>
            <CardDescription className="text-center">Create the first and master administrator account.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSetup}>
            <CardContent className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="username" className="font-semibold text-sm">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  className="h-11 focus-visible:ring-emerald-500/50"
                  placeholder="admin"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="font-semibold text-sm">Target Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="h-11 focus-visible:ring-emerald-500/50"
                  placeholder="••••••••"
                  value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="font-semibold text-sm">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                className="h-11 focus-visible:ring-emerald-500/50"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
            <Button className="w-full h-11 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                  Creating account...
                </>
              ) : "Create Super Admin"}
            </Button>
            <Button variant="ghost" className="w-full h-11" asChild>
              <Link to="/admin">Back to Login</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
      </motion.div>
    </div>
  );
};

export default AdminSetup;