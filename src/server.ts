// João Vitor Façanha Neves

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { getUsersByAgeRange } from './controller/userController';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.get("/users/age-range", getUsersByAgeRange);

app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
