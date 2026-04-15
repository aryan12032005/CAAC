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
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  status?: string;
  year?: string;
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
  status: "",
  year: "",
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
      status: item.status || "",
      year: item.year || "",
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
          <Card className="border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white/50 border-b border-slate-100 pb-5 mb-5 px-6">
              <CardTitle className="flex items-center gap-3 text-xl text-slate-800 font-extrabold">
                {editingId ? (
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600"><Edit2 className="h-5 w-5" /></div>
                ) : (
                  <div className="p-2 rounded-lg bg-primary/10 text-primary"><Plus className="h-5 w-5" /></div>
                )}
                {editingId ? `Edit ${label} Item` : `Add New ${label} Item`}
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">Fill out the form below to {editingId ? 'update the' : 'add a new'} item to the {label} section.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 px-6 pb-6">
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
                  <Label className="font-semibold">Year</Label>
                  <Select
                    value={form.year || "none"}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, year: value === "none" ? "" : value }))}
                  >
                    <SelectTrigger className="focus-visible:ring-primary/50">
                      <SelectValue placeholder="Select year (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label className="font-semibold">Status</Label>
                  <Select
                    value={form.status || "none"}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, status: value === "none" ? "" : value }))}
                  >
                    <SelectTrigger className="focus-visible:ring-primary/50 capitalize">
                      <SelectValue placeholder="Select status (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="communicated">Communicated</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="granted">Granted</SelectItem>
                      <SelectItem value="sanctioned">Sanctioned</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="font-semibold">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal focus-visible:ring-primary/50",
                          !form.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.startDate ? format(new Date(form.startDate), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.startDate ? new Date(form.startDate) : undefined}
                        onSelect={(date) =>
                          setForm((prev) => ({ ...prev, startDate: date ? format(date, "yyyy-MM-dd") : "" }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label className="font-semibold">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal focus-visible:ring-primary/50",
                          !form.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.endDate ? format(new Date(form.endDate), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.endDate ? new Date(form.endDate) : undefined}
                        onSelect={(date) =>
                          setForm((prev) => ({ ...prev, endDate: date ? format(date, "yyyy-MM-dd") : "" }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100 mt-2">
                <Button onClick={saveItem} className="w-full sm:w-auto shadow-[0_4px_14px_0_rgba(15,23,42,0.15)] bg-slate-800 text-white hover:bg-slate-700 transition-all font-semibold rounded-xl px-8 focus:ring-4 focus:ring-slate-100">
                  {editingId ? "Update Item" : "Save Item"}
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
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">Manage {label}</h2>
            <div className="text-sm font-bold bg-gradient-to-br from-primary/10 to-blue-500/10 text-primary px-4 py-1.5 rounded-full border border-primary/10">
              {items.length} {items.length === 1 ? 'Item' : 'Items'}
            </div>
          </div>
          
          <div className="grid gap-5">
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
                    <Card className="group border-slate-200/60 bg-white/70 backdrop-blur-md hover:bg-white transition-all duration-300 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                      <CardContent className="p-6 flex flex-col gap-4 relative z-10">
                        <div>
                          <h3 className="font-extrabold text-lg text-slate-800 group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                          {item.subtitle && <p className="text-sm font-semibold text-slate-500 mt-1 line-clamp-1 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300" />{item.subtitle}</p>}
                        </div>
                        
                        {(item.status || item.year) && (
                          <div className="flex gap-2.5 w-fit">
                            {item.status && (
                              <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 capitalize shadow-sm">
                                {item.status}
                              </span>
                            )}
                            {item.year && (
                              <span className="inline-flex items-center rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20 shadow-sm">
                                <CalendarIcon className="w-3 h-3 mr-1" />
                                {item.year}
                              </span>
                            )}
                          </div>
                        )}

                        {item.description && (
                          <div className="text-sm text-slate-600 leading-relaxed line-clamp-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200/50 shadow-inner my-1">
                            {item.description}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 mt-2 text-xs font-medium text-slate-500">
                          {item.link && (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors bg-blue-50/50 px-2 py-1 rounded-md">
                              <LinkIcon className="h-3 w-3" /> External Link
                            </a>
                          )}
                          {(item.startDate || item.endDate) && (
                            <div className="flex items-center gap-1.5 bg-slate-50/50 px-2 py-1 rounded-md">
                              <CalendarIcon className="h-3 w-3 text-slate-400" />
                              {item.startDate} {item.endDate ? `— ${item.endDate}` : ''}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex gap-3 pt-4 border-t border-slate-100/80">
                          <Button size="sm" variant="secondary" onClick={() => startEdit(item)} className="w-full bg-slate-100/80 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-all font-semibold rounded-xl shadow-sm border border-slate-200/50">
                            <Edit2 className="h-4 w-4 mr-2 text-slate-500" /> Edit Entry
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive" className="w-full bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-100 hover:border-red-500 transition-all font-semibold rounded-xl shadow-sm">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-2xl border-slate-200/60 bg-white/90 backdrop-blur-xl shadow-2xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-bold text-slate-800">Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-slate-500">
                                  This action cannot be undone. This will permanently delete the 
                                  <strong className="text-slate-800 font-bold px-1"> {item.title}</strong> entry from the database.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="mt-4">
                                <AlertDialogCancel className="rounded-xl font-semibold border-slate-200 hover:bg-slate-50">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => removeItem(item._id)} className="rounded-xl font-bold bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/20">
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