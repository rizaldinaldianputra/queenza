"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Clock,
  Tag,
  ImageIcon,
  Upload,
  X
} from "lucide-react";

// --- SHADCN UI COMPONENTS ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

// --- TYPE & MOCK DATA ---
type Service = {
  id: number;
  name: string;
  category: "Eyelash" | "Nails" | "Treatment";
  price: string;
  duration: string;
  status: "Active" | "Inactive";
  image: string; // URL string (bisa dari internet atau blob local)
};

const INITIAL_SERVICES: Service[] = [
  { id: 1, name: "Natural Classic", category: "Eyelash", price: "250000", duration: "90", status: "Active", image: "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?auto=format&fit=crop&q=80&w=100" },
  { id: 2, name: "Russian Volume", category: "Eyelash", price: "400000", duration: "120", status: "Active", image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&q=80&w=100" },
];

export default function ServicesPage() {
  const [data, setData] = useState<Service[]>(INITIAL_SERVICES);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Ref untuk input file agar bisa di-reset
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Form
  const [formData, setFormData] = useState<Partial<Service>>({
    name: "",
    category: "Eyelash",
    price: "",
    duration: "",
    status: "Active",
    image: ""
  });

  // --- LOGIC UPLOAD IMAGE ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Membuat URL sementara dari file yang diupload agar bisa dipreview
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  // --------------------------

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && formData.id) {
        setData(prev => prev.map(item => item.id === formData.id ? { ...item, ...formData } as Service : item));
    } else {
        const newService: Service = {
            id: Date.now(),
            name: formData.name || "New Service",
            category: (formData.category as any) || "Eyelash",
            price: formData.price || "0",
            duration: formData.duration || "0",
            status: (formData.status as any) || "Inactive",
            image: formData.image || "https://images.unsplash.com/photo-1560066984-121867199234?auto=format&fit=crop&q=80&w=100"
        };
        setData([newService, ...data]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", category: "Eyelash", price: "", duration: "", status: "Active", image: "" });
    setIsEditMode(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (item: Service) => {
    setFormData(item);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Hapus layanan ini?")) {
        setData(data.filter(item => item.id !== id));
    }
  };

  const formatRupiah = (price: string) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(price));
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Services</h1>
            <p className="text-slate-500 text-sm">Manage beauty treatments and pricing.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={resetForm} className="bg-pink-600 hover:bg-pink-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add New Service
                </Button>
            </DialogTrigger>
            
            {/* FORM DIALOG */}
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Service" : "Add New Service"}</DialogTitle>
                    <DialogDescription>
                        Tambahkan foto dan detail layanan kecantikan.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                    
                    {/* --- UPLOAD IMAGE AREA --- */}
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Image</Label>
                        <div className="col-span-3">
                            {!formData.image ? (
                                // Tampilan Belum Ada Gambar (Upload Box)
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-3 text-slate-400" />
                                            <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span></p>
                                            <p className="text-xs text-slate-500">PNG, JPG or WEBP</p>
                                        </div>
                                        <input 
                                            id="dropzone-file" 
                                            type="file" 
                                            accept="image/*"
                                            className="hidden" 
                                            onChange={handleImageUpload}
                                            ref={fileInputRef}
                                        />
                                    </label>
                                </div>
                            ) : (
                                // Tampilan Preview Gambar (Sudah Ada)
                                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200 group">
                                    <Image 
                                        src={formData.image} 
                                        alt="Preview" 
                                        fill 
                                        className="object-cover"
                                    />
                                    {/* Tombol Hapus Gambar */}
                                    <button 
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-sm"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Service Name</Label>
                        <Input 
                            id="name" 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="col-span-3" 
                            placeholder="e.g. Russian Volume" 
                            required 
                        />
                    </div>

                    {/* Category */}
                    <div className="grid grid-cols-4 items-center gap-4">
                         <Label className="text-right">Category</Label>
                         <select 
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                        >
                            <option value="Eyelash">Eyelash</option>
                            <option value="Nails">Nails</option>
                            <option value="Treatment">Treatment</option>
                        </select>
                    </div>

                    {/* Price & Duration */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price (IDR)</Label>
                        <Input 
                            id="price" 
                            type="number"
                            value={formData.price} 
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="col-span-3" 
                            placeholder="e.g. 250000" 
                            required 
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right">Duration (Min)</Label>
                        <Input 
                            id="duration" 
                            type="number"
                            value={formData.duration} 
                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            className="col-span-3" 
                            placeholder="e.g. 90" 
                            required 
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                         <Label className="text-right">Status</Label>
                         <select 
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                        >
                            <option value="Active">Active (Visible)</option>
                            <option value="Inactive">Inactive (Hidden)</option>
                        </select>
                    </div>

                    <DialogFooter className="mt-4">
                         <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800 w-full sm:w-auto">
                             {isEditMode ? "Save Changes" : "Create Service"}
                         </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      {/* --- TABLE CONTENT (SAMA SEPERTI SEBELUMNYA) --- */}
      <div className="flex items-center gap-2 max-w-sm">
         <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search services..."
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-80">Image</TableHead>
              <TableHead>Service Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
                filteredData.map((item) => (
                <TableRow key={item.id}>
                    <TableCell>
                        <div className="w-12 h-12 rounded-lg overflow-hidden relative bg-slate-100 border border-slate-200">
                             <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill 
                                className="object-cover"
                             />
                        </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{item.name}</TableCell>
                    <TableCell>
                         <div className="flex items-center gap-1.5">
                            <Tag className="w-3 h-3 text-slate-400" />
                            <span className="text-slate-600">{item.category}</span>
                         </div>
                    </TableCell>
                    <TableCell className="font-bold text-slate-700">
                        {formatRupiah(item.price)}
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            {item.duration} min
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline" className={item.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-100 text-slate-500 border-slate-200"}>
                            {item.status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEdit(item)} className="cursor-pointer">
                                    <Pencil className="mr-2 h-4 w-4" /> Edit Service
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(item.id)} className="cursor-pointer text-red-600 focus:text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center flex flex-col items-center justify-center text-slate-500">
                        <ImageIcon className="h-8 w-8 text-slate-300 mb-2" />
                        No services found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}