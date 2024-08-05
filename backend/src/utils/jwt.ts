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
    if (error instanceof jwt.JsonWebTokenError) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired");
      } else {
        throw new Error("Invalid token");
      }
    } else {
      throw new Error("An unknown error occurred during token verification");
    }
  }
}
