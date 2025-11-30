import prisma from '../utils/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
  const { email, password, name, phoneNumber } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, name, phoneNumber }
    });
    console.log('Signup data:', { email, passwordHash, name, phoneNumber });
// then call prisma.user.create...
    res.status(201).json({ id: user.id, email: user.email, name: user.name, phoneNumber: user.phoneNumber });
  } catch (err) {
    console.error("Signup error:", err); 
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(400).json({ error: err.message || "Bad request" });
    }
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  // Create JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, phoneNumber: user.phoneNumber } });
}