import express from "express";
import cors from "cors";
import connect from "./config/connect";
import userRoutes from "./routes/UserRoutes";
import connectDatabase from "./database/database";
import petRoutes from "./routes/PetRoutes";
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const app = express();
app.use(express.json());
app.use(cors());
 
app.use("/users", userRoutes);
app.use("/pets", petRoutes)

connectDatabase()
  .then(() => {
    console.log("Connected to the database");
    app.listen(connect.port, () => {
      console.log(`Server is running at http://localhost:${connect.port}`);
    });
  })
  .catch((err) => console.log(err));
