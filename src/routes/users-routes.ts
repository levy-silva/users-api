import { usersTable } from "../config/database/schema";
import { db } from "../config/database";
import { eq } from "drizzle-orm";
import { Router } from "express";

const router = Router();

router
  .route("/users")
  .post(async (req, res) => {
    const { name, email, password } = req.body;
    const [user] = await db.insert(usersTable).values({ name, email, password }).returning();
    res.status(201).json(user);
  })
  .get(async (req, res) => {
    try {
      const users = await db.select().from(usersTable);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

router
  .route("/users/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, +id));
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    const [user] = await db
      .update(usersTable)
      .set(update)
      .where(eq(usersTable.id, +id))
      .returning();

    if (!user) res.status(400).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", data: user });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const [user] = await db.delete(usersTable).where(eq(usersTable.id, +id)).returning();
    res.status(200).json({ message: "User deleted successfully", data: user });
  });

export default router;
