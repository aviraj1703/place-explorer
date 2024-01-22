import Express from "express";
import bodyParser from "body-parser";
import "./db.mjs"
import "./models/User.mjs"
import { router } from "./routes/authRoute.mjs";

const app = Express();
const port = 3000;

app.use(bodyParser.json());
app.use(router);

app.get("/", (req, res) => {
  res.send(`Server is running on port number ${port}`);
});

app.listen(port, () => {
    console.log(`This is port: ${port}`);
})
