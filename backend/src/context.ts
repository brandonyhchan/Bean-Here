import { PrismaClient } from "@prisma/client";
import { getUserId } from "./utils/jwt.js";
import { Request } from "express";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

export const context = ({ req }: { req: Request }): Context => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  let userId: number | undefined;

  if (token) {
    try {
      const tokenPayload = getUserId(token);
      userId = tokenPayload.userId;
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  return {
    prisma,
    userId,
  };
};
