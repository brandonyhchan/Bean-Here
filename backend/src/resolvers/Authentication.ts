import * as bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.js";

/**
 * Authentication.ts handles all backend functions related to login and signup.
 */

/**
 * @QUERY
 *
 * Creates a new user with the inputs, hashes the password, and stores the
 * user in the database. On success, returns a JWT token and the user details.
 *
 * @param {object} parent Unused.
 * @param {object} args The arguments object containing user details.
 * @param {object} context The context object containing Prisma client instance.
 * @returns {Promise<object>} Resolves to an object containing a JWT token and the user details.
 * @throws {Error} Throws an error if the user already exists.
 */
export async function signUp(parent, args, context) {
  try {
    // Check if username or email already exists
    const existingUser = await context.prisma.user.findFirst({
      where: { userName: args.userName },
    });

    const existingEmail = await context.prisma.user.findFirst({
      where: { email: args.email },
    });

    if (existingUser) {
      throw new Error('Username already exists');
    } else if (existingEmail) {
      throw new Error('Email already exists');
    }

    // Hash the password
    const password = await bcrypt.hash(args.password, 10);

    // Create the user
    const user = await context.prisma.user.create({
      data: { ...args, password },
    });

    // Generate token
    const token = createToken(user.id, user.userName);

    return {
      token,
      user,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

/**
 * @Query
 *
 * Verifies the user's credentials, signs them in to the application, and returns
 * a JWT token and the user details.
 *
 * @param {object} parent Unused.
 * @param {object} args The arguments object containing the user's login details.
 * @param {object} context The context object containing Prisma client instance.
 * @returns {Promise<object>} Resolves to an object containing a JWT token and the user details.
 * @throws {Error} Throws an error if the user is not found or if the password is invalid.
 */
export async function login(parent, args, context) {
  // Find the user in the database by username
  const user = await context.prisma.user.findUnique({
    where: { userName: args.userName },
  });

  if (!user) {
    throw new Error("No such user found");
  }

  // Compare the provided password with the stored hashed password
  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = createToken(user.id, user.userName);

  return {
    token,
    user,
  };
}
