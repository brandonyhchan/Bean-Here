import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Cafe, Location, distance } from "../types/cafe";

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
    const token = jwt.sign(
      { userId: user.id, userName: user.userName },
      <jwt.Secret>process.env.PRIVATE_KEY,
      { algorithm: "RS256" }
    );

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

  /**
   * Generates a JWT token for the user. This token can be used for
   * authentication in later requests without needing to access the database.
   */
  const token = jwt.sign(
    { userId: user.id, userName: user.userName },
    <jwt.Secret>process.env.PRIVATE_KEY,
    { algorithm: "RS256" }
  );

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
  let output;

  // Query cafes from the database with the specified filters and selections
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
      name: { contains: args.filterByName, mode: "insensitive" },
      busyness: args.busyFilter,
      noisiness: args.noiseFilter,
      price: { in: args.priceFilter.length ? args.priceFilter : undefined },
    },
    orderBy: {
      id: "asc",
    },
  });

  // If the distance filter is less than 25, calculate distances and filter cafes by distance
  if (args.distanceFilter < 25) {
    const cafeDistances: Cafe[] = [];
    query.forEach(function (cafe) {
      cafeDistances.push(calculateDistance(cafe, args.userLocation));
    });
    output = cafeDistances.filter(
      (cafe) => cafe.distance < args.distanceFilter
    );
  } else {
    // If the distance filter is 25 or more, return the unfiltered list of cafes
    output = query;
  }

  return output;
}

/**
 * Calculates the distance between a cafe and a given location using the Haversine formula.
 * Takes the cafe's coordinates and the user's location to compute the distance in kilometers
 * and returns the cafe details along with the calculated distance.
 *
 * @param {Cafe} cafe The cafe object containing its location coordinates.
 * @param {Location} args The user's location containing latitude and longitude.
 * @returns {distance<Cafe>} An object containing the cafe details along with the calculated
 *                           distance to the user.
 */
function calculateDistance(cafe: Cafe, args: Location): distance<Cafe> {
  // lat2 = args.location.latitude, lat1 = cafe.latitude
  // lon2 = args.location.longitude, lon1 = cafe.longitude

  // Radius of Earth in km
  const R = 6371;
  const dLat = degToRad(args.latitude - cafe.location.latitude);
  const dLong = degToRad(args.longitude - cafe.location.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(cafe.location.latitude)) *
      Math.cos(degToRad(args.latitude)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = Math.round(R * c);

  return {
    ...cafe,
    distance: d,
  };
}

/**
 * Converts degrees to radians.
 * @param {number} deg The degree to be converted.
 * @returns {number} The resulting degree in radian.
 */
function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
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
