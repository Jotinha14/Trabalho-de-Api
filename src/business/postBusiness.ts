// João Vitor Façanha Neves
import { users, posts } from '../db';
import { Post } from '../types/postTypes';
import { findPostById, deletePostData } from '../data/postData';


const getNextPostId = (): number => {
    
    if (posts.length === 0) return 1;
    
    
    const maxId = posts.reduce((max, post) => (post.id > max ? post.id : max), 0);
    return maxId + 1;
};

//  EXERCÍCIO 3 Lógica para criar post
export const createPost = (title: string, content: string, authorId: number): Post => {
    const authorExists = users.some(u => u.id === authorId);
    if (!authorExists) {
        throw new Error('Autor não encontrado.');
    }

    const newPost: Post = {
       
        id: getNextPostId(),
        title,
        content,
        authorId,
        createdAt: new Date(),
        published: false, 
    };

    return newPost;
};

//  EXERCÍCIO 5 Lógica para atualização parcial
export const patchPost = (postId: number, updateData: Partial<Post>): Post | undefined => {
    delete updateData.id;
    delete updateData.authorId;
    delete updateData.createdAt;

    const post = findPostById(postId);
    if (!post) return undefined;

    Object.assign(post, post, updateData); 
    return post;
};

//  EXERCÍCIO 6 Lógica para deletar com autorização
export const deletePost = (postId: number, userId: number): boolean => {
    const post = findPostById(postId);

    if (!post) {
        throw new Error('Post não encontrado.');
    }

    if (post.authorId !== userId) {
        throw new Error('Acesso negado. Você não é o autor deste post.');
    }

    return deletePostData(postId);
};