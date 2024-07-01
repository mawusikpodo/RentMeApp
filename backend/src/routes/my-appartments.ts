import express, { Request, Response } from "express";
import multer from "multer";
// import cloudinary from "cloudinary";
import Appartment from "../models/appartment";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { AppartmentType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newAppartment: AppartmentType = req.body;

      // const imageUrls = await uploadImages(imageFiles);

      // newAppartment.imageUrls = imageUrls;
      newAppartment.lastUpdated = new Date();
      newAppartment.userId = req.userId;

      const appartment = new Appartment(newAppartment);
      await appartment.save();

      res.status(201).send(appartment);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const appartment = await Appartment.find({ userId: req.userId });
    res.json(appartment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const appartment = await Appartment.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(appartment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.put(
  "/:appartmentId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedAppartment: AppartmentType = req.body;
      updatedAppartment.lastUpdated = new Date();

      const appartment = await Appartment.findOneAndUpdate(
        {
          _id: req.params.appartmentId,
          userId: req.userId,
        },
        updatedAppartment,
        { new: true }
      );

      if (!appartment) {
        return res.status(404).json({ message: "Appartment not available" });
      }

      const files = req.files as Express.Multer.File[];
      // const updatedImageUrls = await uploadImages(files);

      appartment.imageUrls = [
        // ...updatedImageUrls,
        ...(updatedAppartment.imageUrls || []),
      ];

      await appartment.save();
      res.status(201).json(appartment);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// async function uploadImages(imageFiles: Express.Multer.File[]) {
//   const uploadPromises = imageFiles.map(async (image) => {
//     const b64 = Buffer.from(image.buffer).toString("base64");
//     let dataURI = "data:" + image.mimetype + ";base64," + b64;
//     const res = await cloudinary.v2.uploader.upload(dataURI);
//     return res.url;
//   });

//   const imageUrls = await Promise.all(uploadPromises);
//   return imageUrls;
// }

export default router;
