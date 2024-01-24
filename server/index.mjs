import Express from "express";
import bodyParser from "body-parser";
import "./db.mjs";
import "./models/User.mjs";
import { router } from "./routes/route.mjs";
import "dotenv/config";

const app = Express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(router);

app.get("/", (req, res) => {
  res.send(`Node server is running...`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
