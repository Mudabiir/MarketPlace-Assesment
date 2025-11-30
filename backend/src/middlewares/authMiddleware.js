import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  // Extract token from cookie or Authorization header
  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}