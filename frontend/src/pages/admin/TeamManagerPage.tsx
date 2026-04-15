import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/adminApi";
import { getImageUrl } from "@/lib/utils";
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
          <Card className="border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white/50 border-b border-slate-100 pb-5 mb-5 px-6">
              <CardTitle className="flex items-center gap-3 text-xl text-slate-800 font-extrabold">
                {editingId ? (
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600"><Edit2 className="h-5 w-5" /></div>
                ) : (
                  <div className="p-2 rounded-lg bg-primary/10 text-primary"><Plus className="h-5 w-5" /></div>
                )}
                {editingId ? "Edit Team Member" : "Add Team Member"}
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">Fill out the details to {editingId ? 'update the' : 'add a new'} team member to the portal.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 px-6 pb-6">
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

              <div className="flex gap-4 pt-4 border-t border-slate-100 mt-2">
                <Button onClick={saveItem} className="w-full sm:w-auto shadow-[0_4px_14px_0_rgba(15,23,42,0.15)] bg-slate-800 text-white hover:bg-slate-700 transition-all font-semibold rounded-xl px-8 focus:ring-4 focus:ring-slate-100">
                  {editingId ? "Update Member" : "Add Member"}
                </Button>
                {editingId && (
                  <Button variant="outline" onClick={resetForm} className="w-full sm:w-auto rounded-xl hover:bg-slate-50 transition-colors border-slate-200 text-slate-600 font-semibold px-6">
                    Cancel Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-5">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex justify-between items-center mb-6 bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">Manage Team</h2>
            <div className="text-sm font-bold bg-gradient-to-br from-primary/10 to-blue-500/10 text-primary px-4 py-1.5 rounded-full border border-primary/10">
              {items.length} {items.length === 1 ? 'Member' : 'Members'}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
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
                    <Card className="group border-slate-200/60 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 h-full relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                      <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      <CardContent className="p-6 flex flex-col h-full relative z-10">
                        <div className="flex flex-col items-center text-center gap-3 mb-5">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                            <Avatar className="h-20 w-20 border-4 border-white shadow-sm relative">
                              <AvatarImage src={getImageUrl(item.image)} alt={item.name} className="object-cover" />
                              <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-bold text-2xl">
                                {item.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          
                          <div className="flex flex-col items-center gap-1.5 w-full">
                            <h3 className="font-extrabold text-lg text-slate-800 group-hover:text-primary transition-colors line-clamp-1 w-full px-2">
                              {item.name}
                            </h3>
                            <Badge variant="outline" className="font-semibold bg-blue-50 text-blue-700 border-blue-200/60 px-3 py-0.5">
                              {item.category || "Faculty"}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2.5 mt-auto text-sm text-slate-600 bg-slate-50/80 rounded-xl p-4 border border-slate-100/80 mb-5 w-full">
                          <div className="flex items-center gap-3">
                            <div className="bg-white p-1.5 rounded-md shadow-sm border border-slate-100 shrink-0">
                              <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                            </div>
                            <span className="truncate font-medium">{item.designation}</span>
                          </div>
                          {item.email && (
                            <div className="flex items-center gap-3">
                              <div className="bg-white p-1.5 rounded-md shadow-sm border border-slate-100 shrink-0">
                                <Mail className="h-3.5 w-3.5 text-slate-400" />
                              </div>
                              <a href={`mailto:${item.email}`} className="truncate hover:text-primary transition-colors font-medium">
                                {item.email}
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100/80 w-full">
                          <Button size="sm" variant="outline" onClick={() => startEdit(item)} className="flex-1 bg-white hover:bg-slate-50 hover:text-primary border-slate-200 h-9 rounded-xl font-semibold shadow-sm transition-all group-hover:border-primary/20">
                            <Edit2 className="h-4 w-4 mr-2 text-slate-400 group-hover:text-primary transition-colors" /> Edit
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="flex-1 bg-red-50 hover:bg-red-500 hover:text-white border-red-100 text-red-600 h-9 rounded-xl font-semibold shadow-sm transition-all">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
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