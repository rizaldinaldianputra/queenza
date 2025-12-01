"use client";

import React, { useState } from "react";
import { 
  Search, 
  MoreHorizontal, 
  Trash2, 
  Star,
  CheckCircle,
  XCircle,
  MessageSquare,
  ThumbsUp
} from "lucide-react";

// --- SHADCN UI COMPONENTS ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
type Review = {
  id: string;
  customerName: string;
  avatar: string;
  service: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  status: "Pending" | "Published" | "Rejected";
  reply?: string; // Balasan admin
};

const INITIAL_REVIEWS: Review[] = [
  {
    id: "REV-001",
    customerName: "Cantika Putri",
    avatar: "https://i.pravatar.cc/150?img=5",
    service: "Russian Volume",
    rating: 5,
    comment: "Suka banget sama hasilnya! Bulu matanya halus, nggak berat di mata, dan pengerjaannya cepet banget. Recommended!",
    date: "2023-10-12",
    status: "Published",
    reply: "Terima kasih Kak Cantika! Ditunggu kedatangannya kembali ya ❤️"
  },
  {
    id: "REV-002",
    customerName: "Dewi Sartika",
    avatar: "https://i.pravatar.cc/150?img=9",
    service: "Lash Lift",
    rating: 4,
    comment: "Hasilnya bagus natural, cuma antriannya agak lama tadi padahal udah booking. Tapi overall oke.",
    date: "2023-10-11",
    status: "Pending",
  },
  {
    id: "REV-003",
    customerName: "Susi Susanti",
    avatar: "", // No avatar
    service: "Nail Art Custom",
    rating: 5,
    comment: "Nail art-nya rapi banget, detailnya dapet. Mbaknya juga ramah.",
    date: "2023-10-10",
    status: "Pending",
  },
  {
    id: "REV-004",
    customerName: "Anonim",
    avatar: "https://i.pravatar.cc/150?img=12",
    service: "Retouch",
    rating: 1,
    comment: "Baru 3 hari udah rontok parah. Kecewa banget sama lemnya.",
    date: "2023-10-09",
    status: "Rejected",
  },
];

export default function ReviewsPage() {
  const [data, setData] = useState<Review[]>(INITIAL_REVIEWS);
  const [search, setSearch] = useState("");
  
  // State untuk Reply Dialog
  const [replyText, setReplyText] = useState("");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  // --- ACTIONS ---
  const handleStatusChange = (id: string, newStatus: "Published" | "Rejected") => {
    setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus ulasan ini secara permanen?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const openReplyDialog = (review: Review) => {
    setSelectedReview(review);
    setReplyText(review.reply || "");
    setIsReplyOpen(true);
  };

  const handleSaveReply = () => {
    if (selectedReview) {
        setData(prev => prev.map(item => item.id === selectedReview.id ? { ...item, reply: replyText, status: "Published" } : item));
        setIsReplyOpen(false);
    }
  };

  // --- SEARCH LOGIC ONLY ---
  const filteredData = data.filter((item) =>
    item.customerName.toLowerCase().includes(search.toLowerCase()) ||
    item.comment.toLowerCase().includes(search.toLowerCase())
  );

  // Helper render stars
  const renderStars = (rating: number) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}`} 
                />
            ))}
        </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reviews</h1>
            <p className="text-slate-500 text-sm">Moderate customer feedback and ratings.</p>
        </div>

        {/* Search Input Only */}
        <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
                placeholder="Search reviews..."
                className="pl-9 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      </div>

      {/* --- TABLE CONTENT --- */}
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
        <TableHeader>
            <TableRow className="bg-slate-50">
            <TableHead className="w-[250px]">Customer</TableHead>
            <TableHead className="w-[120px]">Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filteredData.length > 0 ? (
                filteredData.map((item) => (
                <TableRow key={item.id}>
                    {/* Customer Info */}
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={item.avatar} />
                                <AvatarFallback className="bg-pink-100 text-pink-600 font-bold">
                                    {item.customerName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-slate-900">{item.customerName}</div>
                                <div className="text-xs text-slate-500">{item.service} • {item.date}</div>
                            </div>
                        </div>
                    </TableCell>

                    {/* Rating */}
                    <TableCell>
                        {renderStars(item.rating)}
                    </TableCell>

                    {/* Comment */}
                    <TableCell>
                        <p className="text-sm text-slate-700 leading-relaxed mb-1">
                            "{item.comment}"
                        </p>
                        {item.reply && (
                            <div className="bg-slate-50 border-l-2 border-pink-400 p-2 rounded-r text-xs text-slate-600 italic mt-2">
                                <span className="font-bold text-pink-600 not-italic">Admin:</span> {item.reply}
                            </div>
                        )}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                        <Badge 
                            className={
                                item.status === "Published" ? "bg-green-100 text-green-700 border-none hover:bg-green-100" :
                                item.status === "Pending" ? "bg-yellow-100 text-yellow-700 border-none hover:bg-yellow-100 animate-pulse" :
                                "bg-red-100 text-red-700 border-none hover:bg-red-100"
                            }
                        >
                            {item.status}
                        </Badge>
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
                                <DropdownMenuLabel>Moderation</DropdownMenuLabel>
                                
                                {item.status !== "Published" && (
                                    <DropdownMenuItem onClick={() => handleStatusChange(item.id, "Published")} className="text-green-600 focus:text-green-700 cursor-pointer">
                                        <CheckCircle className="mr-2 h-4 w-4" /> Approve / Publish
                                    </DropdownMenuItem>
                                )}
                                
                                <DropdownMenuItem onClick={() => openReplyDialog(item)} className="cursor-pointer">
                                    <MessageSquare className="mr-2 h-4 w-4" /> {item.reply ? "Edit Reply" : "Reply"}
                                </DropdownMenuItem>
                                
                                {item.status !== "Rejected" && (
                                    <DropdownMenuItem onClick={() => handleStatusChange(item.id, "Rejected")} className="text-orange-600 focus:text-orange-700 cursor-pointer">
                                        <XCircle className="mr-2 h-4 w-4" /> Reject
                                    </DropdownMenuItem>
                                )}
                                
                                <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-600 focus:text-red-700 cursor-pointer">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Permanently
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                        No reviews found.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
        </Table>
      </div>

      {/* --- DIALOG UNTUK MEMBALAS REVIEW --- */}
      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>Reply to {selectedReview?.customerName}</DialogTitle>
                <DialogDescription>
                    Balasan Anda akan muncul secara publik di bawah ulasan pelanggan.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 italic mb-4 border border-slate-100">
                    "{selectedReview?.comment}"
                </div>
                <Label htmlFor="reply" className="mb-2 block">Your Reply</Label>
                <Textarea 
                    id="reply" 
                    placeholder="Tulis ucapan terima kasih atau tanggapan..." 
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                />
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsReplyOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveReply} className="bg-pink-600 hover:bg-pink-700 text-white">
                    <ThumbsUp className="w-4 h-4 mr-2" /> Post Reply
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}