import express, { Request, Response, Router } from "express";
import { WebScrapingController } from "../controllers/webscraping";

const router: Router = express.Router();

router.get("/", (request: Request, response: Response) => {
  response.send("This is the API v1");
});

router.get("/flights", async (request: Request, response: Response) => {
  let flights = await WebScrapingController.getAllNationalDepartureFligths();

  if (request.query.destination) {
    flights = flights.filter((flight) =>
      flight.destination
        .toUpperCase()
        .includes((request.query.destination as string).toUpperCase())
    );
  }

  response.send(flights);
});

export default router;
