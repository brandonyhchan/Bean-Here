/**
 * Cafe.ts contains functions to Query or Mutate information directly relating to the Cafe table in the database.
 */

import { Cafe, Coordinates, distance } from "../types/cafe";

/**
 * @Query
 *
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
        busyness: true,
        noisiness: true,
        price: true,
        latitude: true,
        longitude: true,
      },
      where: {
        name: { contains: filterByName },
        busynessLevel: {
          level: args.busynessFilter,
        },
        noisinessLevel: {
          level: args.noiseFilter,
        },
        priceLevel: {
          level: {
            in: args.priceFilters.length ? args.priceFilters : undefined,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    if (args.distanceFilter < 30) {
      const cafeDistances: Cafe[] = [];
      query.forEach(function (cafe) {
        cafeDistances.push(calculateDistance(cafe, args.userLocation));
      });
      const output = cafeDistances.filter(
        (cafe) => cafe.distance < args.distanceFilter
      );
      return output;
    } else {
      return query;
    }
  
    } catch (error) {
    console.error("Error in returnAllCafes resolver:", error);
    throw new Error("Failed to fetch cafes");
  }
}

/**
 * @Query
 *
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

/**
 * @Mutation
 *
 * Updates the live details for the busyness and noisiness levels of a cafe,
 * given the id of the cafe.
 *
 * @param {object} parent Unused.
 * @param {object} args The arguments object containing the cafe ID and the new values.
 * @param {object} context The context object containing Prisma client instance.
 * @returns {Promise<object>} Resolves to the updated cafe object.
 */
export async function updateCafeInfo(parent, args, context) {
  return context.prisma.cafe.update({
    where: { stringId: args.stringId },
    data: { busyness: args.busyness, noisiness: args.noisiness },
  });
}

function calculateDistance(cafe: Cafe, args: Coordinates): distance<Cafe> {
  const R = 6371; // Radius of Earth in km
  const dLat = degToRad(args.latitude - cafe.latitude);
  const dLong = degToRad(args.longitude - cafe.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(cafe.latitude)) *
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

function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}
