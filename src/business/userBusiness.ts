// João Vitor Façanha Neves

import { users } from '../db';
import { User } from '../types/userTypes';
import { findUserByEmail, deleteUsersData } from '../data/userData';
import { findPostsByAuthorId } from '../data/postData';

// EXERCÍCIO 2 Filtra usuários por faixa etária
export const filterUsersByAgeRange = (min: number, max: number): User[] => {
  return users.filter(u => u.age >= min && u.age <= max);
};

 // ExCÍCIO 4 Lógica para substituir usuário
export const replaceUser = (id: number, data: Omit<User, 'id'>): User | undefined => {
  const emailConflict = findUserByEmail(data.email, id);
  if (emailConflict) {
    throw new Error('Este email já está sendo usado por outro usuário.');
  }
  return users.find(u => u.id === id) ? { id, ...data } : undefined;
};

// EXERCÍCIO 7] Lógica para limpeza condicional
export const cleanupInactiveUsers = (): number => {
  const usersToDelete: number[] = [];

  for (const user of users) {
    if (user.role === 'admin') {
      continue;
    }

    const userPosts = findPostsByAuthorId(user.id);
    if (userPosts.length === 0) {
      usersToDelete.push(user.id);
    }
  }

  return deleteUsersData(usersToDelete);
};



