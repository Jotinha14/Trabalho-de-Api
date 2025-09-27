// João Vitor Façanha Neves

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
