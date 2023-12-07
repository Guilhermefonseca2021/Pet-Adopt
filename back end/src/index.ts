import express from "express";
import cors from "cors";
import auth from "./config/connect";
import routes from "./routes/UserRoutes";
import connectDatabase from "./database/database";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3333" }));

app.use(routes);

connectDatabase()
  .then(() => {
    console.log("Connected to the database");
    app.listen(auth.port, () => {
      console.log(`Server is running at http://localhost:${auth.port}`);
    });
  })
  .catch((err) => console.log(err));
