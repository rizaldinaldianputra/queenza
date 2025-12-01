import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { User } from "@/types/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    if (req.method === "GET") {
      // Ambil user by ID
      const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, phone: true, role: true },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.status(200).json(user as User);
    }

    if (req.method === "PUT") {
      // Update user
      const { name, phone, role, password } = req.body;
      const updateData: any = { name, phone, role };

      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
        select: { id: true, name: true, email: true, phone: true, role: true },
      });

      return res.status(200).json(updatedUser as User);
    }

    if (req.method === "DELETE") {
      // Hapus user
      await prisma.user.delete({ where: { id } });
      return res.status(200).json({ message: "User deleted successfully" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
