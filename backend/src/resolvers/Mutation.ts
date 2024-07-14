/**
 * Updates the live details for the busyness and noisiness levels of a cafe, 
 * given the id of the cafe.
 * 
 * @param {object} parent Unused.
 * @param {object} args The arguments object containing the cafe ID and the new values.
 * @param {object} context The context object containing Prisma client instance.
 * @param {object} info Unused.
 * @returns {Promise<object>} Resolves to the updated cafe object.
 */
export async function updateCafeInfo(parent, args, context, info) {
  return context.prisma.cafe.update({
      where: { stringId: args.stringId },
      data: { busyness: args.busyness, noisiness: args.noisiness },
  });
}
