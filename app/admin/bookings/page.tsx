"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  CalendarIcon,
  Filter
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

// --- MOCK DATA ---
type Booking = {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  price: string;
};

const INITIAL_DATA: Booking[] = [
  { id: "INV-001", customer: "Cantika Putri", service: "Russian Volume", date: "2023-10-12", time: "14:00", status: "Pending", price: "Rp 400.000" },
  { id: "INV-002", customer: "Dewi Sartika", service: "Natural Classic", date: "2023-10-12", time: "10:00", status: "Confirmed", price: "Rp 250.000" },
  { id: "INV-003", customer: "Rina Nose", service: "Lash Lift", date: "2023-10-11", time: "13:00", status: "Completed", price: "Rp 150.000" },
  { id: "INV-004", customer: "Susi Susanti", service: "Nail Art Custom", date: "2023-10-15", time: "16:00", status: "Cancelled", price: "Rp 300.000" },
  { id: "INV-005", customer: "Bunga Citra", service: "Retouch", date: "2023-10-13", time: "09:00", status: "Confirmed", price: "Rp 150.000" },
];

export default function BookingsPage() {
  const [data, setData] = useState<Booking[]>(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // State Form
  const [formData, setFormData] = useState<Partial<Booking>>({
    customer: "",
    service: "",
    date: "",
    time: "",
    status: "Pending",
    price: ""
  });

  // Filter Data Logic
  const filteredData = data.filter((item) =>
    item.customer.toLowerCase().includes(search.toLowerCase()) ||
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && formData.id) {
        // Update Existing
        setData(prev => prev.map(item => item.id === formData.id ? { ...item, ...formData } as Booking : item));
    } else {
        // Create New
        const newBooking: Booking = {
            id: `INV-00${data.length + 1}`,
            customer: formData.customer || "Guest",
            service: formData.service || "-",
            date: formData.date || "",
            time: formData.time || "",
            status: (formData.status as any) || "Pending",
            price: formData.price || "Rp 0"
        };
        setData([newBooking, ...data]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ customer: "", service: "", date: "", time: "", status: "Pending", price: "" });
    setIsEditMode(false);
  };

  const handleEdit = (item: Booking) => {
    setFormData(item);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
        setData(data.filter(item => item.id !== id));
    }
  };

  // Status Badge Color Helper
  const getStatusBadge = (status: string) => {
    switch(status) {
        case "Confirmed": return "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200";
        case "Completed": return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
        case "Cancelled": return "bg-red-100 text-red-700 hover:bg-red-100 border-red-200";
        default: return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bookings</h1>
            <p className="text-slate-500 text-sm">Manage appointment schedules and status.</p>
        </div>
        
        {/* Tombol Add New (Membuka Dialog) */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={resetForm} className="bg-pink-600 hover:bg-pink-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add New Booking
                </Button>
            </DialogTrigger>
            
            {/* --- FORM INPUT DIALOG --- */}
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Booking" : "Create New Booking"}</DialogTitle>
                    <DialogDescription>
                        Isi detail booking customer di bawah ini. Klik save untuk menyimpan.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customer" className="text-right">Customer</Label>
                        <Input 
                            id="customer" 
                            value={formData.customer} 
                            onChange={(e) => setFormData({...formData, customer: e.target.value})}
                            className="col-span-3" 
                            placeholder="Nama Pelanggan" 
                            required 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="service" className="text-right">Service</Label>
                        <select 
                            id="service"
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.service}
                            onChange={(e) => setFormData({...formData, service: e.target.value})}
                        >
                            <option value="">Pilih Layanan</option>
                            <option value="Russian Volume">Russian Volume</option>
                            <option value="Natural Classic">Natural Classic</option>
                            <option value="Lash Lift">Lash Lift</option>
                            <option value="Nails Art">Nails Art</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">Date</Label>
                        <Input 
                            id="date" 
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="col-span-3" 
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">Time</Label>
                        <Input 
                            id="time" 
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            className="col-span-3" 
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <select 
                             id="status"
                             className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                             value={formData.status}
                             onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price</Label>
                        <Input 
                            id="price" 
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="col-span-3" 
                            placeholder="Rp 0"
                        />
                    </div>
                    
                    <DialogFooter className="mt-4">
                         <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">
                             {isEditMode ? "Save Changes" : "Create Booking"}
                         </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      {/* --- FILTER & SEARCH --- */}
      <div className="flex items-center gap-2">
         <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search customer or ID..."
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
         </Button>
      </div>

      {/* --- TABLE --- */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
                filteredData.map((item) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium text-slate-600">{item.id}</TableCell>
                    <TableCell>
                        <div className="font-medium text-slate-900">{item.customer}</div>
                        <div className="text-xs text-slate-500">Regular Member</div>
                    </TableCell>
                    <TableCell>{item.service}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-1 text-slate-600">
                            <CalendarIcon className="h-3 w-3" />
                            <span className="text-sm">{item.date}</span>
                        </div>
                        <div className="text-xs text-slate-500 pl-4">{item.time}</div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline" className={getStatusBadge(item.status)}>
                            {item.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{item.price}</TableCell>
                    
                    {/* ACTION MENU (Edit/Delete) */}
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
                                    <Pencil className="mr-2 h-4 w-4" /> Edit Details
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
                    <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                        No results found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}