import * as bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.js";

/**
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

/**
 * Retrieves a list of cafes from the database based on the provided filters and
 * orders them by id in ascending order. If the distance filter is less than 25,
 * the distance of each cafe from the user's location is calculated and cafes outside
 * of the specified range are filtered out. If the distance filter is 25 or greater,
 * an unfiltered list of cafes is returned.
 *
 * @param {object} parent Unused.
 * @param {object} args The arguments object containing filter and sorting options.
 * @param {object} context The context object containing Prisma client instance.
 * @returns {Promise<object[]>} Resolves to a list of cafes matching the filters.
 */
export async function returnAllCafes(parent, args, context) {
  // Previously we used mode: "insensitive" but this is no longer supported
  const filterByName = args.filterByName ? args.filterByName.toLowerCase() : "";

  try {
    if (!context.userId) {
      throw new Error("Not authenticated");
    }

    const query = await context.prisma.cafe.findMany({
      select: {
        id: true,
        stringId: true,
        name: true,
        street: true,
        city: true,
        province: true,
        profilePhotoURL: true,
        location: true,
        busyness: true,
        noisiness: true,
        price: true,
      },
      where: {
        name: { contains: filterByName },
      },
      orderBy: {
        id: "asc",
      },
    });
    return query;
  } catch (error) {
    console.error("Error in returnAllCafes resolver:", error);
    throw new Error("Failed to fetch cafes");
  }
}


/**
 * Gets the cafe details of the requested cafe by unique id.
 *
 * @param {object} parent Unused.
 * @param {object} args The arguments object containing the cafe's unique identifier.
 * @param {object} context The context object containing the Prisma client instance.
 * @returns {Promise<object|null>} A promise that resolves to the cafe details or null if not found.
 */
export async function getCafeInfo(parent, args, context) {
  return context.prisma.cafe.findUnique({
    where: { stringId: args.stringId },
  });
}
