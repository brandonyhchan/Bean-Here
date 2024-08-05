import { PrismaClient } from "@prisma/client";
import { getUserId } from "./utils/jwt.js";
import { Request } from "express";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

export const context = ({ req }: { req: Request }): Context => {
  let userId: number | undefined;
  try {
    const authHeader = req.headers.authorization || "";
    const tokenPayload = getUserId(authHeader);
    userId = tokenPayload.userId;
  } catch (error) {
    console.error("Authentication error:", error);
  }

  return {
    prisma,
    userId,
  };
};
