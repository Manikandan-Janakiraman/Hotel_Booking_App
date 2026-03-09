import express from "express";
import Menu from "../models/menu.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const menus = await Menu.find().sort({ order: 1 });
  res.json(menus);
});

router.post("/", async (req, res) => {
  const menu = await Menu.create(req.body);
  res.status(201).json(menu);
});

router.delete("/:id", async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
