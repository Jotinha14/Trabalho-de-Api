// João Vitor Façanha Neves
import { posts } from '../db';
import { Post } from '../types/postTypes';

export const findPostById = (id: number): Post | undefined => {
  return posts.find(p => p.id === id);
};

export const saveNewPost = (newPost: Post) => {
  posts.push(newPost);
};

//  EXERCÍCIO 6 Remove um único post por ID
export const deletePostData = (id: number): boolean => {
  const initialLength = posts.length;
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  return posts.length < initialLength;
};

// EXERCÍCIO 7 Função auxiliar para contar posts de um autor
export const findPostsByAuthorId = (authorId: number): Post[] => {
  return posts.filter(p => p.authorId === authorId);
};