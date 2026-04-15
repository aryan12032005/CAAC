import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Mail, Briefcase, Plus, Users } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type TeamMember = {
  _id: string;
  name: string;
  designation: string;
  email?: string;
  image?: string;
  category?: "Faculty" | "Staff" | "Research Scholar";
};

const emptyForm = {
  name: "",
  designation: "",
  email: "",
  image: "",
  category: "Faculty",
};

const TeamManagerPage = () => {
  const { adminInfo } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadTeamMembers = async () => {
    setLoading(true);
    try {
      const data = await apiRequest<TeamMember[]>("/api/team");
      setItems(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to load team members",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const saveItem = async () => {
    if (!adminInfo?.token) {
      return;
    }

    if (!form.name.trim() || !form.designation.trim()) {
      toast({
        variant: "destructive",
        title: "Name and designation are required",
      });
      return;
    }

    try {
      if (editingId) {
        await apiRequest(`/api/team/${editingId}`, {
          method: "PUT",
          token: adminInfo.token,
          body: form,
        });
      } else {
        await apiRequest("/api/team", {
          method: "POST",
          token: adminInfo.token,
          body: form,
        });
      }

      toast({ title: editingId ? "Team member updated" : "Team member added" });
      resetForm();
      loadTeamMembers();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const startEdit = (item: TeamMember) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      designation: item.designation,
      email: item.email || "",
      image: item.image || "",
      category: item.category || "Faculty",
    });
  };

  const removeItem = async (id: string) => {
    if (!adminInfo?.token) {
      return;
    }

    try {
      await apiRequest(`/api/team/${id}`, {
        method: "DELETE",
        token: adminInfo.token,
      });
      toast({ title: "Team member deleted" });
      loadTeamMembers();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 md:pb-12">
      <div className="lg:col-span-5 flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Card className="border-muted/60 shadow-md">
            <CardHeader className="bg-muted/30 border-b pb-4 mb-4">
              <CardTitle className="flex items-center gap-2 text-xl text-primary">
                {editingId ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {editingId ? "Edit Team Member" : "Add Team Member"}
              </CardTitle>
              <CardDescription>Fill out the details to {editingId ? 'update the' : 'add a new'} team member to the portal.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-semibold">Full Name <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  className="focus-visible:ring-primary/50"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="e.g. Dr. Jane Doe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="designation" className="font-semibold">Designation <span className="text-destructive">*</span></Label>
                  <Input
                    id="designation"
                    className="focus-visible:ring-primary/50"
                    value={form.designation}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, designation: event.target.value }))
                    }
                    placeholder="e.g. Professor"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category" className="font-semibold">Category</Label>
                  <Input
                    id="category"
                    className="focus-visible:ring-primary/50"
                    value={form.category}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        category: event.target.value as "Faculty" | "Staff" | "Research Scholar",
                      }))
                    }
                    placeholder="Faculty / Staff / Research Scholar"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="font-semibold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  className="focus-visible:ring-primary/50"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="e.g. jane.doe@example.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image" className="font-semibold">Profile Image URL</Label>
                <Input
                  id="image"
                  className="focus-visible:ring-primary/50"
                  value={form.image}
                  onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={saveItem} className="w-full sm:w-auto shadow-sm">
                  {editingId ? "Update Member" : "Add Member"}
                </Button>
                {editingId && (
                  <Button variant="outline" onClick={resetForm} className="w-full sm:w-auto">
                    Cancel Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-4">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Manage Team</h2>
            <div className="text-sm text-muted-foreground font-medium bg-muted/50 px-3 py-1 rounded-full">
              {items.length} {items.length === 1 ? 'Member' : 'Members'}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-5 flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-3" />
                      <div className="flex gap-2 mt-4">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : items.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-lg bg-muted/10">
                <div className="bg-muted p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No Team Members Found</h3>
                <p className="text-muted-foreground mb-4 max-w-sm mt-1">
                  You haven't added any team members yet. Use the form to add the first person.
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, height: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card className="group border-muted hover:border-primary/30 transition-all shadow-sm hover:shadow-md h-full">
                      <CardContent className="p-5 flex flex-col h-full bg-gradient-to-br from-background to-muted/20">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
                            <AvatarImage src={item.image || ""} alt={item.name} className="object-cover" />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                              {item.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 overflow-hidden">
                            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                              {item.name}
                            </h3>
                            <Badge variant="secondary" className="mt-1 font-normal select-none">
                              {item.category || "Faculty"}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-auto text-sm text-muted-foreground bg-background rounded-md p-3 border border-muted/50 mb-4">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                            <span className="truncate">{item.designation}</span>
                          </div>
                          {item.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                              <a href={`mailto:${item.email}`} className="truncate hover:text-primary transition-colors">
                                {item.email}
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 mt-auto pt-2 border-t border-muted/30">
                          <Button size="sm" variant="secondary" onClick={() => startEdit(item)} className="flex-1">
                            <Edit2 className="h-3 w-3 mr-2" /> Edit
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive" className="flex-1 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 hover:border-red-500 transition-colors">
                                <Trash2 className="h-3 w-3 mr-2" /> Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete <strong>{item.name}</strong> from the database.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => removeItem(item._id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Delete Permanently
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamManagerPage;