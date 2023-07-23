import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Details Schema
const detailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timeStamps: true,
  }
);

const detailsModel = mongoose.model("Detail", detailsSchema);

router.post("/", async (req, res) => {
  const { name, mobile, email } = req.body;
  if (!name || !mobile || !email) {
    return res.status(404).json({
      success: false,
      message: "Empty Fields!",
    });
  }

  const createOne = await detailsModel.create(req.body);
  if (!createOne) {
    return res.status(400).json({
      success: false,
      message: "Can't send message!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Thanks for Details.",
  });
});

router.get('/', async (req, res) => {
  try {
    const allUsersInfo = await detailsModel.find({});
    res.status(200).json({ Users: allUsersInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

export default router;
