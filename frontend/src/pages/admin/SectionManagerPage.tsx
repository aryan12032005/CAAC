import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Edit2, Link as LinkIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
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

type SectionItem = {
  _id: string;
  section: string;
  title: string;
  subtitle?: string;
  description?: string;
  link?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
};

type SectionManagerPageProps = {
  section: string;
  label: string;
};

const emptyForm = {
  title: "",
  subtitle: "",
  description: "",
  link: "",
  image: "",
  startDate: "",
  endDate: "",
};

const SectionManagerPage = ({ section, label }: SectionManagerPageProps) => {
  const { adminInfo } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await apiRequest<SectionItem[]>(`/api/sections/${section}`);
      setItems(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Failed to load ${label}`,
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [section]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const saveItem = async () => {
    if (!adminInfo?.token) {
      return;
    }

    if (!form.title.trim()) {
      toast({
        variant: "destructive",
        title: "Title is required",
      });
      return;
    }

    try {
      if (editingId) {
        await apiRequest(`/api/sections/item/${editingId}`, {
          method: "PUT",
          token: adminInfo.token,
          body: form,
        });
      } else {
        await apiRequest(`/api/sections/${section}`, {
          method: "POST",
          token: adminInfo.token,
          body: form,
        });
      }

      toast({ title: editingId ? "Item updated" : "Item added" });
      resetForm();
      loadItems();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const startEdit = (item: SectionItem) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
      link: item.link || "",
      image: item.image || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
    });
  };

  const removeItem = async (id: string) => {
    if (!adminInfo?.token) {
      return;
    }

    try {
      await apiRequest(`/api/sections/item/${id}`, {
        method: "DELETE",
        token: adminInfo.token,
      });
      toast({ title: "Item deleted" });
      loadItems();
    } catch (error) {
    }
  };

  const isSaving = false; // We can use this to show loading on save button, but using local state is better. Let's add saving state? Wait, I don't need to overcomplicate, I'll just use loading.
  
  return (
    <div className="grid gap-8 lg:grid-cols-12 md:pb-12">
      <div className="lg:col-span-5 flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Card className="border-muted/60 shadow-md">
            <CardHeader className="bg-muted/30 border-b pb-4 mb-4">
              <CardTitle className="flex items-center gap-2 text-xl text-primary">
                {editingId ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {editingId ? `Edit ${label} Item` : `Add New ${label} Item`}
              </CardTitle>
              <CardDescription>Fill out the form below to {editingId ? 'update the' : 'add a new'} item to the {label} section.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="title" className="font-semibold">Title <span className="text-destructive">*</span></Label>
                <Input
                  id="title"
                  className="focus-visible:ring-primary/50"
                  value={form.title}
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder="Enter main title"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="subtitle" className="font-semibold">Subtitle</Label>
                <Input
                  id="subtitle"
                  className="focus-visible:ring-primary/50"
                  value={form.subtitle}
                  onChange={(event) => setForm((prev) => ({ ...prev, subtitle: event.target.value }))}
                  placeholder="Optional brief subtitle"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="font-semibold">Description</Label>
                <Textarea
                  id="description"
                  className="min-h-[120px] resize-y focus-visible:ring-primary/50"
                  value={form.description}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, description: event.target.value }))
                  }
                  placeholder="Detailed description of the item"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="link" className="font-semibold">Link URL</Label>
                  <Input
                    id="link"
                    className="focus-visible:ring-primary/50"
                    value={form.link}
                    onChange={(event) => setForm((prev) => ({ ...prev, link: event.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image" className="font-semibold">Image URL</Label>
                  <Input
                    id="image"
                    className="focus-visible:ring-primary/50"
                    value={form.image}
                    onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate" className="font-semibold">Start Date</Label>
                  <div className="relative">
                    <Input
                      id="startDate"
                      type="date"
                      className="focus-visible:ring-primary/50 pl-10"
                      value={form.startDate}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, startDate: event.target.value }))
                      }
                      placeholder="YYYY-MM-DD"
                    />
                    <CalendarIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate" className="font-semibold">End Date</Label>
                  <div className="relative">
                    <Input
                      id="endDate"
                      type="date"
                      className="focus-visible:ring-primary/50 pl-10"
                      value={form.endDate}
                      onChange={(event) => setForm((prev) => ({ ...prev, endDate: event.target.value }))}
                      placeholder="YYYY-MM-DD"
                    />
                    <CalendarIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={saveItem} className="w-full sm:w-auto shadow-sm">
                  {editingId ? "Update Item" : "Save Item"}
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
            <h2 className="text-2xl font-bold tracking-tight">Manage {label}</h2>
            <div className="text-sm text-muted-foreground font-medium bg-muted/50 px-3 py-1 rounded-full">
              {items.length} {items.length === 1 ? 'Item' : 'Items'}
            </div>
          </div>
          
          <div className="grid gap-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-lg bg-muted/10">
                <div className="bg-muted p-4 rounded-full mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No {label} Found</h3>
                <p className="text-muted-foreground mb-4 max-w-sm mt-1">
                  You haven't added any {label.toLowerCase()} yet. Use the form to create your first item.
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
                    <Card className="group border-muted hover:border-primary/30 transition-all shadow-sm hover:shadow-md">
                      <CardContent className="p-5 flex flex-col gap-3">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                          {item.subtitle && <p className="text-sm font-medium text-muted-foreground mt-0.5 line-clamp-1">{item.subtitle}</p>}
                        </div>
                        
                        {item.description && (
                          <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-2 bg-muted/20 p-2 rounded-md border border-muted/30">
                            {item.description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          {item.link && (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                              <LinkIcon className="h-3 w-3" /> External Link
                            </a>
                          )}
                          {(item.startDate || item.endDate) && (
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {item.startDate} {item.endDate ? `— ${item.endDate}` : ''}
                            </div>
                          )}
                        </div>

                        <div className="mt-3 flex gap-2 pt-3 border-t border-muted/30">
                          <Button size="sm" variant="secondary" onClick={() => startEdit(item)} className="w-24">
                            <Edit2 className="h-3 w-3 mr-2" /> Edit
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive" className="w-24 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 hover:border-red-500 transition-colors">
                                <Trash2 className="h-3 w-3 mr-2" /> Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the 
                                  <strong> {item.title}</strong> entry from the database.
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

export default SectionManagerPage;