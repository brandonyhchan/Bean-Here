import jwt from "jsonwebtoken";

export interface AuthTokenPayload {
  userId: number;
}

export function getUserId(authHeader: string): AuthTokenPayload {
  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    throw new Error("No token found");
  }

  try {
    return jwt.verify(token, <jwt.Secret>process.env.PUBLIC_KEY, {
      algorithms: ["RS256"],
    }) as AuthTokenPayload;
  } catch (error) {
    console.error("Invalid or expired token", error);
    throw new Error("Invalid or expired token");
  }
}
