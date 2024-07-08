import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Appartment from "../models/appartment";
import { AppartmentType } from "../shared/types";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const appartments = await Appartment.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = appartments.map((appartment) => {
      const userBookings = appartment.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings: AppartmentType = {
        ...appartment.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;
