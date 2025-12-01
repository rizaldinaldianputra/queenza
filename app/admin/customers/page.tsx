"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  User,
  Mail,
  Phone,
  Star,
  ShieldCheck,
  Trophy
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- TYPE & MOCK DATA ---
type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: "Silver" | "Gold" | "Platinum";
  points: number;
  status: "Active" | "Blocked";
  joinedDate: string;
  avatar: string;
};

const INITIAL_CUSTOMERS: Customer[] = [
  { 
    id: "CUST-001", 
    name: "Cantika Putri", 
    email: "cantika@gmail.com", 
    phone: "081234567890", 
    tier: "Gold", 
    points: 1250, 
    status: "Active", 
    joinedDate: "2023-01-15",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  { 
    id: "CUST-002", 
    name: "Dewi Sartika", 
    email: "dewi.s@yahoo.com", 
    phone: "081987654321", 
    tier: "Silver", 
    points: 450, 
    status: "Active", 
    joinedDate: "2023-05-20",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  { 
    id: "CUST-003", 
    name: "Rina Nose", 
    email: "rina.nose@gmail.com", 
    phone: "085678901234", 
    tier: "Platinum", 
    points: 3400, 
    status: "Active", 
    joinedDate: "2022-11-10",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  { 
    id: "CUST-004", 
    name: "Susi Susanti", 
    email: "susi.badminton@indo.co.id", 
    phone: "081345678901", 
    tier: "Silver", 
    points: 0, 
    status: "Blocked", 
    joinedDate: "2023-08-01",
    avatar: "" 
  },
];

export default function CustomersPage() {
  const [data, setData] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // State Form
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: "",
    email: "",
    phone: "",
    tier: "Silver",
    points: 0,
    status: "Active",
    avatar: ""
  });

  // Filter Logic
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.phone.includes(search)
  );

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && formData.id) {
        // Edit Mode
        setData(prev => prev.map(item => item.id === formData.id ? { ...item, ...formData } as Customer : item));
    } else {
        // Create Mode
        const newCustomer: Customer = {
            id: `CUST-00${data.length + 1}`,
            name: formData.name || "New Customer",
            email: formData.email || "-",
            phone: formData.phone || "-",
            tier: (formData.tier as any) || "Silver",
            points: Number(formData.points) || 0,
            status: (formData.status as any) || "Active",
            joinedDate: new Date().toISOString().split('T')[0],
            avatar: formData.avatar || ""
        };
        setData([newCustomer, ...data]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", tier: "Silver", points: 0, status: "Active", avatar: "" });
    setIsEditMode(false);
  };

  const handleEdit = (item: Customer) => {
    setFormData(item);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this customer?")) {
        setData(data.filter(item => item.id !== id));
    }
  };

  // Helper Badge Color
  const getTierColor = (tier: string) => {
    switch (tier) {
        case "Platinum": return "bg-violet-100 text-violet-700 border-violet-200";
        case "Gold": return "bg-yellow-100 text-yellow-700 border-yellow-200";
        default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Customers</h1>
            <p className="text-slate-500 text-sm">Manage member data, tiers, and loyalty points.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={resetForm} className="bg-pink-600 hover:bg-pink-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add New Customer
                </Button>
            </DialogTrigger>
            
            {/* --- FORM DIALOG --- */}
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Customer" : "Add New Customer"}</DialogTitle>
                    <DialogDescription>
                        Isi data pelanggan di bawah ini.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    
                    {/* Name & Avatar URL */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input 
                            id="name" 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="col-span-3" 
                            required 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="avatar" className="text-right">Avatar URL</Label>
                        <Input 
                            id="avatar" 
                            value={formData.avatar} 
                            onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                            className="col-span-3" 
                            placeholder="Optional: https://..." 
                        />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input 
                            id="email" 
                            type="email"
                            value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="col-span-3" 
                            required 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">Phone</Label>
                        <Input 
                            id="phone" 
                            value={formData.phone} 
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="col-span-3" 
                            required 
                        />
                    </div>

                    {/* Tier & Points */}
                    <div className="grid grid-cols-4 items-center gap-4">
                         <Label className="text-right">Member Tier</Label>
                         <select 
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.tier}
                            onChange={(e) => setFormData({...formData, tier: e.target.value as any})}
                        >
                            <option value="Silver">Silver (Standard)</option>
                            <option value="Gold">Gold (VIP)</option>
                            <option value="Platinum">Platinum (VVIP)</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="points" className="text-right">Loyalty Points</Label>
                        <Input 
                            id="points" 
                            type="number"
                            value={formData.points} 
                            onChange={(e) => setFormData({...formData, points: Number(e.target.value)})}
                            className="col-span-3" 
                        />
                    </div>

                    {/* Status */}
                    <div className="grid grid-cols-4 items-center gap-4">
                         <Label className="text-right">Account Status</Label>
                         <select 
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                        >
                            <option value="Active">Active</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                    </div>

                    <DialogFooter className="mt-4">
                         <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">
                             {isEditMode ? "Save Changes" : "Create Customer"}
                         </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      {/* --- SEARCH --- */}
      <div className="flex items-center gap-2 max-w-sm">
         <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search name, email, or phone..."
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
      </div>

      {/* --- TABLE --- */}
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-20">Profile</TableHead>
              <TableHead>Customer Info</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Tier & Points</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
                filteredData.map((item) => (
                <TableRow key={item.id}>
                    {/* Profile Avatar */}
                    <TableCell>
                        <Avatar className="h-10 w-10 border border-slate-200">
                            <AvatarImage src={item.avatar} alt={item.name} />
                            <AvatarFallback className="bg-pink-100 text-pink-600 font-bold">
                                {item.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </TableCell>

                    {/* Customer Info */}
                    <TableCell>
                        <div className="font-medium text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.id}</div>
                    </TableCell>

                    {/* Contact */}
                    <TableCell>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <Mail className="h-3 w-3" /> {item.email}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <Phone className="h-3 w-3" /> {item.phone}
                            </div>
                        </div>
                    </TableCell>

                    {/* Tier & Points */}
                    <TableCell>
                        <div className="flex items-center gap-2 mb-1">
                             <Badge variant="outline" className={`${getTierColor(item.tier)} font-bold`}>
                                {item.tier === "Platinum" && <Trophy className="w-3 h-3 mr-1" />}
                                {item.tier}
                             </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            {item.points.toLocaleString()} pts
                        </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                        <Badge 
                            className={
                                item.status === "Active" 
                                ? "bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none" 
                                : "bg-red-100 text-red-700 hover:bg-red-100 border-none shadow-none"
                            }
                        >
                            {item.status}
                        </Badge>
                    </TableCell>
                    
                    {/* Joined Date */}
                    <TableCell className="text-slate-500 text-sm">
                        {item.joinedDate}
                    </TableCell>

                    {/* Actions */}
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
                                    <Pencil className="mr-2 h-4 w-4" /> Edit Profile
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
                        No customers found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}