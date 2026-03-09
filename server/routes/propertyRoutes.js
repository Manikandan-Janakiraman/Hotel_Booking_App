import express from "express";
import multer from "multer";
import Property from "../models/Property.js";

const router = express.Router();

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= ADD PROPERTY ================= */

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const property = new Property({
      name: req.body.name,
      city: req.body.city,
      type: req.body.type,
      description: req.body.description,
      review: req.body.review,
      essentials: JSON.parse(req.body.essentials || "[]"),
      facilities: JSON.parse(req.body.facilities || "[]"),
      accessibility: JSON.parse(req.body.accessibility || "[]"),
      image: req.file ? req.file.filename : null,
    });

    await property.save();
    res.status(201).json(property);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET ALL ================= */

router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET SINGLE ================= */

router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= UPDATE ================= */

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      city: req.body.city,
      type: req.body.type,
      description: req.body.description,
      review: req.body.review,
      essentials: JSON.parse(req.body.essentials || "[]"),
      facilities: JSON.parse(req.body.facilities || "[]"),
      accessibility: JSON.parse(req.body.accessibility || "[]"),
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after" }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= DELETE ================= */

router.delete("/:id", async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      city: req.body.city,
      type: req.body.type,
      description: req.body.description,
      review: req.body.review,
      essentials: JSON.parse(req.body.essentials || "[]"),
      facilities: JSON.parse(req.body.facilities || "[]"),
      accessibility: JSON.parse(req.body.accessibility || "[]"),
    };

    // If new image uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after" }
    );

    res.json(updatedProperty);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
