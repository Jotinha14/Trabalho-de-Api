// João Vitor Façanha Neves

import express from "express";
import userRoutes from "./routes/userRoutes";
import postRoutes from './routes/postRoutes';


const app = express();

app.use(express.json());
app.use(userRoutes);
app.use('/posts', postRoutes);

export default app;
