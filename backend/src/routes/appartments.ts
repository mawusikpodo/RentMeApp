import express, { Request, Response } from "express";
import Appartment from "../models/appartment";
import { BookingType, AppartmentSearchResponse} from "../shared/types";
import { param, validationResult } from "express-validator";
// import Stripe from "stripe";
import verifyToken from "../middleware/auth";

// const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const appartments = await Appartment.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Appartment.countDocuments(query);

    const response: AppartmentSearchResponse = {
      data: appartments,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const appartments = await Appartment.find().sort("-lastUpdated");
    res.json(appartments);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching appartments" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Appartment ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const appartment = await Appartment.findById(id);
      res.json(appartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching appartment" });
    }
  }
);

// router.post(
//   "/:hotelId/bookings/payment-intent",
//   verifyToken,
//   async (req: Request, res: Response) => {
//     const { numberOfNights } = req.body;
//     const hotelId = req.params.hotelId;

//     const hotel = await Appartment.findById(hotelId);
//     if (!hotel) {
//       return res.status(400).json({ message: "Hotel not found" });
//     }

//     const totalCost = hotel.pricePerNight * numberOfNights;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: totalCost * 100,
//       currency: "gbp",
//       metadata: {
//         hotelId,
//         userId: req.userId,
//       },
//     });

//     if (!paymentIntent.client_secret) {
//       return res.status(500).json({ message: "Error creating payment intent" });
//     }

//     const response = {
//       paymentIntentId: paymentIntent.id,
//       clientSecret: paymentIntent.client_secret.toString(),
//       totalCost,
//     };

//     res.send(response);
//   }
// );

router.post(
  "/:appartmentId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      // const paymentIntentId = req.body.paymentIntentId;

      // const paymentIntent = await stripe.paymentIntents.retrieve(
      //   paymentIntentId as string
      // );

      // if (!paymentIntent) {
      //   return res.status(400).json({ message: "payment intent not found" });
      // }

      // if (
      //   paymentIntent.metadata.hotelId !== req.params.hotelId ||
      //   paymentIntent.metadata.userId !== req.userId
      // ) {
      //   return res.status(400).json({ message: "payment intent mismatch" });
      // }

      // if (paymentIntent.status !== "succeeded") {
      //   return res.status(400).json({
      //     message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      //   });
      // }

      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
      };

      const appartment = await Appartment.findOneAndUpdate(
        { _id: req.params.appartmentId },
        {
          $push: { bookings: newBooking },
        }
      );

      if (!appartment) {
        return res.status(400).json({ message: "appartment not found" });
      }

      await appartment.save();
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;