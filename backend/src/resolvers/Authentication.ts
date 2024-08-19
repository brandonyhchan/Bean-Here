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
    // Uses bcrypt to securely hash the user's password before storing it in the database
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
      data: { ...args, password },
    });

    /**
     * Uses JWT to generate a token containing the userId and userName and can be
     * used for authentication in later requests without needing to access the database.
     * The token is signed with a private key using RS256 algorithm.
     */
    const token = createToken(user.id, user.userName);

    return {
      token,
      user,
    };
  } catch (error) {
    throw new Error("User already exists");
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
