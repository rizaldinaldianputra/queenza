import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PaginatedResponse } from "@/types/paginate";
import prisma from "@/lib/prisma";
import { User } from "@/types/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { name, email, password, phone, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "name, email, and password are required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone: phone || null,
          role: role || "USER",
        },
      });

      // Hanya kirim field aman
      const response: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || undefined,
        role: user.role,
      };

      return res.status(201).json(response);
    }

    if (req.method === "GET") {
  const page = parseInt((req.query.page as string) || "1");
  const perPage = parseInt((req.query.perPage as string) || "10");
  const skip = (page - 1) * perPage;

  const [total, users] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      skip,
      take: perPage,
      select: { id: true, name: true, email: true, phone: true, role: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Convert phone null => undefined supaya sesuai type User
  const mappedUsers: User[] = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone ?? undefined,
    role: u.role,
  }));

  const totalPages = Math.ceil(total / perPage);

  const response: PaginatedResponse<User> = {
    data: mappedUsers,
    total,
    page,
    perPage,
    totalPages,
  };

  return res.status(200).json(response);
}


    return res.status(405).json({ message: "Method not allowed" });
  } catch (error: any) {
    console.error("Server error:", error);
    return res.status(500).json({ message: error.message });
  }
}
