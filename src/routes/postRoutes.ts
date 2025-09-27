// João Vitor Façanha Neves
import { Router } from "express";
import { createPost } from "../controller/postController";
import { updatePostPatch } from "../controller/postController";
import { deletePost } from "../controller/postController";

const router = Router();

router.post("/", createPost); // EXERCÍCIO 3
router.patch("/:id", updatePostPatch); // EXERCÍCIO 5
router.delete("/:id", deletePost); // EXERCÍCIO 6

export default router;

