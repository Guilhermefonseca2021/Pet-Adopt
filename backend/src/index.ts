import express from "express";
import env from 'dotenv';
import cors from "cors";
import connect from "./config/connect";
import userRoutes from "./routes/UserRoutes";
import connectDatabase from "./database/database";
import petRoutes from "./routes/PetRoutes";

const app = express();
app.use(express.json());
app.use(cors());
env.config()
 
app.use("/users", userRoutes);
app.use("/pets", petRoutes)

connectDatabase()
  .then(() => {
    console.log("Connected to the database");
    app.listen(process.env.PORT || connect.port, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT || connect.port}`);
    });
  })
  .catch((err) => console.log(err));
