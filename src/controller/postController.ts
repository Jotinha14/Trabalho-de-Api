// João Vitor Façanha Neves
import { Request, Response } from "express";
import { posts } from "../db";
import { Post } from "../types/postTypes";

// EXERCÍCIO 3 - Criar post
export const createPost = (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
  }

  const newPost: Post = {
    id: posts.length + 1,
    title,
    content,
    authorId,
    createdAt: new Date(),
    published: false,
  };

  posts.push(newPost);

  res.status(201).json({ success: true, data: newPost });
};

// EXERCÍCIO 5 - Atualizar parcialmente um post
export const updatePostPatch = (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ success: false, message: "Post não encontrado." });
  }

  const { title, content, published } = req.body;
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (published !== undefined) post.published = published;

  res.status(200).json({ success: true, data: post });
};

// EXERCÍCIO 6 - Deletar post
export const deletePost = (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === postId);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Post não encontrado." });
  }

  posts.splice(index, 1);

  res.status(200).json({ success: true, message: "Post deletado com sucesso." });
};