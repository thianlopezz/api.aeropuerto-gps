import express, { Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import v1 from "./routes/v1";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/v1", v1);

app.get("/", (req: Request, res: Response) => {
  res.send("Go on little Batman!");
});

app.listen(port, () => {
  console.log(`Magic happens at http://localhost:${port}`);
});
