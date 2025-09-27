// João Vitor Façanha Neves
import { User } from './types/userTypes';
import { Post } from './types/postTypes';

export const users: User[] = [
  { id: 1, name: 'Flavio Caça-Rato', email: 'cacarato@gmail.com', role: 'admin', age: 39 },
  { id: 2, name: 'Anakin Skywalker', email: 'darthVader@gmail.com', role: 'admin', age: 45 },
  { id: 3, name: 'Kira Hiroto', email: 'hirotinho@gmail.com', role: 'user', age: 19 },
  { id: 4, name: 'Yuna do Forro', email: 'yunao@gmail.com', role: 'user', age: 23 },
  { id: 5, name: 'Lara Croft', email: 'lara@gmail.com', role: 'user', age: 20 },
  { id: 6, name: 'Calcinha Preta', email: 'chotedemadrugada@gmail.com', role: 'admin', age: 32 }
];

export const posts: Post[] = [
  { id: 1, title: 'Primeiro Post', content: 'Conteúdo inicial', authorId: 1, createdAt: new Date(), published: false }
];
