const AppError = require("../utils/appError");

/**
 * verifyOwnership
 *
 * Ensures that the authenticated user is only allowed to access
 * or modify their own resources. This protects routes such as:
 *   GET /users/:id
 *   DELETE /users/:id
 *
 * The middleware compares:
 *   - req.user.user_id        → extracted from the JWT
 *   - req.params.id           → the user ID in the request URL
 *
 * If the IDs do not match, the user is blocked with a 403 error.
 */
exports.verifyOwnership = (req, res, next) => {
  const loggedInUserId = req.user.id; // ID from decoded JWT
  const targetUserId = Number(req.params.id) || Number(req.body.id); // ID of resource being accessed

  // Block access if the logged-in user does not own the resource
  if (loggedInUserId !== targetUserId) {
    return next(
      new AppError("You do not have permission to access this resource", 403)
    );
  }

  next(); // User is the owner → allow the request to proceed
};

// exports.verifyBlogOwnership = async (req, res, next) => {
//   const loggedInUserId = req.user.id; // ID from decoded JWT
//   const blog = await Blog.findOne({
//     where: { blog_id: req.params.id },
//   }); // resource trying to be accessed

//   const targetUserId = blog.id; // ID user who owns the resource being accessed

//   // Block access if the logged-in user does not own the resource
//   if (loggedInUserId !== targetUserId) {
//     return next(
//       new AppError("You do not have permission to access this resource", 403)
//     );
//   }

//   next(); // User is the owner → allow the request to proceed
// };
